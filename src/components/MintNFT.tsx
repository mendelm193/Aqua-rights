import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

interface MintNFTProps {
  userAccountId: string | null;
}

const MintNFT = ({ userAccountId }: MintNFTProps) => {
  const [gallons, setGallons] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const handleMintNFT = async () => {
    if (!userAccountId) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!gallons || parseFloat(gallons) <= 0) {
      toast.error("Please enter a valid amount of gallons");
      return;
    }

    setIsMinting(true);

    try {
      // Simulate NFT minting on Hedera
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const nftId = `0.0.${Math.floor(Math.random() * 1000000)}`;
      const serialNumber = Math.floor(Math.random() * 10000);
      
      toast.success(
        `Successfully minted Water Rights NFT!`,
        {
          description: `NFT ID: ${nftId} | Serial: ${serialNumber} | ${gallons} gallons`,
        }
      );
      
      setGallons("");
    } catch (error) {
      toast.error("Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card className="shadow-ocean gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Mint Water Rights NFT
        </CardTitle>
        <CardDescription>
          Create a blockchain-verified NFT representing your water rights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gallons">Gallons to Tokenize</Label>
          <Input
            id="gallons"
            type="number"
            placeholder="Enter amount (e.g., 1000)"
            value={gallons}
            onChange={(e) => setGallons(e.target.value)}
            min="1"
            step="1"
          />
        </div>

        {userAccountId && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Connected Wallet</p>
            <p className="font-mono text-sm text-foreground">{userAccountId}</p>
          </div>
        )}

        <Button
          onClick={handleMintNFT}
          disabled={isMinting || !userAccountId}
          className="w-full"
          variant="ocean"
        >
          {isMinting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Minting NFT...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 w-4 h-4" />
              Mint NFT
            </>
          )}
        </Button>

        {!userAccountId && (
          <p className="text-sm text-destructive text-center">
            Connect your Hedera wallet to mint NFTs
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MintNFT;
