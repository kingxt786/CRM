import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  async function load() {
    const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false })
    setCustomers(data || [])
  }

  useEffect(()=>{ load() }, [])

  async function addCustomer() {
    await supabase.from('customers').insert([{ name, phone }])
    setName(''); setPhone(''); load()
  }

  return (
    <div>
      <h3>Customers</h3>
      <input placeholder="name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button onClick={addCustomer}>Add</button>
      <ul>
        {customers.map(c => <li key={c.id}>{c.name} — {c.phone}</li>)}
      </ul>
    </div>
  )
}