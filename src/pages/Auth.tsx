import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';

const REQUIRED_DOMAIN = '@shinebridgeempowermentnetwork.org';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isValidDomain = email.endsWith(REQUIRED_DOMAIN);
  const showDomainError = email.length > 0 && !isValidDomain && email.includes('@');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidDomain) {
      toast({
        title: 'Access Restricted',
        description: `Only emails ending in ${REQUIRED_DOMAIN} are allowed.`,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });

        navigate('/admin');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account.',
        });

        setIsLogin(true);
      }
    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage.includes("Signups not allowed")) {
        errorMessage = "Signups are restricted to administrator emails only.";
      }

      toast({
        title: 'Authentication Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center p-4 pt-24 md:pt-32">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        {/* Header */}
        <div className={`p-8 text-center ${isLogin ? 'bg-gray-50' : 'bg-primary-50'}`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Admin Login' : 'Admin Access Request'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Enter your credentials to access the dashboard' : 'Create an administrator account'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className={showDomainError ? "text-destructive" : ""}>Email Address</Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${showDomainError ? "text-destructive" : "text-gray-400"}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@shinebridgeempowermentnetwork.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 ${showDomainError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  required
                />
              </div>
              {showDomainError && (
                <p className="text-xs text-destructive mt-1">Invalid email format</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full ${!isValidDomain && email.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading || (!isValidDomain && email.length > 0)}
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Request Access'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-3">
              {isLogin ? "New to the organization?" : "Already have credentials?"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? "Create Admin Account" : "Back to Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;