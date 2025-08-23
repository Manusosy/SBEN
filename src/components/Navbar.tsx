
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
        <div className="flex items-center h-16">
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
                                <p className="text-sm text-gray-500">Supporting academic excellence</p>
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
                          <Link to="/resources/events" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <Calendar className="w-5 h-5 mr-2" />
                              <div>
                                <div className="font-medium">Events</div>
                                <p className="text-sm text-gray-500">Upcoming workshops and meetings</p>
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
                                <p className="text-sm text-gray-500">Visual stories of our impact</p>
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
                                <p className="text-sm text-gray-500">Impact stories from our community</p>
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
                    <Link to="/blog">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    <Link to="/contact">Contact Us</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Donate Button - Right */}
          <div className="hidden md:block">
            <Link to="/donate" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-white h-10 px-4 py-2 hover:bg-primary/90">
              Donate
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white">
            <div className="space-y-2 px-4">
              <Link to="/" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Home</Link>
              
              {/* About Us Section */}
              <div className="space-y-1">
                <div className="font-medium text-gray-900 py-2">About Us</div>
                <Link to="/about" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  About Us
                </Link>
                <Link to="/about/team" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <Users className="w-4 h-4 mr-2" />
                  Our Team
                </Link>
              </div>

              {/* Programs Section */}
              <div className="space-y-1">
                <div className="font-medium text-gray-900 py-2">Programs</div>
                <Link to="/programs/mentorship" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <Users className="w-4 h-4 mr-2" />
                  Mentorship Program
                </Link>
                <Link to="/programs/education" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Education Initiatives
                </Link>
                <Link to="/programs/community" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <HandHeart className="w-4 h-4 mr-2" />
                  Community Development
                </Link>
              </div>

              {/* Resources Section */}
              <div className="space-y-1">
                <div className="font-medium text-gray-900 py-2">Resources</div>
                <Link to="/blog" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <FileText className="w-4 h-4 mr-2" />
                  Blog
                </Link>
                <Link to="/resources/events" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Events
                </Link>
                <Link to="/gallery" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gallery
                </Link>
                <Link to="/resources/success-stories" className="flex items-center pl-4 py-2 text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  <Trophy className="w-4 h-4 mr-2" />
                  Success Stories
                </Link>
              </div>

              <Link to="/blog" className="flex items-center py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
                <FileText className="w-4 h-4 mr-2" />
                Blog
              </Link>

              <Link to="/contact" className="flex items-center py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Link>

              <Link to="/donate" className="block mt-4 text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-600" onClick={toggleMenu}>Donate</Link>
            </div>
          </div>
        )}
    </motion.nav>
  );
};

export default Navbar;
