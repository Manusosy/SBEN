import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Privacy Policy - SBEN | ShineBridge Empowerment Network" 
        description="Learn how SBEN protects your privacy and handles personal information. Our comprehensive privacy policy ensures transparency and data protection."
        imageUrl="/og-image.png"
        keywords={['privacy policy', 'data protection', 'SBEN', 'personal information', 'Kibera', 'community organization']}
      />
      
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold mb-4 text-primary-600">Privacy Policy</h1>
              <p className="text-lg text-gray-600 mb-8 italic">Effective Date: January 2025</p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                ShineBridge Empowerment Network (SBEN) ("we," "our," or "us") values your trust and is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you interact with us—whether through our website, in-person activities, donations, volunteering, events, or community programs.
              </p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                By using our services, participating in our programs, or visiting our website <a href="https://shinebridgeempowermentnetwork.org" className="text-primary-600 hover:text-primary-700 underline">shinebridgeempowermentnetwork.org</a>, you agree to the terms outlined in this Privacy Policy.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">1. Who We Are</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ShineBridge Empowerment Network (SBEN) is a <strong>community-based nonprofit organization</strong> founded in Kibera, Nairobi, Kenya. Our mission is to empower vulnerable community members through <strong>education support, women's economic empowerment, youth development, healthcare initiatives, and environmental conservation</strong>.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may collect the following categories of information:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">a) Personal Information Provided by You</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Name, email address, phone number, and postal address.</li>
                <li>Date of birth (for volunteers or membership eligibility).</li>
                <li>Employment/skills information (when applying as a volunteer, partner, or staff).</li>
                <li>Payment information (if making donations).</li>
                <li>Feedback, questions, or messages you send via forms or email.</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">b) Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When you use our website, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>IP address and device information.</li>
                <li>Browser type and operating system.</li>
                <li>Pages visited and time spent on our website.</li>
                <li>Cookies and similar technologies (see Section 8).</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">c) Sensitive Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>For certain programs (e.g., healthcare outreach), we may collect limited sensitive data <strong>with explicit consent</strong> (e.g., health status, gender).</li>
                <li>Sensitive data is <strong>only collected if necessary</strong> and always handled confidentially.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                SBEN uses collected data to:
              </p>
              <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li>Provide and improve our services and programs.</li>
                <li>Communicate with you regarding programs, events, and opportunities.</li>
                <li>Process and acknowledge donations, including providing receipts.</li>
                <li>Manage volunteer and partner applications.</li>
                <li>Ensure legal compliance with financial and data protection laws.</li>
                <li>Monitor website usage and improve content delivery.</li>
                <li>Maintain organizational records for accountability and transparency.</li>
              </ol>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">4. Sharing of Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We do <strong>not sell, rent, or trade</strong> your personal data. We may share information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> With trusted partners (e.g., payment processors, email providers) who help us deliver services.</li>
                <li><strong>Legal Requirements:</strong> If required by law, regulation, or court order.</li>
                <li><strong>Donor Recognition:</strong> With your consent, your name may be displayed publicly (e.g., donor wall).</li>
                <li><strong>Programs & Partnerships:</strong> With collaborating organizations, only if necessary and with safeguards in place.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">5. Data Retention</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>We retain personal data <strong>only as long as necessary</strong> to fulfill program, legal, and financial requirements.</li>
                <li>Contact forms and inquiries may be kept up to <strong>24 months</strong> for follow-up.</li>
                <li>Donation records are retained for <strong>7 years</strong> (for financial and auditing purposes).</li>
                <li>Volunteer/partner records are retained as long as engagement is active.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">6. Your Rights</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
                <li><strong>Correction:</strong> Request updates or corrections to your information.</li>
                <li><strong>Deletion:</strong> Request that your personal data be erased (where legally possible).</li>
                <li><strong>Restriction:</strong> Limit how your data is processed.</li>
                <li><strong>Consent Withdrawal:</strong> Withdraw consent for communications or data usage.</li>
                <li><strong>Complaints:</strong> File a complaint with Kenya's Office of the Data Protection Commissioner (ODPC) or your local authority.</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To exercise these rights, contact us at <a href="mailto:info@shinebridgeempowermentnetwork.org" className="text-primary-600 hover:text-primary-700 underline">info@shinebridgeempowermentnetwork.org</a>.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">7. Donations and Payment Security</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>All donations made through our website are processed securely via <strong>trusted payment providers</strong> (Stripe, PayPal, M-Pesa).</li>
                <li>We do not store full credit/debit card details on our servers.</li>
                <li>Transaction data is encrypted and only accessible to authorized financial officers.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our website uses cookies to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Improve website performance and user experience.</li>
                <li>Analyze traffic and usage trends (via analytics tools).</li>
                <li>Remember preferences and login sessions.</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                You may disable cookies through your browser settings, but some features may not function properly.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">9. Data Security</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>SSL encryption on our website.</li>
                <li>Secure data storage via cloud services (with restricted access).</li>
                <li>Role-based access control for staff and volunteers.</li>
                <li>Regular system audits to ensure compliance.</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                However, no system is 100% secure, and we cannot guarantee absolute protection against cyber threats.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">10. Children's Privacy</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>We do not knowingly collect personal information from children under 13 without parental/guardian consent.</li>
                <li>If we learn a child has provided personal data without consent, we will delete it promptly.</li>
              </ul>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">11. International Data Transfers</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you are accessing our website outside Kenya, your information may be transferred to and processed in Kenya or other jurisdictions where our service providers operate. We ensure such transfers comply with applicable data protection laws.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">12. Third-Party Links</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our website may link to third-party sites (e.g., partner NGOs, donors). We are not responsible for their privacy practices and encourage you to review their policies.
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">13. Updates to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                SBEN may update this Privacy Policy periodically to reflect legal, operational, or organizational changes. Updates will be posted on this page with a revised "Effective Date."
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">14. Contact Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                For questions or concerns about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;