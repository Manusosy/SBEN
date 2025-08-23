
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, BookOpen, Users, Lightbulb, HandHeart, Calendar, Trophy, FileText, Mail, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white shadow-sm" : "bg-primary-500"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/shinebridgeempowermentlogo.png" 
                alt="SBEN Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-grow justify-center">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <BookOpen className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Our Story</div>
                                <p className="text-sm text-gray-500">Learn about our mission and vision</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about/team" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <Users className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Our Team</div>
                                <p className="text-sm text-gray-500">Meet the people behind SBEN</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/programs/mentorship" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <Users className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Mentorship Program</div>
                                <p className="text-sm text-gray-500">Guidance and support for youth</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/programs/education" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <Lightbulb className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Education Initiatives</div>
                                <p className="text-sm text-gray-500">Supporting students and learning</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/programs/community" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <HandHeart className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Community Development</div>
                                <p className="text-sm text-gray-500">Building stronger communities</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/blog" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Blog</div>
                                <p className="text-sm text-gray-500">Latest news and insights</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/events" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <Calendar className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Events</div>
                                <p className="text-sm text-gray-500">Community events and activities</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/gallery" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <ImageIcon className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Gallery</div>
                                <p className="text-sm text-gray-500">Photos from our programs</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/success-stories" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <Trophy className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Success Stories</div>
                                <p className="text-sm text-gray-500">Impact and achievements</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    <Link to="/contact">Contact Us</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Desktop Donate Button and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Donate Button - Hidden on mobile */}
            <div className="hidden md:block">
              <Link to="/donate" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-empowerment-500 text-white h-10 px-4 py-2 hover:bg-empowerment-600 transition-colors">
                Donate
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                className={cn(
                  "p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
                  isScrolled 
                    ? "text-gray-700 hover:bg-gray-100 focus:ring-gray-500" 
                    : "text-white hover:bg-white/10 focus:ring-white"
                )}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Home */}
            <Link 
              to="/" 
              className="block py-3 px-4 text-lg font-medium text-gray-900 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
              onClick={toggleMenu}
            >
              Home
            </Link>
            
            {/* About Us Section */}
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">About Us</div>
              <Link 
                to="/about" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Our Story
              </Link>
              <Link 
                to="/about/team" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <Users className="w-5 h-5 mr-3" />
                Our Team
              </Link>
            </div>

            {/* Programs Section */}
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Programs</div>
              <Link 
                to="/programs/mentorship" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <Users className="w-5 h-5 mr-3" />
                Mentorship Program
              </Link>
              <Link 
                to="/programs/education" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <Lightbulb className="w-5 h-5 mr-3" />
                Education Initiatives
              </Link>
              <Link 
                to="/programs/community" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <HandHeart className="w-5 h-5 mr-3" />
                Community Development
              </Link>
            </div>

            {/* Resources Section */}
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Resources</div>
              <Link 
                to="/blog" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <FileText className="w-5 h-5 mr-3" />
                Blog
              </Link>
              <Link 
                to="/resources/events" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Events
              </Link>
              <Link 
                to="/gallery" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <ImageIcon className="w-5 h-5 mr-3" />
                Gallery
              </Link>
              <Link 
                to="/resources/success-stories" 
                className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={toggleMenu}
              >
                <Trophy className="w-5 h-5 mr-3" />
                Success Stories
              </Link>
            </div>

            {/* Contact */}
            <Link 
              to="/contact" 
              className="flex items-center py-3 px-4 text-gray-700 hover:text-empowerment-500 hover:bg-gray-50 rounded-lg transition-colors" 
              onClick={toggleMenu}
            >
              <Mail className="w-5 h-5 mr-3" />
              Contact Us
            </Link>

            {/* Mobile Donate Button */}
            <div className="pt-4">
              <Link 
                to="/donate" 
                className="block w-full text-center bg-empowerment-500 text-white py-3 px-4 rounded-lg hover:bg-empowerment-600 transition-colors font-medium" 
                onClick={toggleMenu}
              >
                Donate Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
