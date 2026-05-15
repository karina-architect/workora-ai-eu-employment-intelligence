"use client";

import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, Calculator, Globe2, Lock, Scale, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import modules from "@/data/eu-country-modules.json";
import languages from "@/data/languages.json";
import legal from "@/data/legal-disclaimer.json";

const countries = (modules as any[]).map(m => m.country);

export default function Home(){
 const [persona,setPersona]=useState("Freelancer");
 const [fromCountry,setFromCountry]=useState("Belgium");
 const [toCountry,setToCountry]=useState("Spain");
 const [language,setLanguage]=useState("English");
 const [question,setQuestion]=useState("I am a Belgian freelancer working with Spanish clients. What is the best legal and tax setup?");
 const [gross,setGross]=useState(6500);
 const [answer,setAnswer]=useState<any>(null);
 const [leadStatus,setLeadStatus]=useState("");
 const [loading,setLoading]=useState(false);
 const [tab,setTab]=useState("advisor");

 async function analyze(){
  setLoading(true);
  const res=await fetch("/api/advisor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question,persona,fromCountry,toCountry,language,goal:"Employment intelligence",grossMonthly:gross})});
  const data=await res.json();
  setAnswer(data.answer);
  setLoading(false);
 }

 async function submitLead(e:any){
  e.preventDefault();
  setLeadStatus("Sending...");
  const form=new FormData(e.currentTarget);
  const payload=Object.fromEntries(form.entries());
  const res=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...payload,question,persona,fromCountry,toCountry,language,gross})});
  setLeadStatus(res.ok?"✓ Request sent to Workora.":"Could not send. Please try again.");
 }

 return <main className="relative z-10 mx-auto max-w-[1280px] p-5 md:p-6"><div className="shell">
  <nav className="flex items-center justify-between border-b border-[#E8EDF5] px-5 py-4 md:px-8">
    <a href="https://getworkora.com/" className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-[18px] bg-gradient-to-br from-[#0B1220] via-[#315CFF] to-[#16C7A7] text-2xl font-black text-white">W</div>
      <div><div className="text-lg font-black tracking-[-.03em]">Workora AI</div><div className="text-xs text-slate-500">European Employment Intelligence</div></div>
    </a>
    <div className="hidden rounded-full bg-slate-100 p-1 md:flex">{["advisor","simulator","dashboard"].map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-full px-4 py-2 text-sm font-black ${tab===t?"bg-white shadow text-slate-950":"text-slate-500"}`}>{t[0].toUpperCase()+t.slice(1)}</button>)}</div>
    <a href="#lead" className="primary px-5 py-3 text-sm font-black">Book setup</a>
  </nav>

  <section className="grid items-center gap-8 px-7 py-14 md:grid-cols-[1.05fr_.95fr] md:px-12">
    <div>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600"><Sparkles size={16}/> Final Go Live · Verified-data architecture</div>
      <h1 className="text-[48px] font-black leading-[1.02] tracking-[-.06em] text-slate-950 md:text-[72px]">The best way to <span className="accent">understand work in Europe.</span></h1>
      <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">Premium AI advisor, salary simulator UI and enterprise dashboard for cross-border employment decisions — with exact values locked until professionally verified.</p>
      <div className="disclaimer mt-6 max-w-3xl px-5 py-4 text-sm font-semibold">{legal.short} Workora AI provides general employment-intelligence information only. Before acting, verify with qualified local professionals.</div>
    </div>
    <div className="card glow p-6">
      <div className="flex items-start justify-between"><div><p className="text-sm text-slate-500">Enterprise readiness</p><h3 className="text-3xl font-black tracking-[-.04em]">Verified Gate Active</h3></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">Safe MVP</span></div>
      <div className="mt-5 grid grid-cols-2 gap-3"><K label="EU countries" value="27"/><K label="Languages" value="24+"/><K label="Exact values" value="Locked"/><K label="Lead capture" value="Formspree"/></div>
    </div>
  </section>

  <section className="px-5 pb-8 md:px-12"><div className="card mx-auto max-w-6xl p-6 md:p-8">
    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F5FF] text-[#315CFF]"><Sparkles /></div><p className="mb-2 text-sm font-black text-[#315CFF]">Interactive advisor</p><h2 className="text-3xl font-black tracking-[-.045em] md:text-4xl">Ask your EU employment question</h2></div><div className="flex flex-wrap gap-2">{["Freelancer","Employer","Employee"].map(p=><button key={p} onClick={()=>setPersona(p)} className={`rounded-full border px-5 py-3 font-black ${persona===p?"border-[#315CFF] bg-[#EEF3FF] text-[#315CFF]":"border-slate-200 bg-white"}`}>{p}</button>)}</div></div>
    <div className="relative"><textarea value={question} onChange={e=>setQuestion(e.target.value)} className="min-h-[125px] w-full p-6 pr-20 text-lg leading-relaxed"/><button onClick={analyze} className="primary absolute bottom-5 right-5 grid h-14 w-14 place-items-center"><ArrowRight /></button></div>
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6"><select value={fromCountry} onChange={e=>setFromCountry(e.target.value)} className="px-4 py-3">{countries.map(c=><option key={c}>{c}</option>)}</select><select value={toCountry} onChange={e=>setToCountry(e.target.value)} className="px-4 py-3">{countries.map(c=><option key={c}>{c}</option>)}</select><select value={language} onChange={e=>setLanguage(e.target.value)} className="px-4 py-3">{(languages as string[]).map(l=><option key={l}>{l}</option>)}</select><input type="number" value={gross} onChange={e=>setGross(Number(e.target.value))} className="px-4 py-3"/><button onClick={analyze} className="primary px-5 py-3 font-black md:col-span-2">Analyze with verified-data gate</button></div>
  </div></section>

  <section className="px-5 pb-12 md:px-12"><div className="mx-auto max-w-6xl">
    {tab==="advisor"&&<Advisor loading={loading} answer={answer}/>}
    {tab==="simulator"&&<Simulator gross={gross} fromCountry={fromCountry} toCountry={toCountry}/>}
    {tab==="dashboard"&&<Dashboard/>}
  </div></section>

  <section id="lead" className="px-7 py-12 md:px-12"><div className="card grid gap-8 p-7 md:grid-cols-2 md:p-10"><div><p className="mb-2 text-sm font-black text-[#315CFF]">Workora expert review</p><h3 className="mb-4 text-5xl font-black tracking-[-.065em]">Turn information into verified implementation.</h3><p className="text-lg leading-relaxed text-slate-600">Use Workora to verify the legal/tax/social-security path and implement EOR, payroll, freelancer or entity setup.</p><a href="https://getworkora.com/" target="_blank" className="mt-6 inline-flex items-center gap-2 font-black text-[#315CFF]">Visit getworkora.com <ArrowRight size={18}/></a></div><form onSubmit={submitLead} className="soft p-5"><input name="email" required className="mb-3 w-full px-4 py-3" placeholder="Work email"/><input name="name" required className="mb-3 w-full px-4 py-3" placeholder="Company / full name"/><select name="need" className="mb-3 w-full px-4 py-3"><option>I need expert verification</option><option>I need hiring setup</option><option>I need salary simulation verification</option><option>I need EOR / payroll</option></select><button className="primary w-full px-5 py-4 font-black">Request Workora setup</button><p className="mt-3 text-sm text-slate-500">{leadStatus}</p><p className="mt-4 text-xs text-slate-500">{legal.short}</p></form></div></section>
 </div></main>
}

function Advisor({loading,answer}:{loading:boolean;answer:any}){return <>{loading&&<div className="card p-10 text-center font-bold text-slate-600">Workora AI is checking the verified-data gate...</div>}{answer&&!loading&&<div className="grid gap-4 lg:grid-cols-[1.35fr_.75fr]"><div className="card p-7"><div className="mb-5 flex items-start justify-between gap-3"><div><p className="text-sm text-slate-500">Information-only result</p><h3 className="text-4xl font-black tracking-[-.055em]">{answer.scenario}</h3></div><span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-800">{answer.risk}</span></div><div className="disclaimer mb-4 p-5 text-sm font-semibold">{answer.disclaimer}</div><div className="grid gap-4 md:grid-cols-2"><Info title="Verified-data gate" icon={<Lock/>} text={`Exact values shown: ${answer.verification?.exactTaxValuesShown ? "Yes" : "No — expert verification required"}`}/><Info title="Legal checkpoints" icon={<Scale/>} text={(answer.legal||[]).slice(0,3).join(" ")}/><Info title="Social security" icon={<Globe2/>} text={answer.socialSecurity?.reason||"Exact social-security values require verification."}/><Info title="Workora action" icon={<BriefcaseBusiness/>} text={answer.workoraCTA||"Book Workora setup and expert review."}/></div></div><aside className="card p-7"><p className="text-sm text-slate-500">Status</p><div className="mb-3 text-4xl font-black tracking-[-.06em]">Gate active</div><p className="mb-6 text-slate-600">Exact tax and social-security numbers are blocked until country modules are verified.</p><a href="#lead" className="primary block px-5 py-4 text-center font-black">Book expert review</a></aside></div>}{!answer&&!loading&&<div className="card p-10 text-center text-slate-600">Ask a question above and click Analyze.</div>}</>}
function Simulator({gross,fromCountry,toCountry}:{gross:number;fromCountry:string;toCountry:string}){return <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]"><div className="card p-7"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F5FF] text-[#315CFF]"><Calculator/></div><h3 className="text-4xl font-black tracking-[-.055em]">Salary simulator UI</h3><p className="mt-3 text-slate-600">The simulator is fully designed, but exact net values are locked until {fromCountry} and {toCountry} modules are professionally verified.</p><div className="mt-5 grid grid-cols-2 gap-3"><K label="Gross input" value={`€${gross.toLocaleString()}`}/><K label="Status" value="Locked"/></div><a href="#lead" className="primary mt-5 block px-5 py-4 text-center font-black">Unlock via expert review</a></div><div className="card locked p-7"><div className="flex items-center gap-3"><Lock className="text-[#315CFF]"/><div><h4 className="text-2xl font-black">Exact calculation locked</h4><p className="text-slate-600">Requires official sources, tax year, date stamp and professional review.</p></div></div><div className="mt-6 grid gap-4 md:grid-cols-3"><Metric label="Tax module" value="Pending"/><Metric label="Social security" value="Pending"/><Metric label="Net salary" value="Blocked"/></div><div className="mt-6 rounded-[28px] bg-white p-5"><div className="h-3 w-3/4 rounded-full bg-slate-200"/><div className="mt-3 h-3 w-1/2 rounded-full bg-slate-200"/><div className="mt-3 h-3 w-5/6 rounded-full bg-slate-200"/></div></div></div>}
function Dashboard(){const items=[["Countries","27"],["Verified","0"],["Pending","27"],["Lead route","Active"],["Source monitor","Weekly"],["Risk mode","Safe"]];return <div className="card p-7"><div className="mb-6 flex items-center justify-between"><div><p className="text-sm font-black text-[#315CFF]">Enterprise dashboard</p><h3 className="text-4xl font-black tracking-[-.055em]">Verification command center</h3></div><ShieldCheck className="text-[#315CFF]"/></div><div className="grid gap-4 md:grid-cols-3">{items.map(([l,v])=><Metric key={l} label={l} value={v}/>)}</div><div className="mt-6 grid gap-4 md:grid-cols-3"><Info title="Data governance" icon={<Lock/>} text="Exact values cannot go live without verification metadata."/><Info title="Commercial funnel" icon={<TrendingUp/>} text="Blocked exact values convert to Workora expert-review leads."/><Info title="EU coverage" icon={<Globe2/>} text="All EU countries and EU languages plus Russian are included."/></div></div>}
function Info({icon,title,text}:{icon:any;title:string;text:string}){return <div className="card p-5 shadow-none"><div className="mb-3 text-[#315CFF]">{icon}</div><h4 className="mb-2 text-xl font-black">{title}</h4><p className="text-sm leading-relaxed text-slate-600">{text}</p></div>}
function K({label,value}:{label:string;value:string}){return <div className="metric p-5"><p className="text-sm text-slate-500">{label}</p><b className="text-3xl tracking-[-.05em]">{value}</b></div>}
function Metric({label,value}:{label:string;value:string}){return <div className="metric p-5"><p className="text-sm text-slate-500">{label}</p><b className="text-2xl tracking-[-.04em]">{value}</b></div>}
