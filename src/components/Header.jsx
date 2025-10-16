import React from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Sparkles } from 'lucide-react'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <QrCode size={24} />
          </div>
          QR CONCIERGE
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#services" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            Services
          </a>
          <Link to="/subscription" className="btn btn-white" style={{ padding: '0.5rem 1rem' }}>
            <Sparkles size={16} />
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header