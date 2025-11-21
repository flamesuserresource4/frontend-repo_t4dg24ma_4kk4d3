import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function glow(ctx, color) {
  ctx.shadowColor = color
  ctx.shadowBlur = 18
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
}

export function LineGlowChart({ labels, data, color = 'rgba(16,185,129,1)' }) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (chartRef.current) chartRef.current.destroy()
    const ctx = ref.current.getContext('2d')

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: color,
            backgroundColor: 'rgba(16,185,129,0.08)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(16,185,129,0.08)' }, ticks: { color: 'rgba(236,253,245,0.6)' } },
          y: { grid: { color: 'rgba(16,185,129,0.08)' }, ticks: { color: 'rgba(236,253,245,0.6)' } },
        },
        animation: { duration: 900, easing: 'easeInOutQuad' },
        elements: {
          line: {
            borderJoinStyle: 'round',
            borderCapStyle: 'round',
          },
        },
      },
      plugins: [{
        id: 'glow',
        beforeDraw: (chart) => {
          const ctx = chart.ctx
          glow(ctx, color)
        },
        afterDraw: (chart) => {
          const ctx = chart.ctx
          ctx.shadowColor = 'transparent'
        },
      }],
    })

    return () => chartRef.current?.destroy()
  }, [labels, data, color])

  return <canvas ref={ref} height={120} />
}

export function PieChart({ labels, data, colors }) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (chartRef.current) chartRef.current.destroy()
    const ctx = ref.current.getContext('2d')

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: 'rgba(226,252,237,0.1)'
          },
        ],
      },
      options: {
        cutout: '68%',
        plugins: { legend: { display: false } },
        animation: { duration: 900, easing: 'easeInOutQuad' },
      },
    })

    return () => chartRef.current?.destroy()
  }, [labels, data, colors])

  return <canvas ref={ref} height={140} />
}
