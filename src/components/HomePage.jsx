import React from 'react'
import { Link } from 'react-router-dom'
import { 
  QrCode, 
  Sparkles, 
  Bed, 
  UtensilsCrossed, 
  Wrench, 
  Users, 
  MapPin, 
  MessageSquare,
  Star,
  Shield,
  Zap,
  Heart
} from 'lucide-react'
import Header from './Header'

const services = [
  {
    id: 'housekeeping',
    title: 'Housekeeping & Requests',
    description: 'Request room cleaning, fresh towels, amenities, and housekeeping services',
    icon: Bed,
    color: '#10B981'
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
    description: 'Order room service, browse restaurant menus, and make dining reservations',
    icon: UtensilsCrossed,
    color: '#F59E0B'
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Report room issues, request repairs, and technical support',
    icon: Wrench,
    color: '#EF4444'
  },
  {
    id: 'front-desk',
    title: 'Front Desk',
    description: 'Check-in/out, billing inquiries, and general hotel services',
    icon: Users,
    color: '#8B5CF6'
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Interactive hotel maps, directions, and local area information',
    icon: MapPin,
    color: '#06B6D4'
  },
  {
    id: 'feedback',
    title: 'Feedback & Forms',
    description: 'Share your experience, complete surveys, and submit suggestions',
    icon: MessageSquare,
    color: '#EC4899'
  }
]

const features = [
  {
    icon: QrCode,
    title: 'QR Code Access',
    description: 'Simply scan the QR code in your room to access all services instantly'
  },
  {
    icon: Zap,
    title: 'Instant Service',
    description: 'Get immediate responses to your requests with real-time notifications'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security measures'
  },
  {
    icon: Heart,
    title: 'Personalized Experience',
    description: 'Tailored recommendations based on your preferences and stay history'
  }
]

function HomePage() {
  return (
    <div className="fade-in">
      <Header />
      
      {/* Hero Section */}
      <section className="section">
        <div className="container text-center">
          <div className="hero-content">
            <div className="logo-icon" style={{ width: '80px', height: '80px', margin: '0 auto 2rem', fontSize: '2rem' }}>
              <QrCode size={40} />
            </div>
            <h1 className="hero-title">QR CONCIERGE</h1>
            <p className="hero-subtitle">
              A cutting-edge digital solution designed to elevate the guest experience in hotels 
              by providing an intuitive, QR code-activated platform for accessing a comprehensive suite of services.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/subscription" className="btn btn-white btn-hover">
                <Sparkles size={20} />
                View Subscription Plans
              </Link>
              <a href="#services" className="btn btn-secondary btn-hover">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div className="container">
          <h2 className="section-title text-center">Why Choose QR Concierge?</h2>
          <div className="grid grid-2">
            {features.map((feature, index) => (
              <div key={index} className="service-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-icon">
                  <feature.icon size={30} />
                </div>
                <h3 className="service-title">{feature.title}</h3>
                <p className="service-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title text-center">Our Services</h2>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <Link 
                key={service.id} 
                to={`/service/${service.id}`}
                className="service-card btn-hover slide-in"
                style={{ 
                  textDecoration: 'none',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="service-icon" style={{ background: service.color }}>
                  <service.icon size={30} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div className="container">
          <h2 className="section-title text-center">What Our Hotel Partners Say</h2>
          <div className="grid grid-2">
            <div className="service-card">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="service-description" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "QR Concierge has revolutionized our guest experience. The seamless integration and instant service requests have increased our guest satisfaction scores by 40%."
              </p>
              <p className="service-title" style={{ fontSize: '1rem', color: '#667eea' }}>
                - Sarah Johnson, Grand Hotel Manager
              </p>
            </div>
            <div className="service-card">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="service-description" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "The QR code system is so intuitive that even our less tech-savvy guests love it. It's reduced our front desk workload significantly while improving service quality."
              </p>
              <p className="service-title" style={{ fontSize: '1rem', color: '#667eea' }}>
                - Michael Chen, Luxury Resort Director
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Ready to Transform Your Hotel Experience?</h2>
          <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join hundreds of hotels worldwide that have already upgraded their guest services with QR Concierge.
          </p>
          <Link to="/subscription" className="btn btn-white btn-hover" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            <Sparkles size={24} />
            Get Started Today - $499/month
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '2rem 0', marginTop: '4rem' }}>
        <div className="container text-center">
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <div className="logo-icon">
              <QrCode size={24} />
            </div>
            QR CONCIERGE
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Elevating hotel guest experiences through innovative digital solutions.
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '1rem', fontSize: '0.9rem' }}>
            © 2024 QR Concierge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage