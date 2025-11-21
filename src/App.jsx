import { useEffect, useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import KPICard from './components/KPICard'
import { LineGlowChart, PieChart } from './components/Charts'
import Spline from '@splinetool/react-spline'

function useAnalysis() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/analysis`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { data, loading }
}

function SectionShell({ children }) {
  return (
    <div className="relative rounded-[24px] p-[1px]">
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-emerald-400/30 via-emerald-500/10 to-transparent blur opacity-50" />
      <div className="relative rounded-[24px] bg-emerald-900/40 backdrop-blur-xl ring-1 ring-inset ring-emerald-400/20">{children}</div>
    </div>
  )
}

export default function App() {
  const { data, loading } = useAnalysis()

  const kpis = useMemo(() => data?.kpis || {
    totalRevenue: 123456,
    thisMonthRevenue: 8940,
    avgGrowth: 10.4,
    avgQtyPerMonth: 245,
  }, [data])

  const revenueTrend = useMemo(() => (data?.revenueTrend || [
    { month: 'Jan', value: 22000 },
    { month: 'Feb', value: 26000 },
    { month: 'Mar', value: 31000 },
    { month: 'Apr', value: 28000 },
  ]), [data])

  const engagementTrend = useMemo(() => (data?.engagementTrend || [
    { month: 'Jan', value: 18000 },
    { month: 'Feb', value: 21500 },
    { month: 'Mar', value: 29000 },
  ]), [data])

  const countrySales = useMemo(() => (data?.countrySales || [
    { name: 'Country A', value: 40 },
    { name: 'Country B', value: 25 },
    { name: 'Country C', value: 15 },
    { name: 'Country D', value: 10 },
    { name: 'Country E', value: 10 },
  ]), [data])

  const paymentDistribution = useMemo(() => (data?.paymentDistribution || [
    { name: 'UPI / Digital Wallets', value: 70 },
    { name: 'Credit Card', value: 15 },
    { name: 'Debit Card', value: 10 },
    { name: 'Cash', value: 5 },
  ]), [data])

  return (
    <div className="min-h-screen bg-[#04150F] text-emerald-50">
      <div className="fixed inset-0 opacity-40 pointer-events-none" aria-hidden>
        <div className="absolute -inset-[25%] bg-[radial-gradient(600px_200px_at_20%_10%,rgba(16,185,129,0.2),transparent),radial-gradient(400px_160px_at_80%_20%,rgba(5,150,105,0.25),transparent)]" />
      </div>

      <Navbar />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SectionShell>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <div className="col-span-1 md:col-span-2 flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Analysis Dashboard</h1>
                <span className="text-xs text-emerald-200/60">{data?.source === 'sheet' ? 'Live' : 'Sample'} Data</span>
              </div>
              <KPICard label="Total Revenue" value={`$${kpis.totalRevenue?.toLocaleString?.() || kpis.totalRevenue}`} sub="All Time" />
              <KPICard label="This Month Revenue" value={`$${kpis.thisMonthRevenue?.toLocaleString?.() || kpis.thisMonthRevenue}`} sub="Current Month" />
              <KPICard label="Avg Growth" value={`${kpis.avgGrowth}%`} sub="Month over Month" />
              <KPICard label="Avg Qty/Month" value={`${kpis.avgQtyPerMonth} units`} sub="Average Sold" />
            </div>
          </SectionShell>

          <SectionShell>
            <div className="relative h-72 md:h-[360px] rounded-[24px] overflow-hidden">
              <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04150f] via-transparent to-transparent" />
            </div>
          </SectionShell>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SectionShell>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-emerald-100">Revenue Trends</h3>
                <div className="text-xs text-emerald-200/60">Last 4 months</div>
              </div>
              <LineGlowChart labels={revenueTrend.map(d=>d.month)} data={revenueTrend.map(d=>d.value)} color="rgba(16,185,129,1)" />
            </div>
          </SectionShell>

          <SectionShell>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-emerald-100">User Engagement (3 Months)</h3>
                <div className="text-xs text-emerald-200/60">Email/Orders proxy</div>
              </div>
              <LineGlowChart labels={engagementTrend.map(d=>d.month)} data={engagementTrend.map(d=>d.value)} color="rgba(251,146,60,1)" />
            </div>
          </SectionShell>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionShell>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-emerald-100">Country Sales</h3>
                <div className="text-xs text-emerald-200/60">Distribution</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChart labels={countrySales.map(d=>d.name)} data={countrySales.map(d=>d.value)} colors={["#10B981","#34D399","#6EE7B7","#A7F3D0","#ECFDF5"]} />
                <ul className="space-y-2">
                  {countrySales.slice(0,5).map((c, i) => (
                    <li key={i} className="flex items-center justify-between text-sm text-emerald-100/90">
                      <span className="truncate pr-2">{c.name}</span>
                      <span className="font-medium">${Number(c.value).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionShell>

          <SectionShell>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-emerald-100">Payment Mode Distribution</h3>
                <div className="text-xs text-emerald-200/60">Share</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChart labels={paymentDistribution.map(d=>d.name)} data={paymentDistribution.map(d=>d.value)} colors={["#F97316","#FDBA74","#FED7AA","#1F2937"]} />
                <ul className="space-y-2">
                  {paymentDistribution.slice(0,5).map((p, i) => (
                    <li key={i} className="flex items-center justify-between text-sm text-emerald-100/90">
                      <span className="truncate pr-2">{p.name}</span>
                      <span className="font-medium">{p.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionShell>
        </div>

        {loading && (
          <div className="fixed bottom-4 right-4 text-xs px-3 py-2 rounded-xl bg-emerald-800/50 ring-1 ring-emerald-400/30">
            Loading data...
          </div>
        )}
      </main>
    </div>
  )
}
