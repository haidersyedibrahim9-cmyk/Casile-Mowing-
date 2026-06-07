'use client'

import HeroSection from '@/components/HeroSection'
import ServiceCard from '@/components/ServiceCard'
import BookingForm from '@/components/BookingForm'
import TestimonialCard from '@/components/TestimonialCard'
import GalleryImage from '@/components/GalleryImage'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  const services = [
    {
      icon: '✂️',
      title: 'Lawn Mowing',
      description: 'Professional lawn mowing with precision and care. We keep your grass healthy and looking great.'
    },
    {
      icon: '🌳',
      title: 'Landscaping',
      description: 'Creative landscaping designs to transform your outdoor space into a beautiful oasis.'
    },
    {
      icon: '🪴',
      title: 'Maintenance',
      description: 'Regular maintenance packages to keep your lawn in perfect condition year-round.'
    },
    {
      icon: '✨',
      title: 'Trimming & Edging',
      description: 'Precise trimming and edging for a polished, professional look.'
    }
  ]

  const testimonials = [
    {
      name: 'John Smith',
      text: 'Casile Mowing has been taking care of my lawn for 2 years. They are reliable, professional, and always on time!',
      rating: 5,
      image: ''
    },
    {
      name: 'Sarah Johnson',
      text: 'Best lawn care service in the city! My yard has never looked better. Highly recommended!',
      rating: 5,
      image: ''
    },
    {
      name: 'Mike Davis',
      text: 'Professional team, great prices, and excellent service. Cannot ask for more!',
      rating: 5,
      image: ''
    },
    {
      name: 'Emily Wilson',
      text: 'Casile Mowing transformed my backyard. The attention to detail is amazing!',
      rating: 5,
      image: ''
    }
  ]

  const gallery = [
    { src: '', alt: 'Before & After', title: 'Before & After' },
    { src: '', alt: 'Landscape Design', title: 'Landscape Design' },
    { src: '', alt: 'Garden Maintenance', title: 'Garden Maintenance' },
    { src: '', alt: 'Yard Transformation', title: 'Yard Transformation' },
    { src: '', alt: 'Professional Trimming', title: 'Professional Trimming' },
    { src: '', alt: 'Complete Makeover', title: 'Complete Makeover' }
  ]

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Book Your Service</h2>
          <BookingForm />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Customer Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <GalleryImage key={index} {...image} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-primary">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">📞 Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">📧 Email</h3>
                  <p className="text-gray-600">info@calilemowing.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">📍 Service Area</h3>
                  <p className="text-gray-600">We service the entire city and surrounding areas</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">🕒 Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
