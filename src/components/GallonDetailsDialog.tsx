import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Droplet, Calendar, TrendingUp, MapPin, Shield } from "lucide-react";

interface GallonDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: {
    id: number;
    seller: string;
    amount: number;
    price: number;
    pricePerGallon: number;
    trending: string;
  };
}

const GallonDetailsDialog = ({ open, onOpenChange, listing }: GallonDetailsDialogProps) => {
  // Mock additional details
  const details = {
    location: "California Central Valley",
    sourceType: "Groundwater Rights",
    expirationDate: "December 31, 2025",
    tradingHistory: [
      { date: "2025-09-15", price: "$1.85/gal", volume: "500 gal" },
      { date: "2025-08-20", price: "$1.78/gal", volume: "750 gal" },
      { date: "2025-07-10", price: "$1.70/gal", volume: "1000 gal" },
    ],
    verificationStatus: "Blockchain Verified",
    tokenId: `0.0.${Math.floor(Math.random() * 1000000)}`,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Droplet className="w-6 h-6 text-primary" />
            Water Rights Details
          </DialogTitle>
          <DialogDescription>
            Complete information about this water rights listing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Primary Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">{listing.amount} gal</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Price</p>
              <p className="text-2xl font-bold text-foreground">${listing.price}</p>
            </div>
          </div>

          {/* Seller Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Seller Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Hedera Account ID</span>
                <span className="font-mono text-sm text-foreground">{listing.seller}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Verification Status</span>
                <Badge variant="secondary" className="gradient-conservation text-white">
                  {details.verificationStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Token ID</span>
                <span className="font-mono text-sm text-foreground">{details.tokenId}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Water Rights Details */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              Water Rights Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm text-foreground">{details.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Source Type</span>
                <span className="text-sm text-foreground">{details.sourceType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Expiration Date</span>
                <span className="text-sm text-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {details.expirationDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Price Per Gallon</span>
                <span className="text-sm font-semibold text-foreground">${listing.pricePerGallon}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trading History */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              Recent Trading History
            </h3>
            <div className="space-y-2">
              {details.tradingHistory.map((trade, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{trade.date}</p>
                    <p className="text-xs text-muted-foreground">{trade.volume}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{trade.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-4 gradient-ocean text-white rounded-lg">
            <p className="font-semibold mb-1">💧 Blockchain Transparency</p>
            <p className="text-sm opacity-90">
              All transactions are recorded on the Hedera network for complete transparency
              and immutable proof of ownership.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GallonDetailsDialog;
