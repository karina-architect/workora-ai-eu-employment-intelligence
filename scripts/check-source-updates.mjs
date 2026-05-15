import fs from "node:fs/promises";
import crypto from "node:crypto";

const registryPath = new URL("../data/official-source-registry.json", import.meta.url);
const statePath = new URL("../data/sources/source-check-state.json", import.meta.url);
const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));

async function loadState(){ try { return JSON.parse(await fs.readFile(statePath, "utf8")); } catch { return {}; } }
async function saveState(state){ await fs.mkdir(new URL("../data/sources/", import.meta.url), { recursive:true }); await fs.writeFile(statePath, JSON.stringify(state, null, 2)); }
async function hashUrl(url){
  if(!url || url === "country-specific") return null;
  const res = await fetch(url, { headers:{ "user-agent":"WorkoraAI-SourceMonitor/1.0" }});
  const text = await res.text();
  return crypto.createHash("sha256").update(text.slice(0,200000)).digest("hex");
}

const state = await loadState();
const alerts = [];
for (const src of registry.sourceFamilies) {
  if(!src.url || src.url === "country-specific") continue;
  try {
    const hash = await hashUrl(src.url);
    const old = state[src.url]?.hash;
    state[src.url] = { hash, checkedAt:new Date().toISOString(), name:src.name };
    if(old && old !== hash) alerts.push({ name:src.name, url:src.url, changedAt:new Date().toISOString() });
    console.log(`${src.name}: ${old && old !== hash ? "CHANGED" : "ok"}`);
  } catch(e) {
    console.error(`${src.name}: failed`, e.message);
  }
}
await saveState(state);

if(alerts.length && process.env.SOURCE_UPDATE_WEBHOOK_URL) {
  await fetch(process.env.SOURCE_UPDATE_WEBHOOK_URL, {
    method:"POST",
    headers:{ "content-type":"application/json" },
    body: JSON.stringify({ source:"Workora AI source monitor", alerts })
  });
}
