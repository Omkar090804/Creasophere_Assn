import React, {useState} from 'react';
import axios from 'axios';
import ChatArea from './components/ChatArea';
import ChartView from './components/ChartView';
import TableView from './components/TableView';

export default function App(){
  const [summary, setSummary] = useState('');
  const [chartData, setChartData] = useState([]);
  const [rows, setRows] = useState([]);

  async function handleQuery(q){
    try{
      const res = await axios.get('http://localhost:8000/api/analyze/', { params: { q } });
      setSummary(res.data.summary);
      setChartData(res.data.chart);
      setRows(res.data.rows);
    }catch(e){
      setSummary('Error: Could not reach backend. Make sure backend is running on port 8000.');
      setChartData([]);
      setRows([]);
    }
  }

  return (<div className="container py-4">
    <h3>Real Estate Chatbot — Mini Analysis</h3>
    <ChatArea onQuery={handleQuery} />
    <div className="mt-3">
      <h5>Summary</h5>
      <div className="p-3 border rounded">{summary}</div>
    </div>
    <div className="mt-3">
      <h5>Chart</h5>
      <ChartView data={chartData} />
    </div>
    <div className="mt-3">
      <h5>Filtered Table</h5>
      <TableView rows={rows} />
    </div>
  </div>)
}
