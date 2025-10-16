import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Bed, 
  UtensilsCrossed, 
  Wrench, 
  Users, 
  MapPin, 
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  Star,
  Phone,
  Mail
} from 'lucide-react'
import Header from './Header'

const serviceData = {
  'housekeeping': {
    title: 'Housekeeping & Requests',
    icon: Bed,
    color: '#10B981',
    description: 'Request room cleaning, fresh towels, amenities, and housekeeping services with just a few taps.',
    features: [
      'Room cleaning service',
      'Fresh towels and linens',
      'Bathroom amenities refill',
      'Minibar restocking',
      'Extra pillows and blankets',
      'Iron and ironing board',
      'Hair dryer replacement',
      'Room temperature adjustment'
    ],
    requestTypes: [
      'Standard room cleaning',
      'Express cleaning (30 min)',
      'Deep cleaning service',
      'Towel replacement',
      'Amenities refill',
      'Extra supplies',
      'Special requests'
    ]
  },
  'food-beverages': {
    title: 'Food & Beverages',
    icon: UtensilsCrossed,
    color: '#F59E0B',
    description: 'Order delicious meals, beverages, and make restaurant reservations directly from your room.',
    features: [
      '24/7 room service',
      'Restaurant reservations',
      'Bar menu access',
      'Dietary preferences',
      'Special occasion meals',
      'In-room dining setup',
      'Wine selection',
      'Local cuisine recommendations'
    ],
    requestTypes: [
      'Room service order',
      'Restaurant reservation',
      'Bar service',
      'Special dietary meal',
      'Celebration setup',
      'Wine pairing',
      'Local recommendations'
    ]
  },
  'maintenance': {
    title: 'Maintenance',
    icon: Wrench,
    color: '#EF4444',
    description: 'Report room issues, request repairs, and get technical support for a comfortable stay.',
    features: [
      'Emergency repairs',
      'Air conditioning service',
      'Plumbing issues',
      'Electrical problems',
      'TV and internet support',
      'Safe troubleshooting',
      'Door lock assistance',
      'Lighting adjustments'
    ],
    requestTypes: [
      'Emergency repair',
      'AC/Heating issue',
      'Plumbing problem',
      'Electrical fault',
      'TV/Internet support',
      'Safe assistance',
      'General maintenance'
    ]
  },
  'front-desk': {
    title: 'Front Desk',
    icon: Users,
    color: '#8B5CF6',
    description: 'Access front desk services including check-in/out, billing, and general hotel information.',
    features: [
      'Express check-out',
      'Billing inquiries',
      'Wake-up calls',
      'Luggage assistance',
      'Taxi booking',
      'Tour arrangements',
      'Currency exchange',
      'Lost and found'
    ],
    requestTypes: [
      'Express check-out',
      'Billing question',
      'Wake-up call',
      'Luggage service',
      'Transportation',
      'Tour booking',
      'General inquiry'
    ]
  },
  'navigation': {
    title: 'Navigation',
    icon: MapPin,
    color: '#06B6D4',
    description: 'Interactive hotel maps, local area information, and directions to help you navigate with ease.',
    features: [
      'Interactive hotel map',
      'Local attractions',
      'Restaurant recommendations',
      'Shopping centers',
      'Transportation hubs',
      'Emergency services',
      'Walking directions',
      'Popular landmarks'
    ],
    requestTypes: [
      'Hotel facilities map',
      'Local attractions',
      'Restaurant guide',
      'Shopping locations',
      'Transportation info',
      'Emergency contacts',
      'Custom directions'
    ]
  },
  'feedback': {
    title: 'Feedback & Forms',
    icon: MessageSquare,
    color: '#EC4899',
    description: 'Share your experience, complete surveys, and submit suggestions to help us improve our services.',
    features: [
      'Service feedback',
      'Room rating',
      'Staff appreciation',
      'Suggestion box',
      'Complaint resolution',
      'Survey participation',
      'Photo submissions',
      'Testimonial sharing'
    ],
    requestTypes: [
      'Service feedback',
      'Room review',
      'Staff compliment',
      'Suggestion',
      'Complaint',
      'Survey response',
      'Photo sharing'
    ]
  }
}

