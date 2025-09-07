import React from 'react'
import POS from './POS'
import Customers from './Customers'

export default function Dashboard() {
  return (
    <div className="app-grid">
      <div className="left">
        <h1>TotBtot POS</h1>
        <POS />
      </div>
      <div className="right">
        <Customers />
      </div>
    </div>
  )
}