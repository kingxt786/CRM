import React, { forwardRef, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export const InvoiceTemplate = forwardRef(({ sale, customer, items }, ref) => (
  <div ref={ref} style={{ padding:20, fontFamily:'Arial' }}>
    <h2>Tot Btot</h2>
    <div>Invoice #{sale.id.split('-')[0]}</div>
    <div>Date: {new Date(sale.created_at).toLocaleString()}</div>
    <hr />
    <div><strong>Customer:</strong> {customer?.name || 'Walk-in'}</div>
    <table style={{ width:'100%', marginTop:12 }}>
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th></tr>
      </thead>
      <tbody>
        {items.map(it=> (
          <tr key={it.product_id}><td>{it.title}</td><td>{it.qty}</td><td>{it.unit_price.toFixed(2)}</td><td>{(it.qty*it.unit_price).toFixed(2)}</td></tr>
        ))}
      </tbody>
    </table>
    <div style={{ textAlign:'right', marginTop:12 }}>
      <div>Subtotal: {sale.subtotal?.toFixed(2)}</div>
      <div style={{ fontWeight:700 }}>TOTAL: {sale.total_amount.toFixed(2)}</div>
    </div>
  </div>
))

export default function InvoicePrint({ sale, customer, items }){
  const ref = useRef()
  const handlePrint = useReactToPrint({ content: ()=>ref.current })
  return (
    <div>
      <InvoiceTemplate ref={ref} sale={sale} customer={customer} items={items} />
      <button onClick={handlePrint}>Print</button>
    </div>
  )
}