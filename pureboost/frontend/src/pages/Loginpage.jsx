import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import Input from '../components/ui/input';
import Label from '../components/ui/label';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp ? 'Sign up' : 'Sign in', formData);
    navigate('/');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md bg-black border border-white rounded-xl shadow-lg p-10 space-y-8">
          
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">FitFlow</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-white/70 mt-2 text-sm">
              {isSignUp 
                ? 'Join thousands of athletes achieving their goals' 
                : 'Sign in to your account to continue'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="John"
                    className="bg-black text-white border border-white placeholder-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Doe"
                    className="bg-black text-white border border-white placeholder-white/50"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-white/70" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="pl-10 bg-black text-white border border-white placeholder-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-white/70" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-black text-white border border-white placeholder-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/70" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className="pl-10 bg-black text-white border border-white placeholder-white/50"
                  />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm text-white/70">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-white" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 border-none" size="lg">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center text-white/70 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-2 text-white hover:text-white/80 font-medium transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Back to Shop */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              ← Back to Shop
            </button>
          </div>

        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-white/70">
            <h3 className="text-4xl font-bold mb-4 text-white">Fuel Your Journey</h3>
            <p className="text-lg opacity-80 mb-8">Join the community of athletes who trust FitFlow.</p>
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-black" />
                </div>
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-black" />
                </div>
                <span>Exclusive member deals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-black" />
                </div>
                <span>Early access to new products</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
