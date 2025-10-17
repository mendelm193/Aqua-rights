import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import GallonDetailsDialog from "./GallonDetailsDialog";

const Marketplace = () => {
  const [selectedListing, setSelectedListing] = useState<{
    id: number;
    seller: string;
    amount: number;
    price: number;
    pricePerGallon: number;
    trending: string;
  } | null>(null);

  const handleBuy = (amount: number, price: number) => {
    toast.success(`Initiated purchase of ${amount} gallons for $${price}`);
  };

  const handleSell = (amount: number, price: number) => {
    toast.success(`Listed ${amount} gallons for sale at $${price}`);
  };

  const listings = [
    { id: 1, seller: "0.0.789012", amount: 1000, price: 1950, pricePerGallon: 1.95, trending: "up" },
    { id: 2, seller: "0.0.345678", amount: 500, price: 975, pricePerGallon: 1.95, trending: "stable" },
    { id: 3, seller: "0.0.901234", amount: 750, price: 1425, pricePerGallon: 1.90, trending: "down" },
    { id: 4, seller: "0.0.567890", amount: 1500, price: 2850, pricePerGallon: 1.90, trending: "up" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Water Rights Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trade water usage rights transparently and securely on the Hedera blockchain
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-card gradient-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Market Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$1.92</div>
              <p className="text-sm text-accent flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +5.2% today
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                24h Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">45,230</div>
              <p className="text-sm text-muted-foreground mt-1">gallons traded</p>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">127</div>
              <p className="text-sm text-muted-foreground mt-1">available offers</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="shadow-card gradient-card border-primary/20 hover:shadow-ocean transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      {listing.amount} gallons
                      {listing.trending === "up" && (
                        <Badge variant="secondary" className="gradient-conservation text-white">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="font-mono text-sm mt-1">
                      Seller: {listing.seller}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      ${listing.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${listing.pricePerGallon}/gal
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button 
                    variant="ocean" 
                    className="flex-1"
                    onClick={() => handleBuy(listing.amount, listing.price)}
                  >
                    <ArrowDownRight className="mr-2 w-4 h-4" />
                    Buy Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedListing(listing)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sell Section */}
        <Card className="mt-12 shadow-ocean gradient-card border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground">Sell Your Water Rights</CardTitle>
            <CardDescription>
              List your unused water rights for sale and earn instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Your Available Rights</p>
                <p className="text-3xl font-bold text-foreground">2,450 gal</p>
              </div>
              <div className="flex-1 text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Suggested Price</p>
                <p className="text-3xl font-bold text-foreground">$4,704</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Button 
                  variant="conservation" 
                  size="lg"
                  className="w-full"
                  onClick={() => handleSell(2450, 4704)}
                >
                  <ArrowUpRight className="mr-2" />
                  List for Sale
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedListing && (
        <GallonDetailsDialog
          open={!!selectedListing}
          onOpenChange={(open) => !open && setSelectedListing(null)}
          listing={selectedListing}
        />
      )}
    </section>
  );
};

export default Marketplace;
