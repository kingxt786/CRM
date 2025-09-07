import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  async function signIn() {
    await supabase.auth.signInWithOtp({ email })
    alert('Login link sent to email (use same email to sign in).')
  }
  return (
    <div className="center">
      <h2>TotBtot CRM — Login</h2>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={signIn}>Send magic link</button>
    </div>
  )
}