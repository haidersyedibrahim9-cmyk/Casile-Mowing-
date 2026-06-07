export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🌿 Casile Mowing</h3>
            <p className="text-gray-400">Professional lawn care and landscaping services</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#services" className="hover:text-white">Lawn Mowing</a></li>
              <li><a href="#services" className="hover:text-white">Landscaping</a></li>
              <li><a href="#services" className="hover:text-white">Maintenance</a></li>
              <li><a href="#services" className="hover:text-white">Trimming</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#booking" className="hover:text-white">Book Now</a></li>
              <li><a href="#testimonials" className="hover:text-white">Reviews</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">📞 (555) 123-4567</p>
            <p className="text-gray-400 mb-2">📧 info@calilemowing.com</p>
            <p className="text-gray-400">📍 Service Area: City-Wide</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Casile Mowing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
