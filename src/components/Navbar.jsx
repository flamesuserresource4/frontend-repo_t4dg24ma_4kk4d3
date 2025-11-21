import { User, Home, BarChart2, LineChart, Users } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="sticky top-0 z-20 backdrop-blur-xl bg-emerald-900/30 border-b border-emerald-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.35)]" />
          <span className="text-emerald-50 font-semibold tracking-wide"> </span>
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <a className="flex items-center gap-2 px-4 py-2 rounded-xl text-emerald-200/80 hover:text-white hover:bg-emerald-500/10 transition-all"><Home size={16}/> Home</a>
          <a className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 text-white ring-1 ring-inset ring-emerald-500/40 shadow-[0_0_18px_rgba(16,185,129,0.35)]"><LineChart size={16}/> Analysis</a>
          <a className="flex items-center gap-2 px-4 py-2 rounded-xl text-emerald-200/80 hover:text-white hover:bg-emerald-500/10 transition-all"><BarChart2 size={16}/> Analytics</a>
          <a className="flex items-center gap-2 px-4 py-2 rounded-xl text-emerald-200/80 hover:text-white hover:bg-emerald-500/10 transition-all"><Users size={16}/> Employees</a>
        </nav>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-800/40 text-emerald-100 ring-1 ring-emerald-500/30 hover:ring-emerald-400/60 transition-all">
          <User size={18}/>
        </button>
      </div>
    </div>
  )
}
