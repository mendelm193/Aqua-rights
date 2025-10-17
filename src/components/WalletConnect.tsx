import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WalletConnectProps {
  user: User;
}

const WalletConnect = ({ user }: WalletConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWallet = async () => {
    try {
      setIsCreating(true);
      toast.info("Creating Hedera wallet...");
      
      // Simulate wallet creation - In production, integrate with Hedera SDK
      // Reference: https://docs.hedera.com/hedera/sdks-and-apis/rest-api/tokens
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a simulated account ID
      const newAccountId = `0.0.${Math.floor(Math.random() * 900000) + 100000}`;
      
      // Update user profile with Hedera account ID
      const { error } = await supabase
        .from('profiles')
        .update({ hedera_account_id: newAccountId })
        .eq('id', user.id);
      
      if (error) {
        toast.error("Failed to save wallet information");
        return;
      }
      
      setIsConnected(true);
      setAccountId(newAccountId);
      toast.success("Hedera wallet created successfully!");
      
    } catch (error) {
      toast.error("Failed to create wallet. Please try again.");
      console.error("Wallet creation error:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleConnectExisting = async () => {
    try {
      toast.info("Connecting to Hedera wallet...");
      
      // Simulate wallet connection - In production, use WalletConnect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const connectedAccountId = `0.0.${Math.floor(Math.random() * 900000) + 100000}`;
      
      // Update user profile
      const { error } = await supabase
        .from('profiles')
        .update({ hedera_account_id: connectedAccountId })
        .eq('id', user.id);
      
      if (error) {
        toast.error("Failed to connect wallet");
        return;
      }
      
      setIsConnected(true);
      setAccountId(connectedAccountId);
      toast.success("Wallet connected successfully!");
      
    } catch (error) {
      toast.error("Failed to connect wallet. Please try again.");
      console.error("Wallet connection error:", error);
    }
  };

  const handleDisconnect = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ hedera_account_id: null })
      .eq('id', user.id);
    
    if (error) {
      toast.error("Failed to disconnect wallet");
      return;
    }
    
    setIsConnected(false);
    setAccountId(null);
    toast.info("Wallet disconnected");
  };

  return (
    <Card className="shadow-card gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          Hedera Wallet
        </CardTitle>
        <CardDescription>
          Create or connect your Hedera wallet for water rights trading
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="space-y-3">
            <Button 
              onClick={handleCreateWallet} 
              variant="ocean" 
              className="w-full"
              size="lg"
              disabled={isCreating}
            >
              <Plus className="mr-2" />
              {isCreating ? "Creating Wallet..." : "Create New Wallet"}
            </Button>
            <Button 
              onClick={handleConnectExisting} 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              <Wallet className="mr-2" />
              Connect Existing Wallet
            </Button>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Powered by Hedera Hashgraph
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Connected</span>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Account ID</p>
              <p className="font-mono font-medium text-foreground">{accountId}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Network</p>
              <p className="font-medium text-foreground">Hedera Mainnet</p>
            </div>
            <Button 
              onClick={handleDisconnect} 
              variant="outline" 
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
