import React from 'react';
export default function TableView({rows}){
  if(!rows || rows.length===0) return <div className="text-muted">No rows</div>;
  const keys = Object.keys(rows[0]);
  return (<div className="table-responsive">
    <table className="table table-striped">
      <thead><tr>{keys.map(k=><th key={k}>{k}</th>)}</tr></thead>
      <tbody>{rows.map((r,i)=>(<tr key={i}>{keys.map(k=><td key={k}>{String(r[k])}</td>)}</tr>))}</tbody>
    </table>
  </div>);
}
