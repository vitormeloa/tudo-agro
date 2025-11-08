'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', usuarios: 1200, vendedores: 150, compradores: 1050 },
  { month: 'Fev', usuarios: 1350, vendedores: 180, compradores: 1170 },
  { month: 'Mar', usuarios: 1580, vendedores: 220, compradores: 1360 },
  { month: 'Abr', usuarios: 1820, vendedores: 280, compradores: 1540 },
  { month: 'Mai', usuarios: 2100, vendedores: 320, compradores: 1780 },
  { month: 'Jun', usuarios: 2450, vendedores: 380, compradores: 2070 },
  { month: 'Jul', usuarios: 2800, vendedores: 450, compradores: 2350 },
  { month: 'Ago', usuarios: 3200, vendedores: 520, compradores: 2680 },
  { month: 'Set', usuarios: 3650, vendedores: 600, compradores: 3050 },
  { month: 'Out', usuarios: 4100, vendedores: 680, compradores: 3420 },
  { month: 'Nov', usuarios: 4600, vendedores: 750, compradores: 3850 },
  { month: 'Dez', usuarios: 5200, vendedores: 850, compradores: 4350 },
]

export default function UserGrowthChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              Number(value).toLocaleString('pt-BR'), 
              name === 'usuarios' ? 'Total Usuários' : 
              name === 'vendedores' ? 'Vendedores' : 'Compradores'
            ]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Bar dataKey="usuarios" fill="#0A9965" name="usuarios" />
          <Bar dataKey="vendedores" fill="#6E7D5B" name="vendedores" />
          <Bar dataKey="compradores" fill="#B8413D" name="compradores" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}