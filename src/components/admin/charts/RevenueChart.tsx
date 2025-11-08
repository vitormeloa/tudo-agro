'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', receita: 240000, comissao: 24000, cashback: 12000 },
  { month: 'Fev', receita: 139800, comissao: 13980, cashback: 6990 },
  { month: 'Mar', receita: 980000, comissao: 98000, cashback: 49000 },
  { month: 'Abr', receita: 390800, comissao: 39080, cashback: 19540 },
  { month: 'Mai', receita: 480000, comissao: 48000, cashback: 24000 },
  { month: 'Jun', receita: 380000, comissao: 38000, cashback: 19000 },
  { month: 'Jul', receita: 430000, comissao: 43000, cashback: 21500 },
  { month: 'Ago', receita: 520000, comissao: 52000, cashback: 26000 },
  { month: 'Set', receita: 610000, comissao: 61000, cashback: 30500 },
  { month: 'Out', receita: 480000, comissao: 48000, cashback: 24000 },
  { month: 'Nov', receita: 550000, comissao: 55000, cashback: 27500 },
  { month: 'Dez', receita: 720000, comissao: 72000, cashback: 36000 },
]

export default function RevenueChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              `R$ ${Number(value).toLocaleString('pt-BR')}`, 
              name === 'receita' ? 'Receita Total' : 
              name === 'comissao' ? 'Comissão' : 'Cashback'
            ]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="receita" 
            stackId="1" 
            stroke="#0A9965" 
            fill="#0A9965" 
            fillOpacity={0.6}
            name="receita"
          />
          <Area 
            type="monotone" 
            dataKey="comissao" 
            stackId="2" 
            stroke="#6E7D5B" 
            fill="#6E7D5B" 
            fillOpacity={0.6}
            name="comissao"
          />
          <Area 
            type="monotone" 
            dataKey="cashback" 
            stackId="3" 
            stroke="#B8413D" 
            fill="#B8413D" 
            fillOpacity={0.6}
            name="cashback"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}