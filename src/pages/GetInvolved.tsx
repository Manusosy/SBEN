import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Heart, Users, Handshake, GraduationCap, Heart as HealthIcon, BrainCircuit, PiggyBank, TreeDeciduous, Facebook, Twitter, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
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

    // Handle special cases like "24/7"
    if (value.includes('/')) {
      return;
    }

    let startValue = 0;
    let endValue: number;
    
    // Handle different value formats
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

const GetInvolved = () => {
  const [activeTab, setActiveTab] = useState("volunteer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [volunteerForm, setVolunteerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    occupation: "",
    skills: "",
    interests: [],
    availability: "",
    experience: "",
    motivation: ""
  });

  const [donationForm, setDonationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: "",
    donationType: "one-time",
    message: "",
    agreeToTerms: false
  });

  const [partnershipForm, setPartnershipForm] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    areas: [],
    resources: "",
    goals: "",
    timeline: ""
  });

  const programAreas = [
    { id: "education", name: "Education Support", icon: GraduationCap, color: "text-accent-500", bgColor: "bg-accent-500/10", description: "Empowering youth through quality education" },
    { id: "healthcare", name: "Healthcare Initiatives", icon: HealthIcon, color: "text-success-500", bgColor: "bg-success-500/10", description: "Improving community health and wellness" },
    { id: "women-empowerment", name: "Women Empowerment", icon: Users, color: "text-secondary-500", bgColor: "bg-secondary-500/10", description: "Supporting women's economic independence" },
    { id: "digital-literacy", name: "Digital Literacy", icon: BrainCircuit, color: "text-primary-500", bgColor: "bg-primary-500/10", description: "Preparing youth for the digital age" },
    { id: "financial-inclusion", name: "Financial Inclusion", icon: PiggyBank, color: "text-empowerment-500", bgColor: "bg-empowerment-500/10", description: "Building financial stability" },
    { id: "environmental", name: "Environmental Conservation", icon: TreeDeciduous, color: "text-warning-500", bgColor: "bg-warning-500/10", description: "Protecting our environment" }
  ];

  const donationTypes = [
    { type: "one-time", title: "One-time Donation" },
    { type: "monthly", title: "Monthly Donation" }
  ];

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your interest in volunteering! We'll contact you soon.");
      setVolunteerForm({
        firstName: "", lastName: "", email: "", phone: "", age: "", occupation: "",
        skills: "", interests: [], availability: "", experience: "", motivation: ""
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your donation! We'll send you a confirmation email.");
      setDonationForm({
        firstName: "", lastName: "", email: "", phone: "", amount: "",
        donationType: "one-time", message: "", agreeToTerms: false
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handlePartnershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your partnership interest! We'll review and contact you soon.");
      setPartnershipForm({
        organizationName: "", contactPerson: "", email: "", phone: "", website: "",
        partnershipType: "", areas: [], resources: "", goals: "", timeline: ""
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <PageLayout>
      <SEO 
        title="Get Involved - SBEN | Join Our Community Empowerment Mission" 
        description="Get involved with SBEN through volunteering, donations, or partnerships. Make a difference in Kibera through education, healthcare, and community development."
        imageUrl="/og-image.png"
        keywords={['volunteer', 'donate', 'partnership', 'get involved', 'SBEN', 'Kibera', 'community development']}
      />
      
      {/* Uniform Hero Section */}
      <PageHero
        title="Get Involved"
        description="Join us in empowering communities and transforming lives in Kibera. Whether you want to volunteer your time, support our mission financially, or partner with us, there are many ways to make a difference."
        imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
      />

      {/* Impact Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Column - Mission Statement */}
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary-600 leading-tight">
                    Making a Meaningful Difference Together
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    At SBEN, we believe that true impact is achieved when individuals, communities, and organizations come together with a shared purpose – to create positive change in the world.
                  </p>
                  <Button className="bg-secondary-500 hover:bg-secondary-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Start Your Journey
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </div>

                {/* Right Column - Impact Statistics */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "70%", label: "Education Support" },
                    { value: "24/7", label: "Healthcare Access" },
                    { value: "108", label: "Nutrition Programs" },
                    { value: "+105", label: "Happy Children" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-3">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-sm font-semibold text-white">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Areas Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-600 mb-6">Our Program Areas</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose from our six core program areas where you can contribute your skills, resources, or time to create lasting impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programAreas.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-secondary-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center"
              >
                <div className={`w-16 h-16 ${program.bgColor} ${program.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <program.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors">{program.name}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Options */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-600 mb-6">How You Can Get Involved</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose the way that best fits your interests, skills, and availability to make a difference
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-white p-2 rounded-2xl shadow-lg border border-gray-200">
                <TabsTrigger 
                  value="volunteer" 
                  className="flex items-center justify-center space-x-3 data-[state=active]:bg-secondary-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl py-4 px-6 transition-all duration-300 font-semibold text-base"
                >
                  <Users className="w-5 h-5" />
                  <span>Volunteer</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="donate" 
                  className="flex items-center justify-center space-x-3 data-[state=active]:bg-secondary-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl py-4 px-6 transition-all duration-300 font-semibold text-base"
                >
                  <Heart className="w-5 h-5" />
                  <span>Donate</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="partnership" 
                  className="flex items-center justify-center space-x-3 data-[state=active]:bg-secondary-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl py-4 px-6 transition-all duration-300 font-semibold text-base"
                >
                  <Handshake className="w-5 h-5" />
                  <span>Partnership</span>
                </TabsTrigger>
              </TabsList>

              {/* Volunteer Tab */}
              <TabsContent value="volunteer" className="mt-0">
                <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-10">
                    <CardTitle className="text-3xl font-bold">Become a Volunteer</CardTitle>
                    <CardDescription className="text-primary-100 text-lg mt-2">
                      Share your skills, time, and passion to help empower our community. We welcome volunteers from all backgrounds and experience levels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-10">
                    <form onSubmit={handleVolunteerSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">First Name *</Label>
                          <Input
                            id="firstName"
                            value={volunteerForm.firstName}
                            onChange={(e) => setVolunteerForm({...volunteerForm, firstName: e.target.value})}
                            required
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={volunteerForm.lastName}
                            onChange={(e) => setVolunteerForm({...volunteerForm, lastName: e.target.value})}
                            required
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={volunteerForm.email}
                            onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                            required
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</Label>
                          <Input
                            id="phone"
                            value={volunteerForm.phone}
                            onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="age" className="text-sm font-medium text-gray-700 mb-2 block">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={volunteerForm.age}
                            onChange={(e) => setVolunteerForm({...volunteerForm, age: e.target.value})}
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="occupation" className="text-sm font-medium text-gray-700 mb-2 block">Occupation</Label>
                          <Input
                            id="occupation"
                            value={volunteerForm.occupation}
                            onChange={(e) => setVolunteerForm({...volunteerForm, occupation: e.target.value})}
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="skills" className="text-sm font-medium text-gray-700 mb-2 block">Skills & Expertise</Label>
                        <Textarea
                          id="skills"
                          placeholder="Tell us about your skills, qualifications, and areas of expertise..."
                          value={volunteerForm.skills}
                          onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                          rows={3}
                          className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-4 block">Areas of Interest</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {programAreas.map((program) => (
                            <div key={program.id} className="flex items-center space-x-3">
                              <Checkbox
                                id={`volunteer-${program.id}`}
                                checked={volunteerForm.interests.includes(program.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setVolunteerForm({
                                      ...volunteerForm,
                                      interests: [...volunteerForm.interests, program.id]
                                    });
                                  } else {
                                    setVolunteerForm({
                                      ...volunteerForm,
                                      interests: volunteerForm.interests.filter(id => id !== program.id)
                                    });
                                  }
                                }}
                                className="text-secondary-500"
                              />
                              <Label htmlFor={`volunteer-${program.id}`} className="text-sm text-gray-700 cursor-pointer">{program.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="availability" className="text-sm font-medium text-gray-700 mb-2 block">Availability</Label>
                          <Select value={volunteerForm.availability} onValueChange={(value) => setVolunteerForm({...volunteerForm, availability: value})}>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl">
                              <SelectValue placeholder="Select your availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekdays">Weekdays</SelectItem>
                              <SelectItem value="weekends">Weekends</SelectItem>
                              <SelectItem value="evenings">Evenings</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="experience" className="text-sm font-medium text-gray-700 mb-2 block">Previous Volunteer Experience</Label>
                          <Select value={volunteerForm.experience} onValueChange={(value) => setVolunteerForm({...volunteerForm, experience: value})}>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No experience</SelectItem>
                              <SelectItem value="some">Some experience</SelectItem>
                              <SelectItem value="experienced">Experienced</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="motivation" className="text-sm font-medium text-gray-700 mb-2 block">Why do you want to volunteer with SBEN?</Label>
                        <Textarea
                          id="motivation"
                          placeholder="Share your motivation and what you hope to contribute..."
                          value={volunteerForm.motivation}
                          onChange={(e) => setVolunteerForm({...volunteerForm, motivation: e.target.value})}
                          rows={4}
                          required
                          className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Volunteer Application"}
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Donate Tab - Using exact form from donation page */}
              <TabsContent value="donate" className="mt-0">
                <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-empowerment-600 to-empowerment-700 text-white p-10">
                    <CardTitle className="text-3xl font-bold">Make a Donation</CardTitle>
                    <CardDescription className="text-empowerment-100 text-lg mt-2">
                      Your financial support helps us continue our vital work in education, healthcare, and community development. Every contribution makes a difference.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-10">
                    <form onSubmit={handleDonationSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="donorFirstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                          <Input
                            id="donorFirstName"
                            value={donationForm.firstName}
                            onChange={(e) => setDonationForm({...donationForm, firstName: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="donorLastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                          <Input
                            id="donorLastName"
                            value={donationForm.lastName}
                            onChange={(e) => setDonationForm({...donationForm, lastName: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="donorEmail" className="text-sm font-medium text-gray-700">Email *</Label>
                          <Input
                            id="donorEmail"
                            type="email"
                            value={donationForm.email}
                            onChange={(e) => setDonationForm({...donationForm, email: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="donorPhone" className="text-sm font-medium text-gray-700">Phone</Label>
                          <Input
                            id="donorPhone"
                            value={donationForm.phone}
                            onChange={(e) => setDonationForm({...donationForm, phone: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Type of Donation *</Label>
                        <RadioGroup value={donationForm.donationType} onValueChange={(value) => setDonationForm({...donationForm, donationType: value})} className="grid grid-cols-2 gap-3">
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
                          value={donationForm.amount}
                          onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="donorMessage" className="text-sm font-medium text-gray-700">Message (Optional)</Label>
                        <Textarea
                          id="donorMessage"
                          placeholder="Share why you're supporting SBEN or any special message..."
                          value={donationForm.message}
                          onChange={(e) => setDonationForm({...donationForm, message: e.target.value})}
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={donationForm.agreeToTerms}
                          onCheckedChange={(checked) => setDonationForm({...donationForm, agreeToTerms: checked as boolean})}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                          I agree with <a href="/terms-of-service" className="text-primary-600 hover:text-primary-700 underline">Terms of Use</a> and{" "}
                          <a href="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</a>
                        </Label>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-empowerment-500 hover:bg-empowerment-600 text-white py-3 text-lg font-semibold"
                      >
                        {isSubmitting ? "Processing..." : "Donate Now"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Partnership Tab */}
              <TabsContent value="partnership" className="mt-0">
                <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-accent-600 to-accent-700 text-white p-10">
                    <CardTitle className="text-3xl font-bold">Partnership Opportunities</CardTitle>
                    <CardDescription className="text-accent-100 text-lg mt-2">
                      Partner with us to create greater impact. We welcome collaborations with organizations, businesses, and institutions that share our vision for community empowerment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-10">
                    <form onSubmit={handlePartnershipSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="orgName" className="text-sm font-medium text-gray-700 mb-2 block">Organization Name *</Label>
                          <Input
                            id="orgName"
                            value={partnershipForm.organizationName}
                            onChange={(e) => setPartnershipForm({...partnershipForm, organizationName: e.target.value})}
                            required
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPerson" className="text-sm font-medium text-gray-700 mb-2 block">Contact Person *</Label>
                          <Input
                            id="contactPerson"
                            value={partnershipForm.contactPerson}
                            onChange={(e) => setPartnershipForm({...partnershipForm, contactPerson: e.target.value})}
                            required
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="partnerEmail" className="text-sm font-medium text-gray-700 mb-2 block">Email *</Label>
                          <Input
                            id="partnerEmail"
                            type="email"
                            value={partnershipForm.email}
                            onChange={(e) => setPartnershipForm({...partnershipForm, email: e.target.value})}
                            required
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="partnerPhone" className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</Label>
                          <Input
                            id="partnerPhone"
                            value={partnershipForm.phone}
                            onChange={(e) => setPartnershipForm({...partnershipForm, phone: e.target.value})}
                            className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="website" className="text-sm font-medium text-gray-700 mb-2 block">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourorganization.org"
                          value={partnershipForm.website}
                          onChange={(e) => setPartnershipForm({...partnershipForm, website: e.target.value})}
                          className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor="partnershipType" className="text-sm font-medium text-gray-700 mb-2 block">Partnership Type</Label>
                        <Select value={partnershipForm.partnershipType} onValueChange={(value) => setPartnershipForm({...partnershipForm, partnershipType: value})}>
                          <SelectTrigger className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl">
                            <SelectValue placeholder="Select partnership type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="program-support">Program Support</SelectItem>
                            <SelectItem value="resource-sharing">Resource Sharing</SelectItem>
                            <SelectItem value="joint-initiatives">Joint Initiatives</SelectItem>
                            <SelectItem value="capacity-building">Capacity Building</SelectItem>
                            <SelectItem value="advocacy">Advocacy & Awareness</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-4 block">Areas of Interest</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {programAreas.map((program) => (
                            <div key={program.id} className="flex items-center space-x-3">
                              <Checkbox
                                id={`partner-${program.id}`}
                                checked={partnershipForm.areas.includes(program.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setPartnershipForm({
                                      ...partnershipForm,
                                      areas: [...partnershipForm.areas, program.id]
                                    });
                                  } else {
                                    setPartnershipForm({
                                      ...partnershipForm,
                                      areas: partnershipForm.areas.filter(id => id !== program.id)
                                    });
                                  }
                                }}
                                className="text-secondary-500"
                              />
                              <Label htmlFor={`partner-${program.id}`} className="text-sm text-gray-700 cursor-pointer">{program.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="resources" className="text-sm font-medium text-gray-700 mb-2 block">Resources You Can Contribute</Label>
                        <Textarea
                          id="resources"
                          placeholder="Describe the resources, expertise, or support your organization can provide..."
                          value={partnershipForm.resources}
                          onChange={(e) => setPartnershipForm({...partnershipForm, resources: e.target.value})}
                          rows={3}
                          className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="goals" className="text-sm font-medium text-gray-700 mb-2 block">Partnership Goals</Label>
                          <Textarea
                            id="goals"
                            placeholder="What do you hope to achieve through this partnership?"
                            value={partnershipForm.goals}
                            onChange={(e) => setPartnershipForm({...partnershipForm, goals: e.target.value})}
                            rows={3}
                            className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="timeline" className="text-sm font-medium text-gray-700 mb-2 block">Timeline</Label>
                          <Select value={partnershipForm.timeline} onValueChange={(value) => setPartnershipForm({...partnershipForm, timeline: value})}>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate</SelectItem>
                              <SelectItem value="3-months">3 months</SelectItem>
                              <SelectItem value="6-months">6 months</SelectItem>
                              <SelectItem value="1-year">1 year</SelectItem>
                              <SelectItem value="long-term">Long-term</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent-500 hover:bg-accent-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Partnership Proposal"}
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Your Involvement Makes a Difference</h2>
          <p className="text-xl text-primary-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Every volunteer hour, donation, and partnership helps us create lasting positive change in the Kibera community. 
            Join our network of changemakers today.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary-400 mb-4">500+</div>
              <p className="text-primary-100 text-lg">Community members empowered</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary-400 mb-4">50+</div>
              <p className="text-primary-100 text-lg">Active volunteers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary-400 mb-4">25+</div>
              <p className="text-primary-100 text-lg">Partner organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Contact Info */}
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-primary-600">Get in Touch</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Have questions about getting involved? We'd love to hear from you and help you find the perfect way to contribute to our mission.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">Kibera, Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@shinebridgeempowermentnetwork.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+254 795 549619</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Social Media */}
              <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl p-10 text-white text-center">
                <h3 className="text-2xl font-bold mb-6">Follow Our Journey</h3>
                <p className="text-secondary-100 mb-8 text-lg">
                  Stay connected with us on social media to see the impact of your involvement and get updates on our programs.
                </p>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a href="#" className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                    <Twitter className="w-8 h-8" />
                  </a>
                  <a href="#" className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                    <Linkedin className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GetInvolved;
