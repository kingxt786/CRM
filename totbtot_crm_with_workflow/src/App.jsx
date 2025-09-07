import React, { useEffect, useState } from 'react'
import Auth from './auth/Auth'
import Dashboard from './pages/Dashboard'
import { supabase } from './lib/supabase'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    })()

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!session) return <Auth />
  return <Dashboard session={session} />
}