function ServicePage() {
  const { serviceId } = useParams()
  const service = serviceData[serviceId]
  const [selectedRequest, setSelectedRequest] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState('normal')
  const [submitted, setSubmitted] = useState(false)

  if (!service) {
    return (
      <div className="fade-in">
        <Header />
        <div className="container section text-center">
          <h1 style={{ color: 'white' }}>Service Not Found</h1>
          <Link to="/" className="btn btn-white btn-hover">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="fade-in">
      <Header />
      
      <div className="container section">
        <Link to="/" className="btn btn-secondary btn-hover" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={20} />
          Back to Services
        </Link>

        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          {/* Service Info */}
          <div className="service-card">
            <div className="service-icon" style={{ background: service.color }}>
              <service.icon size={40} />
            </div>
            <h1 className="service-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {service.title}
            </h1>
            <p className="service-description" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              {service.description}
            </p>

            <h3 style={{ color: '#2d3748', marginBottom: '1rem', fontSize: '1.25rem' }}>Available Services:</h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {service.features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color={service.color} />
                  <span style={{ color: '#4a5568' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f7fafc', borderRadius: '10px' }}>
              <h4 style={{ color: '#2d3748', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} />
                Response Time
              </h4>
              <p style={{ color: '#718096', margin: 0 }}>
                {serviceId === 'maintenance' ? 'Emergency: Immediate | Standard: 15-30 minutes' : 
                 serviceId === 'food-beverages' ? '15-45 minutes depending on order' :
                 serviceId === 'housekeeping' ? '30-60 minutes' : 
                 'Immediate to 15 minutes'}
              </p>
            </div>
          </div>

          {/* Request Form */}
          <div className="service-card">
            <h2 style={{ color: '#2d3748', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              Make a Request
            </h2>

            {submitted ? (
              <div className="text-center" style={{ padding: '2rem' }}>
                <CheckCircle size={60} color={service.color} style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: service.color, marginBottom: '1rem' }}>Request Submitted!</h3>
                <p style={{ color: '#718096' }}>
                  Your request has been sent to our team. You'll receive a confirmation shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2d3748', fontWeight: '600' }}>
                    Request Type
                  </label>
                  <select 
                    value={selectedRequest}
                    onChange={(e) => setSelectedRequest(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    <option value="">Select a request type...</option>
                    {service.requestTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2d3748', fontWeight: '600' }}>
                    Priority Level
                  </label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2d3748', fontWeight: '600' }}>
                    Additional Details
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide any additional details about your request..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  className="btn btn-primary btn-hover"
                  style={{ 
                    width: '100%', 
                    background: service.color,
                    fontSize: '1.1rem',
                    padding: '1rem'
                  }}
                >
                  <Send size={20} />
                  Submit Request
                </button>
              </form>
            )}

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f7fafc', borderRadius: '10px' }}>
              <h4 style={{ color: '#2d3748', marginBottom: '1rem' }}>Need Immediate Help?</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="tel:+1234567890" className="btn btn-secondary" style={{ flex: 1 }}>
                  <Phone size={16} />
                  Call Front Desk
                </a>
                <a href="mailto:concierge@hotel.com" className="btn btn-secondary" style={{ flex: 1 }}>
                  <Mail size={16} />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Rating */}
        <div className="service-card" style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#2d3748', marginBottom: '1rem', textAlign: 'center' }}>
            Rate This Service
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star 
                key={rating} 
                size={24} 
                className="btn-hover" 
                style={{ cursor: 'pointer', color: '#F59E0B' }}
                fill="#F59E0B"
              />
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#718096' }}>
            Your feedback helps us improve our services
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServicePage