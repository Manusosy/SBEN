import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Heart, Zap, Users, Building, Facebook, Twitter, Linkedin } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { toast } from "sonner";

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!isVisible) return;
    
    // Handle different value formats
    if (value.includes('/')) {
      return; // For "24/7" type values, just show the value
    }

    let startValue = 0;
    let endValue: number;
    
    if (value.includes('%')) {
      endValue = parseInt(value.replace('%', ''));
    } else if (value.includes('+')) {
      endValue = parseInt(value.replace('+', ''));
    } else {
      endValue = parseInt(value);
    }

    if (isNaN(endValue)) {
      return;
    }

    const duration = 2000; // 2 seconds
    const increment = endValue / (duration / 16); // 60fps

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(startValue));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  // Handle special cases like "24/7"
  if (value.includes('/')) {
    return <span>{value}</span>;
  }

  return (
    <span id={`counter-${value}`}>
      {value.includes('%') ? `${count}%` : value.includes('+') ? `+${count}` : count}
    </span>
  );
};

const DonationPage = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the Terms of Use and Privacy Policy");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your donation! We'll send you a confirmation email.");
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", message: "", agreeToTerms: false
      });
      setAmount("");
      setIsSubmitting(false);
    }, 2000);
  };

  const impactStats = [
    { value: "70%", label: "Education Support", description: "Children receiving educational assistance" },
    { value: "24/7", label: "Healthcare Access", description: "Round-the-clock healthcare services" },
    { value: "108", label: "Nutrition Programs", description: "Children fed daily" },
    { value: "+105", label: "Happy Children", description: "Lives transformed through our programs" }
  ];

  const donationTypes = [
    {
      type: "one-time",
      title: "One-Time Donation",
      features: [
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Amount", 
          description: "Any amount welcome, recommended minimum KES 1,000" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Processing", 
          description: "Secure payment processing via trusted providers" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Receipt", 
          description: "Tax-deductible receipt sent via email" 
        }
      ]
    },
    {
      type: "monthly",
      title: "Monthly Giving",
      features: [
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Amount", 
          description: "From KES 1,000/month, easily adjustable" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Automatic Withdrawal", 
          description: "Monthly automatic withdrawal, cancellable anytime" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Benefits", 
          description: "Exclusive updates, features, and donor recognition" 
        }
      ]
    },
    {
      type: "corporate",
      title: "Corporate Donations",
      features: [
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Size", 
          description: "All company sizes welcome, from startups to enterprises" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Honor", 
          description: "Donate in honor of employees, causes, or milestones" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Appreciation", 
          description: "Letter of appreciation and recognition for your support" 
        }
      ]
    },
    {
      type: "legacy",
      title: "Legacy Giving",
      features: [
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Will or Trust", 
          description: "Include SBEN in your will or trust documents" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Specific Amount", 
          description: "Designate specific amounts of money or property" 
        },
        { 
          icon: <Zap className="w-4 h-4 text-secondary-500" />, 
          title: "Life Insurance", 
          description: "Name SBEN as a beneficiary in your life insurance" 
        }
      ]
    }
  ];

  return (
    <PageLayout>
      {/* Keep existing hero section for website uniformity */}
      <PageHero
        title="Support Our Mission"
        description="Your donation helps us continue our work in empowering communities through education, mentorship, and sustainable development initiatives."
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.13.44 PM.jpeg"
      />

      {/* Impact Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Mission Statement */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Making a Meaningful Difference Together
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    At SBEN, we believe that true impact is achieved when individuals, communities, and organizations come together with a shared purpose – to create positive change in the world.
                  </p>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                    Donate Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

                {/* Right Column - Impact Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="bg-secondary-500 rounded-xl p-4 text-center">
                      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Donation Types</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ForHelp hosts a variety of fundraising events throughout the year. These events are a great way to raise money for ForHelp and to have fun with other people who care about helping children in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTypes.map((type) => (
              <Card key={type.type} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="bg-secondary-500 rounded-t-xl p-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 text-center">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {type.features.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        {feature.icon}
                        <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-600 mb-4">Show Some Love and Care</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your generosity makes a real difference in the lives of children and families in Kibera
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Image and Social */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                  <div className="w-full h-64 bg-gray-50 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
                    {/* Your Impactful Image */}
                    <img 
                      src="/donation-hero.jpg" 
                      alt="Impactful community image"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Follow us on social</h3>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="w-10 h-10 bg-secondary-500 hover:bg-secondary-600 rounded-full flex items-center justify-center text-white transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-secondary-500 hover:bg-secondary-600 rounded-full flex items-center justify-center text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-secondary-500 hover:bg-secondary-600 rounded-full flex items-center justify-center text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Donation Form */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <form onSubmit={handleDonationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Type of Donation *</Label>
                    <RadioGroup value={donationType} onValueChange={setDonationType} className="grid grid-cols-2 gap-3">
                      {donationTypes.map((type) => (
                        <div key={type.type} className="flex items-center space-x-2">
                          <RadioGroupItem value={type.type} id={type.type} />
                          <Label htmlFor={type.type} className="text-sm text-gray-700">{type.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount (KES) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Share why you're supporting SBEN or any special message..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      I agree with <a href="/terms-of-service" className="text-primary-600 hover:text-primary-700 underline">Terms of Use</a> and{" "}
                      <a href="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</a>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? "Processing..." : "Donate Now"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action Banner */}
      <section className="py-16 bg-secondary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Donate Now and Help Level Up the Lives of Children in Need
            </h2>
            <p className="text-lg text-secondary-100 mb-8">
              Your contribution today creates lasting positive change in the Kibera community. 
              Every donation, no matter the size, makes a real difference.
            </p>
            <Button 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Donate Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DonationPage;
