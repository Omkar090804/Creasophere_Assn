import React, {useState} from 'react';
export default function ChatArea({onQuery}){
  const [q,setQ] = useState('');
  return (<div className="input-group mt-3">
    <input value={q} onChange={e=>setQ(e.target.value)} className="form-control" placeholder="Ask e.g. Analyze Wakad" />
    <button className="btn btn-primary" onClick={()=>{ if(q.trim()) onQuery(q.trim()); }}>Send</button>
  </div>);
}
