import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Users, 
  BarChart3, 
  Headphones, 
  Shield, 
  Zap,
  Crown,
  Building,
  Globe,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'
import Header from './Header'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    description: 'Perfect for boutique hotels and small properties',
    features: [
      'Up to 50 rooms',
      'Basic service modules',
      'QR code generation',
      'Mobile responsive design',
      'Email support',
      'Basic analytics',
      'Standard response time'
    ],
    color: '#06B6D4',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 499,
    description: 'Ideal for mid-size hotels and resorts',
    features: [
      'Up to 200 rooms',
      'All service modules included',
      'Custom QR code branding',
      'Advanced analytics dashboard',
      'Priority support (24/7)',
      'Staff management portal',
      'Real-time notifications',
      'Multi-language support',
      'Integration capabilities',
      'Guest feedback system'
    ],
    color: '#8B5CF6',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 999,
    description: 'For large hotel chains and luxury properties',
    features: [
      'Unlimited rooms',
      'White-label solution',
      'Advanced customization',
      'Dedicated account manager',
      'Premium 24/7 support',
      'Advanced integrations (PMS, CRM)',
      'Custom reporting',
      'API access',
      'Training and onboarding',
      'SLA guarantee',
      'Multi-property management'
    ],
    color: '#F59E0B',
    popular: false
  }
]

const addOns = [
  {
    name: 'Advanced Analytics',
    price: 99,
    description: 'Detailed insights and custom reports'
  },
  {
    name: 'API Integration',
    price: 149,
    description: 'Connect with existing hotel management systems'
  },
  {
    name: 'Custom Branding',
    price: 199,
    description: 'Full white-label solution with your branding'
  },
  {
    name: 'Staff Training',
    price: 299,
    description: 'Comprehensive training program for your team'
  }
]

function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [showContactForm, setShowContactForm] = useState(false)

  const getPrice = (basePrice) => {
    return billingCycle === 'yearly' ? Math.floor(basePrice * 10) : basePrice
  }

  const getDiscount = () => {
    return billingCycle === 'yearly' ? '17% OFF' : null
  }

  return (
    <div className="fade-in">
      <Header />
      
      <div className="container section">
        <Link to="/" className="btn btn-secondary btn-hover" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header Section */}
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>
            Choose Your Plan
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Transform your hotel's guest experience with QR Concierge. 
            Select the plan that best fits your property size and needs.
          </p>
          
          {/* Billing Toggle */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '50px', 
            padding: '4px',
            marginTop: '2rem'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`btn ${billingCycle === 'monthly' ? 'btn-white' : ''}`}
              style={{ 
                background: billingCycle === 'monthly' ? 'white' : 'transparent',
                color: billingCycle === 'monthly' ? '#667eea' : 'white',
                border: 'none',
                borderRadius: '50px'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`btn ${billingCycle === 'yearly' ? 'btn-white' : ''}`}
              style={{ 
                background: billingCycle === 'yearly' ? 'white' : 'transparent',
                color: billingCycle === 'yearly' ? '#667eea' : 'white',
                border: 'none',
                borderRadius: '50px',
                position: 'relative'
              }}
            >
              Yearly
              {getDiscount() && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#10B981',
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}>
                  {getDiscount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-3" style={{ marginBottom: '4rem' }}>
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`service-card btn-hover ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
              style={{ 
                cursor: 'pointer',
                border: selectedPlan === plan.id ? `3px solid ${plan.color}` : '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: plan.color,
                  color: 'white',
                  padding: '6px 20px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  <Crown size={14} style={{ marginRight: '4px' }} />
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-center">
                <h3 style={{ color: plan.color, fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {plan.name}
                </h3>
                <p style={{ color: '#718096', marginBottom: '1.5rem', minHeight: '48px' }}>
                  {plan.description}
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '800', color: '#2d3748' }}>
                    ${getPrice(plan.price)}
                  </span>
                  <span style={{ color: '#718096', fontSize: '1rem' }}>
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div style={{ color: '#10B981', fontSize: '0.9rem', fontWeight: '600' }}>
                      Save ${plan.price * 2}/year
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'left' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Check size={16} color={plan.color} />
                      <span style={{ color: '#4a5568', fontSize: '0.9rem' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="service-card" style={{ marginBottom: '4rem' }}>
          <h2 style={{ color: '#2d3748', marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>
            Optional Add-ons
          </h2>
          <div className="grid grid-2">
            {addOns.map((addon, index) => (
              <div key={index} style={{ 
                padding: '1.5rem', 
                border: '2px solid #e2e8f0', 
                borderRadius: '12px',
                background: '#f8fafc'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{addon.name}</h4>
                  <span style={{ color: '#667eea', fontWeight: '700', fontSize: '1.1rem' }}>
                    +${addon.price}/mo
                  </span>
                </div>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="service-card text-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join hundreds of hotels worldwide that have transformed their guest experience with QR Concierge.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowContactForm(true)}
              className="btn btn-white btn-hover"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              <Sparkles size={20} />
              Start Free Trial
            </button>
            <button 
              onClick={() => setShowContactForm(true)}
              className="btn btn-secondary btn-hover"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              <Phone size={20} />
              Schedule Demo
            </button>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} />
              <span style={{ fontSize: '0.9rem' }}>30-day money-back guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={16} />
              <span style={{ fontSize: '0.9rem' }}>Setup in 24 hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Headphones size={16} />
              <span style={{ fontSize: '0.9rem' }}>24/7 support included</span>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div className="service-card" style={{ maxWidth: '500px', width: '100%', position: 'relative' }}>
              <button
                onClick={() => setShowContactForm(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#718096'
                }}
              >
                ×
              </button>
              
              <h3 style={{ color: '#2d3748', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Get Started with QR Concierge
              </h3>
              
              <form>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Hotel Name"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    <option>Number of Rooms</option>
                    <option>1-50 rooms</option>
                    <option>51-200 rooms</option>
                    <option>201-500 rooms</option>
                    <option>500+ rooms</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary btn-hover"
                  style={{ 
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <Calendar size={20} />
                  Schedule Your Demo
                </button>
              </form>
              
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                  Or contact us directly:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <a href="mailto:sales@qrconcierge.com" style={{ color: '#667eea', textDecoration: 'none' }}>
                    <Mail size={16} style={{ marginRight: '4px' }} />
                    sales@qrconcierge.com
                  </a>
                  <a href="tel:+1234567890" style={{ color: '#667eea', textDecoration: 'none' }}>
                    <Phone size={16} style={{ marginRight: '4px' }} />
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="service-card" style={{ marginTop: '4rem' }}>
          <h2 style={{ color: '#2d3748', marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-2">
            <div>
              <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>How quickly can we get started?</h4>
              <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
                Most hotels can be up and running within 24-48 hours. We provide QR codes, setup assistance, and staff training.
              </p>
              
              <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Do you integrate with existing hotel systems?</h4>
              <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
                Yes! We integrate with most major PMS, CRM, and hotel management systems. Custom integrations are available for Enterprise plans.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Is there a setup fee?</h4>
              <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
                No setup fees for any plan. We include onboarding, training, and QR code generation at no extra cost.
              </p>
              
              <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Can we customize the interface?</h4>
              <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
                Absolutely! All plans include customization options, with full white-labeling available for Enterprise customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage