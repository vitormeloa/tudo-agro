'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', vendas: 2400, leiloes: 1200, diretas: 1200 },
  { month: 'Fev', vendas: 1398, leiloes: 800, diretas: 598 },
  { month: 'Mar', vendas: 9800, leiloes: 4800, diretas: 5000 },
  { month: 'Abr', vendas: 3908, leiloes: 2000, diretas: 1908 },
  { month: 'Mai', vendas: 4800, leiloes: 2400, diretas: 2400 },
  { month: 'Jun', vendas: 3800, leiloes: 1800, diretas: 2000 },
  { month: 'Jul', vendas: 4300, leiloes: 2300, diretas: 2000 },
  { month: 'Ago', vendas: 5200, leiloes: 3200, diretas: 2000 },
  { month: 'Set', vendas: 6100, leiloes: 4100, diretas: 2000 },
  { month: 'Out', vendas: 4800, leiloes: 2800, diretas: 2000 },
  { month: 'Nov', vendas: 5500, leiloes: 3500, diretas: 2000 },
  { month: 'Dez', vendas: 7200, leiloes: 5200, diretas: 2000 },
]

export default function SalesChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              `R$ ${Number(value).toLocaleString('pt-BR')}`, 
              name === 'vendas' ? 'Total Vendas' : 
              name === 'leiloes' ? 'Leilões' : 'Vendas Diretas'
            ]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="vendas" 
            stroke="#0A9965" 
            strokeWidth={3}
            name="vendas"
          />
          <Line 
            type="monotone" 
            dataKey="leiloes" 
            stroke="#6E7D5B" 
            strokeWidth={2}
            name="leiloes"
          />
          <Line 
            type="monotone" 
            dataKey="diretas" 
            stroke="#B8413D" 
            strokeWidth={2}
            name="diretas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}