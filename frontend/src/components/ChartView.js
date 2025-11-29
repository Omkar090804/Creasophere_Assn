import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
export default function ChartView({data}){
  if(!data || data.length===0) return <div className="text-muted">No chart data</div>;
  return (<div style={{width:'100%', height:300}}>
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price_avg" stroke="#8884d8" name="Avg Price" />
        <Line type="monotone" dataKey="demand_sum" stroke="#82ca9d" name="Demand" />
      </LineChart>
    </ResponsiveContainer>
  </div>);
}
