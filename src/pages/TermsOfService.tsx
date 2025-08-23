import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const TermsOfService = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Terms of Service - SBEN | ShineBridge Empowerment Network" 
        description="Read SBEN's Terms of Service to understand the rules and guidelines for using our website, making donations, volunteering, and participating in our programs."
        imageUrl="/og-image.png"
        keywords={['terms of service', 'SBEN', 'website usage', 'donations', 'volunteering', 'partnerships', 'Kibera', 'community organization']}
      />
      
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold mb-4 text-primary-600">Terms of Service (TOS)</h1>
              <p className="text-lg text-gray-600 mb-8 italic">Effective Date: January 2025</p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                Welcome to the official website of <strong>ShineBridge Empowerment Network (SBEN)</strong>, available at{" "}
                <a href="https://shinebridgeempowermentnetwork.org" className="text-primary-600 hover:text-primary-700 underline">
                  shinebridgeempowermentnetwork.org
                </a>{" "}
                ("Website"). By accessing, browsing, donating, volunteering, or otherwise using our Website and services, you ("User," "You") agree to comply with and be bound by these Terms of Service.
              </p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                Please read them carefully. If you do not agree, you should not use our Website or services.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">1. About SBEN</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ShineBridge Empowerment Network (SBEN) is a <strong>nonprofit, community-based organization</strong> registered in Kibera, Nairobi, Kenya. Founded in 2023, SBEN is dedicated to{" "}
                <strong>education, women's empowerment, youth development, healthcare, and environmental conservation</strong>.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                SBEN is <strong>non-political, non-religious, and non-discriminatory</strong>, guided by values of{" "}
                <strong>integrity, empowerment, inclusivity, sustainability, and collaboration</strong>.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">2. Eligibility</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>You must be at least <strong>18 years old</strong> to make a donation, sign up as a volunteer, or enter into a partnership agreement.</li>
                <li>Users under 18 may only engage with SBEN programs with <strong>parental/guardian consent</strong>.</li>
                <li>By using the Website, you confirm that the information you provide is <strong>true, accurate, and complete</strong>.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">3. Use of Website</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You agree to use the Website only for lawful, non-commercial purposes consistent with SBEN's mission. Specifically, you agree:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Not to use the Website to harass, abuse, or harm others.</li>
                <li>Not to upload or distribute viruses, spam, or harmful content.</li>
                <li>Not to attempt unauthorized access to our systems, servers, or data.</li>
                <li>Not to use SBEN's content for commercial exploitation without permission.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">4. Donations</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>All donations made through our Website are <strong>voluntary and non-refundable</strong>, unless required by law.</li>
                <li>Donations may be designated for specific programs or for the <strong>general fund</strong>.</li>
                <li>SBEN uses <strong>third-party payment processors</strong> (e.g., Stripe, PayPal, M-Pesa). These providers have their own terms and privacy policies.</li>
                <li>Donation records are kept for <strong>financial accountability and legal compliance</strong>.</li>
                <li>SBEN is committed to transparency: reports on use of funds will be made available.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">5. Volunteers and Partners</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Volunteers and partners applying through the Website must provide accurate information.</li>
                <li>Applications are reviewed and may be accepted, declined, or placed on hold at SBEN's discretion.</li>
                <li>Volunteers must adhere to SBEN's <strong>Code of Conduct</strong>, aligning with values of inclusivity and non-discrimination.</li>
                <li>Partnerships are subject to written agreements between SBEN and the partnering entity.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">6. Intellectual Property</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>All content on this Website (logos, text, images, videos, designs, publications) is the property of SBEN or licensed to SBEN.</li>
                <li>Content may not be copied, distributed, or modified without prior written consent.</li>
                <li>You may share SBEN's publicly available content <strong>for educational or awareness purposes</strong> provided attribution is given.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">7. Privacy & Data Protection</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Your use of this Website is also governed by our <strong>Privacy Policy</strong> and <strong>Cookies Policy</strong>, which explain how we handle your personal information.</li>
                <li>SBEN complies with Kenya's Data Protection Act and the <strong>General Data Protection Regulation (GDPR)</strong> for international users.</li>
                <li>Users have rights to access, correct, or delete their personal data as outlined in the Privacy Policy.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">8. Cookies</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We use cookies and tracking technologies to improve user experience. For details, see our{" "}
                <a href="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">Cookies Policy</a>.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">9. Event Participation</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Users registering for events must provide accurate information.</li>
                <li>SBEN reserves the right to limit attendance, cancel events, or reschedule as necessary.</li>
                <li>Event materials and recordings may be used by SBEN for reporting and awareness purposes, with consent where applicable.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">10. Third-Party Links</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our Website may include links to external websites operated by third parties. SBEN is not responsible for the content, policies, or practices of those third parties.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">11. Limitation of Liability</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>SBEN provides this Website <strong>"as is"</strong>, without warranties of any kind.</li>
                <li>We are not responsible for:</li>
              </ul>
              <ul className="list-disc pl-12 mb-4 text-gray-700 space-y-2">
                <li>Errors, interruptions, or downtime.</li>
                <li>Loss of data, unauthorized access, or cyber-attacks beyond our reasonable control.</li>
                <li>Reliance on information published on this Website (always verify program details directly with SBEN).</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To the maximum extent permitted by law, SBEN is <strong>not liable for damages</strong> arising from your use of the Website, donations, or participation in programs.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">12. Indemnification</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                You agree to indemnify and hold harmless SBEN, its officers, employees, and volunteers from any claims, damages, or expenses arising from your misuse of the Website or breach of these Terms.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">13. Changes to Terms</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                SBEN may update these Terms from time to time to reflect operational, legal, or organizational changes. Updates will be posted on this page with a new "Effective Date." Continued use of the Website after changes constitutes acceptance.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">14. Governing Law</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>These Terms are governed by the laws of <strong>Kenya</strong>.</li>
                <li>International users are also subject to <strong>applicable local data protection laws</strong> (e.g., GDPR in the EU).</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">15. Dissolution Clause</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                In alignment with SBEN's constitution, if the organization is dissolved, all remaining assets will be transferred to another nonprofit with similar objectives, not to individuals.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">16. Contact Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                For questions or concerns regarding these Terms, contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-primary-600">ShineBridge Empowerment Network (SBEN)</h3>
                <div className="space-y-2 text-gray-700">
                  <p>📍 <strong>Location:</strong> Kibera, Nairobi, Kenya</p>
                  <p>📧 <strong>Email:</strong> <a href="mailto:info@shinebridgeempowermentnetwork.org" className="text-primary-600 hover:text-primary-700 underline">info@shinebridgeempowermentnetwork.org</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;