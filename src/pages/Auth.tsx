import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplet, Waves, ShieldCheck, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(100);
const nameSchema = z.string().trim().min(1, { message: "Name is required" }).max(100);

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
      nameSchema.parse(fullName);
      
      setIsLoading(true);
      const { error } = await signUp(signupEmail, signupPassword, fullName);
      
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please sign in instead.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      
      toast.success("Account created successfully! You can now sign in.");
      setIsSignUp(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
      
      setIsLoading(true);
      const { error } = await signIn(loginEmail, loginPassword);
      
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      
      toast.success("Welcome back!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-background">
      {/* Left Side - Animated Water Background */}
      <div className="hidden lg:flex lg:w-1/2 relative gradient-hero overflow-hidden">
        {/* Animated ripple effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-ripple" style={{ animationDelay: "0s" }} />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-white/10 rounded-full animate-ripple" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-white/10 rounded-full animate-ripple" style={{ animationDelay: "2s" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-md space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-glow">
                <Droplet className="w-12 h-12 animate-wave" />
              </div>
              <span className="text-5xl font-bold">AquaRights</span>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Waves className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Tokenize Water Rights</h3>
                  <p className="text-white/80 text-sm">Convert your water rights into blockchain-verified NFTs</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Secure Trading</h3>
                  <p className="text-white/80 text-sm">Trade water rights safely on Hedera blockchain</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-slide-in-left" style={{ animationDelay: "0.6s" }}>
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Track Value</h3>
                  <p className="text-white/80 text-sm">Monitor your water rights portfolio in real-time</p>
                </div>
              </div>
            </div>

            {/* Decorative water drops */}
            <div className="flex gap-2 pt-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white/40 rounded-full animate-wave"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="gradient-ocean p-3 rounded-xl">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-foreground">AquaRights</span>
            </div>
            <p className="text-muted-foreground">Water Rights Tokenization</p>
          </div>

          {/* Auth Toggle */}
          <div className="text-center space-y-2 animate-slide-in-right">
            <h1 className="text-3xl font-bold text-foreground">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Start tokenizing your water rights today" 
                : "Sign in to manage your water rights"}
            </p>
          </div>

          {/* Forms */}
          <div className="space-y-6">
            {!isSignUp ? (
              // Login Form
              <form onSubmit={handleSignIn} className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/50 border-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/50 border-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 gradient-ocean text-white font-semibold shadow-ocean hover:shadow-glow transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignUp} className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-foreground">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/50 border-accent/20 focus:border-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/50 border-accent/20 focus:border-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/50 border-accent/20 focus:border-accent transition-all"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 6 characters
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 gradient-conservation text-white font-semibold shadow-ocean hover:shadow-glow transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Toggle between login/signup */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 font-semibold text-primary hover:text-primary/80 transition-colors"
                  disabled={isLoading}
                >
                  {isSignUp ? "Sign in" : "Create account"}
                </button>
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 pt-6 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplet className="w-4 h-4 text-secondary" />
              <span>Blockchain</span>
            </div>
            <div className="flex items-center gap-1">
              <Waves className="w-4 h-4 text-accent" />
              <span>Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
