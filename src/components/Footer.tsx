
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, Phone, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_your_service_id',
        'template_newsletter',
        {
          email: email,
          message: `Newsletter subscription from: ${email}`,
        },
        'your_public_key'
      );
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <footer id="contact" className="bg-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info & Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/shinebridgeempowermentlogo.png" 
                alt="SBEN Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              Empowering communities through education, healthcare, and sustainable development initiatives in Kibera, Nairobi.
            </p>
            <div className="flex items-start space-x-3 text-gray-300 mb-6">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-secondary-400" />
              <span className="text-sm">Kibera, Nairobi, Kenya</span>
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-primary-700 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/resources/events" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/about/team" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-primary-700 pb-2">Our Programs</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/programs/education" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Education Support
                </Link>
              </li>
              <li>
                <Link to="/programs/healthcare" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Healthcare Initiatives
                </Link>
              </li>
              <li>
                <Link to="/programs/women-empowerment" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Women Empowerment
                </Link>
              </li>
              <li>
                <Link to="/programs/digital-literacy" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Digital Literacy
                </Link>
              </li>
              <li>
                <Link to="/programs/environmental" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  Environmental Conservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-primary-700 pb-2">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h5 className="text-sm font-medium mb-3 text-gray-200">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-primary-800 border border-primary-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-secondary-400 focus:ring-1 focus:ring-secondary-400 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 text-sm font-medium"
                >
                  <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary-400" />
                <a href="tel:+254700000000" className="text-gray-300 hover:text-secondary-400 transition-colors text-sm">
                  +254 700 000 000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

              {/* Bottom Section */}
        <div className="border-t border-primary-700 bg-primary-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
                <Link to="/privacy-policy" className="hover:text-secondary-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-secondary-400 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/contact" className="hover:text-secondary-400 transition-colors">
                  Contact Us
                </Link>
              </div>
              <div className="text-sm text-gray-400 text-center md:text-center">
                © 2025 ShineBridge Empowerment Network (SBEN). All rights reserved.
              </div>
              <div className="text-xs text-gray-400">
                Built by{" "}
                <a 
                  href="https://portfolio.kazinikazi.co.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-secondary-300 transition-colors"
                >
                  KNK Digital
                </a>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
