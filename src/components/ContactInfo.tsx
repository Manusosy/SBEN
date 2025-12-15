
import React from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <section id="contact-info" className="bg-gradient-to-b from-white to-primary text-white relative py-[15px] md:py-[25px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-3 px-3 py-1 bg-white text-primary rounded-full text-sm font-medium">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Contact Us Today
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Ready to join Kenya's circular economy revolution? Contact our team to learn how we can work together on sustainable recycling solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Linus Owino's Contact Info */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-700">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/7dced1c1-f838-45ef-9192-f4c6d9002e25.png"
                alt="Linus Owino"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">Linus Owino</h3>
              <p className="text-gray-600 mb-4">Co-founder</p>
              <div className="flex flex-col space-y-3">
                <a href="mailto:info@shinebridgeempowermentnetwork.org" className="flex items-center text-gray-700 hover:text-primary">
                  <Mail className="w-5 h-5 mr-2" />
                  info@shinebridgeempowermentnetwork.org
                </a>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-primary"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          {/* Nicholas Okeyo's Contact Info */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-700">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/b46fb5fb-9e17-44ab-b920-b4cfe1c6fb6a.png"
                alt="Nicholas Okeyo"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">Nicholas Okeyo</h3>
              <p className="text-gray-600 mb-4">Co-founder</p>
              <div className="flex flex-col space-y-3">
                <a href="mailto:info@shinebridgeempowermentnetwork.org" className="flex items-center text-gray-700 hover:text-primary">
                  <Mail className="w-5 h-5 mr-2" />
                  info@shinebridgeempowermentnetwork.org
                </a>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-primary"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
          
          {/* Cynthia Nantale's Contact Info */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-700">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/cynthia-nantale-coo.png"
                alt="Cynthia Nantale"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">Cynthia Nantale</h3>
              <p className="text-gray-600 mb-4">Chief Operating Officer</p>
              <div className="flex flex-col space-y-3">
                <a href="mailto:info@shinebridgeempowermentnetwork.org" className="flex items-center text-gray-700 hover:text-primary">
                  <Mail className="w-5 h-5 mr-2" />
                  info@shinebridgeempowermentnetwork.org
                </a>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-primary"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-700 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">General Support</h3>
            <div className="flex flex-col space-y-3">
              <a href="mailto:info@shinebridgeempowermentnetwork.org" className="flex items-center justify-center text-gray-700 hover:text-primary">
                <Mail className="w-5 h-5 mr-2" />
                info@shinebridgeempowermentnetwork.org
              </a>
              <p className="text-gray-600 text-sm">
                P.O. Box 940-80108<br />
                Kilifi, Kenya 80108
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
