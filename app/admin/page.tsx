import modules from "@/data/eu-country-modules.json";
import sources from "@/data/official-source-registry.json";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="shell p-8">
        <h1 className="mb-3 text-4xl font-black">Workora AI Admin — Enterprise Verification Dashboard</h1>
        <p className="mb-6 text-slate-600">Exact country values are blocked until country modules are source-linked, date-stamped and professionally reviewed.</p>
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {(sources as any).sourceFamilies.map((s: any) => (
            <div key={s.name} className="card p-4 shadow-none">
              <b>{s.name}</b>
              <p className="mt-2 text-sm text-slate-600">{s.use}</p>
            </div>
          ))}
        </div>
        <table className="w-full text-left">
          <thead><tr className="text-sm text-slate-500"><th className="pb-3">Country</th><th>Status</th><th>Reviewed</th><th>Exact Values</th></tr></thead>
          <tbody>
            {(modules as any[]).map(m => (
              <tr key={m.code} className="border-t border-slate-200">
                <td className="py-3 font-bold">{m.country}</td>
                <td>{m.status}</td>
                <td>{m.reviewedAt || "Not reviewed"}</td>
                <td>{m.allowedToShowExactTaxValues ? "Allowed" : "Blocked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
