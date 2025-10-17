import { Button } from "@/components/ui/button";
import { Droplet, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Water conservation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/70" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tokenize Water Rights,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-green-100">
              Conserve Our Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Trade water usage rights on the blockchain and earn rewards for conservation. 
            Join the revolution in sustainable water management powered by Hedera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="hero" className="min-w-[200px]">
              Connect Wallet
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px] border-white/30 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all shadow-card">
              <Droplet className="w-12 h-12 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold text-lg mb-2">Tradable Rights</h3>
              <p className="text-white/80 text-sm">Buy, sell, and trade water usage rights seamlessly on Hedera</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all shadow-card">
              <TrendingUp className="w-12 h-12 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold text-lg mb-2">Conservation Rewards</h3>
              <p className="text-white/80 text-sm">Earn tokens for reducing water consumption and protecting resources</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all shadow-card">
              <Shield className="w-12 h-12 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold text-lg mb-2">Blockchain Security</h3>
              <p className="text-white/80 text-sm">Transparent, secure, and immutable transactions on Hedera network</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
