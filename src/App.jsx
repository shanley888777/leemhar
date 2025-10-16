import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ServicePage from './components/ServicePage'
import SubscriptionPage from './components/SubscriptionPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Routes>
    </div>
  )
}

export default App