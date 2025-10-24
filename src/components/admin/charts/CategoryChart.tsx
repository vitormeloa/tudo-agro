'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Gado de Corte', value: 35.2, count: 1247, color: '#1E4D2B' },
  { name: 'Cavalos', value: 25.1, count: 892, color: '#6E7D5B' },
  { name: 'Gado Leiteiro', value: 18.4, count: 654, color: '#B8413D' },
  { name: 'Sêmen Bovino', value: 12.2, count: 432, color: '#2B5A31' },
  { name: 'Outros', value: 9.1, count: 321, color: '#8B4513' },
]

export default function CategoryChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [
              `${value}%`, 
              props.payload.name
            ]}
            labelFormatter={(label) => `Categoria: ${label}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}