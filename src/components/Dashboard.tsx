import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Award, TrendingUp, Coins } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Your Water Rights Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-card gradient-card border-primary/20 hover:shadow-ocean transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Droplet className="w-4 h-4 text-primary" />
                Water Rights Owned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">2,450</div>
              <p className="text-sm text-muted-foreground mt-1">gallons/month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-secondary/20 hover:shadow-ocean transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$4,890</div>
              <p className="text-sm text-accent mt-1">+12.5% this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-accent/20 hover:shadow-ocean transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Conservation Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">1,250</div>
              <p className="text-sm text-muted-foreground mt-1">reward tokens</p>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-primary/20 hover:shadow-ocean transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                Water Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">750</div>
              <p className="text-sm text-muted-foreground mt-1">gallons this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-card gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Purchased", amount: "500 gallons", value: "$950", time: "2 hours ago" },
                  { type: "Sold", amount: "200 gallons", value: "$380", time: "1 day ago" },
                  { type: "Reward Earned", amount: "150 tokens", value: "$45", time: "3 days ago" },
                ].map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{transaction.value}</p>
                      <p className="text-xs text-muted-foreground">{transaction.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground">Conservation Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Monthly Goal</span>
                    <span className="text-sm font-medium text-accent">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="gradient-conservation h-3 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">This Week</p>
                    <p className="text-2xl font-bold text-foreground">180 gal</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">This Month</p>
                    <p className="text-2xl font-bold text-foreground">750 gal</p>
                  </div>
                </div>

                <div className="p-4 gradient-conservation text-white rounded-lg">
                  <p className="font-semibold mb-1">🌟 Achievement Unlocked!</p>
                  <p className="text-sm opacity-90">Water Warrior - Saved 500+ gallons</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
