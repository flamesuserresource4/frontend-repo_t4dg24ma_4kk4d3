export default function KPICard({ label, value, sub }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl p-[1px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/40 via-emerald-500/20 to-transparent blur opacity-40 group-hover:opacity-60 transition" />
      <div className="relative rounded-3xl bg-emerald-900/40 backdrop-blur-xl ring-1 ring-inset ring-emerald-400/20 p-6">
        <p className="text-emerald-200/80 text-sm mb-2">{label}</p>
        <h3 className="text-2xl sm:text-3xl font-semibold text-emerald-50 tracking-tight">{value}</h3>
        {sub && <p className="text-emerald-300/70 text-xs mt-2">{sub}</p>}
      </div>
    </div>
  )
}
