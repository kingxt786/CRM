import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import InvoicePrint from '../print/InvoicePrint'

export default function POS(){
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [sale, setSale] = useState(null)

  useEffect(()=>{ load() }, [])
  async function load(){
    const p = await supabase.from('products').select('*')
    const c = await supabase.from('customers').select('*')
    setProducts(p.data || [])
    setCustomers(c.data || [])
  }

  function addToCart(product){
    setCart(prev => {
      const found = prev.find(i=>i.product_id === product.id)
      if(found) return prev.map(i=> i.product_id === product.id ? {...i, qty: i.qty+1} : i)
      return [...prev, { product_id: product.id, title: product.title, unit_price: Number(product.price), qty: 1 }]
    })
  }

  async function createSale(){
    const user = await supabase.auth.getUser()
    const user_id = user.data.user.id
    const subtotal = cart.reduce((s,i)=> s + i.qty * i.unit_price, 0)
    const total = subtotal
    const { data: saleData, error } = await supabase.from('sales').insert([{ user_id, customer_id: selectedCustomer || null, total_amount: total }]).select().single()
    if(error){ alert(error.message); return }
    const sale_id = saleData.id
    const items = cart.map(it=> ({ sale_id, product_id: it.product_id, qty: it.qty, unit_price: it.unit_price }))
    await supabase.from('sale_items').insert(items)
    const fullSale = { ...saleData, subtotal, items: cart }
    setSale(fullSale)
    setCart([])
  }

  return (
    <div>
      <div style={{ display:'flex', gap:8 }}>
        <div style={{flex:1}}>
          <h4>Products</h4>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8}}>
            {products.map(p=> (
              <div key={p.id} className="card">
                <div>{p.title}</div>
                <div>{p.price}</div>
                <button onClick={()=>addToCart(p)}>Add</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{width:320}}>
          <h4>Cart</h4>
          <select onChange={e=>setSelectedCustomer(e.target.value)} value={selectedCustomer || ''}>
            <option value="">Walk-in</option>
            {customers.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ul>
            {cart.map(i=> <li key={i.product_id}>{i.title} x{i.qty} — {i.qty * i.unit_price}</li>)}
          </ul>
          <div>Subtotal: {cart.reduce((s,i)=> s + i.qty * i.unit_price, 0).toFixed(2)}</div>
          <button onClick={createSale}>Complete & Print</button>
        </div>
      </div>

      {sale && (
        <div style={{marginTop:20}}>
          <InvoicePrint sale={sale} customer={customers.find(c=>c.id===sale.customer_id)} items={sale.items} />
        </div>
      )}
    </div>
  )
}