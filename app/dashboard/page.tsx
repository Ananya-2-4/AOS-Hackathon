"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Coins,
  PieChart,
  BarChart3,
  Send,
  ShoppingCart,
  Eye,
  MapPin,
  Calendar,
  Activity,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserAsset {
  id: string
  assetId: string
  title: string
  category: string
  image: string
  tokenCount: number
  tokenValue: string
  totalValue: number
  purchasePrice: number
  currentPrice: number
  location: string
  purchaseDate: string
  roi: number
}

interface PortfolioStats {
  totalValue: number
  totalInvested: number
  totalROI: number
  totalAssets: number
  totalTokens: number
}

function AssetCard({ asset }: { asset: UserAsset }) {
  const [sellDialogOpen, setSellDialogOpen] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [sellQuantity, setSellQuantity] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [transferQuantity, setTransferQuantity] = useState("")
  const [transferAddress, setTransferAddress] = useState("")

  const profitLoss = asset.totalValue - asset.purchasePrice
  const profitLossPercentage = ((profitLoss / asset.purchasePrice) * 100).toFixed(2)
  const isProfit = profitLoss >= 0

  const handleSell = () => {
    if (!sellQuantity || !sellPrice) return

    const quantity = Number.parseInt(sellQuantity)
    const price = Number.parseFloat(sellPrice)

    if (quantity > asset.tokenCount || quantity <= 0) {
      alert("Invalid quantity. Please enter a valid number of tokens to sell.")
      return
    }

    // Simulate sell transaction
    alert(
      `Successfully listed ${quantity} tokens for sale at $${price} each. Total value: $${(quantity * price).toLocaleString()}`,
    )
    setSellDialogOpen(false)
    setSellQuantity("")
    setSellPrice("")
  }

  const handleTransfer = () => {
    if (!transferQuantity || !transferAddress) return

    const quantity = Number.parseInt(transferQuantity)

    if (quantity > asset.tokenCount || quantity <= 0) {
      alert("Invalid quantity. Please enter a valid number of tokens to transfer.")
      return
    }

    if (transferAddress.length < 10) {
      alert("Please enter a valid wallet address.")
      return
    }

    // Simulate transfer transaction
    alert(`Successfully transferred ${quantity} tokens to ${transferAddress}`)
    setTransferDialogOpen(false)
    setTransferQuantity("")
    setTransferAddress("")
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:neon-glow hover:border-primary/50 transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={asset.image || "/placeholder.svg"}
          alt={asset.title}
          width={400}
          height={200}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50">
            {asset.category}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge
            className={`${
              isProfit
                ? "bg-chart-4/20 text-chart-4 border-chart-4/50"
                : "bg-destructive/20 text-destructive border-destructive/50"
            }`}
          >
            {isProfit ? "+" : ""}
            {profitLossPercentage}%
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="font-mono text-primary group-hover:neon-text transition-all duration-300 text-sm">
          {asset.title}
        </CardTitle>
        <CardDescription className="flex items-center text-muted-foreground text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          {asset.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground">Tokens Owned</p>
            <p className="font-semibold text-foreground">{asset.tokenCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Token Value</p>
            <p className="font-semibold text-secondary">{asset.tokenValue}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Current Value</span>
            <span className="font-semibold text-foreground">${asset.totalValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">P&L</span>
            <span className={`font-semibold ${isProfit ? "text-chart-4" : "text-destructive"}`}>
              {isProfit ? "+" : ""}${profitLoss.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          Purchased {asset.purchaseDate}
        </div>

        <div className="flex gap-2">
          <Dialog open={sellDialogOpen} onOpenChange={setSellDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/50 bg-transparent"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Sell
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sell Tokens</DialogTitle>
                <DialogDescription>Sell your {asset.title} tokens on the marketplace.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sell-quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="sell-quantity"
                    type="number"
                    placeholder="0"
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(e.target.value)}
                    max={asset.tokenCount}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sell-price" className="text-right">
                    Price per token
                  </Label>
                  <Input
                    id="sell-price"
                    type="number"
                    placeholder="0.00"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Available: {asset.tokenCount} tokens
                  {sellQuantity && sellPrice && (
                    <div className="mt-1 font-semibold">
                      Total: ${(Number.parseInt(sellQuantity) * Number.parseFloat(sellPrice)).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSell} disabled={!sellQuantity || !sellPrice}>
                  List for Sale
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs border-border/50 text-foreground hover:bg-secondary/10 hover:border-secondary/50 bg-transparent"
              >
                <Send className="w-3 h-3 mr-1" />
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Transfer Tokens</DialogTitle>
                <DialogDescription>Transfer your {asset.title} tokens to another wallet.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transfer-quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="transfer-quantity"
                    type="number"
                    placeholder="0"
                    value={transferQuantity}
                    onChange={(e) => setTransferQuantity(e.target.value)}
                    max={asset.tokenCount}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transfer-address" className="text-right">
                    To Address
                  </Label>
                  <Input
                    id="transfer-address"
                    placeholder="0x..."
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="text-sm text-muted-foreground">Available: {asset.tokenCount} tokens</div>
              </div>
              <DialogFooter>
                <Button onClick={handleTransfer} disabled={!transferQuantity || !transferAddress}>
                  Transfer Tokens
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          asChild
          size="sm"
          variant="ghost"
          className="w-full text-xs text-primary hover:text-primary hover:bg-primary/10"
        >
          <Link href={`/asset/${asset.assetId}`}>
            <Eye className="w-3 h-3 mr-1" />
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function StatsCard({ title, value, change, icon: Icon, trend }: any) {
  const isPositive = trend === "up"

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:neon-glow hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className={`flex items-center text-sm ${isPositive ? "text-chart-4" : "text-destructive"}`}>
                {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {change}
              </div>
            )}
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isPositive ? "bg-chart-4/20" : "bg-primary/20"
            } neon-glow`}
          >
            <Icon className={`w-6 h-6 ${isPositive ? "text-chart-4" : "text-primary"}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [userAssets, setUserAssets] = useState<UserAsset[]>([])
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user's portfolio data
    const fetchPortfolioData = async () => {
      setLoading(true)

      // Simulate API delay
      setTimeout(() => {
        // Mock user portfolio data
        const mockUserAssets: UserAsset[] = [
          {
            id: "1",
            assetId: "1",
            title: "Luxury Apartment in Mumbai",
            category: "Real Estate",
            image: "/placeholder.svg?height=200&width=400",
            tokenCount: 5,
            tokenValue: "$25,000",
            totalValue: 127500,
            purchasePrice: 125000,
            currentPrice: 25500,
            location: "Bandra West, Mumbai",
            purchaseDate: "Jan 15, 2024",
            roi: 2.0,
          },
          {
            id: "2",
            assetId: "3",
            title: "Picasso Original Painting",
            category: "Art",
            image: "/placeholder.svg?height=200&width=400",
            tokenCount: 2,
            tokenValue: "$450,000",
            totalValue: 920000,
            purchasePrice: 900000,
            currentPrice: 460000,
            location: "New York",
            purchaseDate: "Dec 8, 2023",
            roi: 2.2,
          },
          {
            id: "3",
            assetId: "5",
            title: "Rare Wine Collection",
            category: "Commodity",
            image: "/placeholder.svg?height=200&width=400",
            tokenCount: 10,
            tokenValue: "$8,500",
            totalValue: 87000,
            purchasePrice: 85000,
            currentPrice: 8700,
            location: "Bordeaux, France",
            purchaseDate: "Nov 22, 2023",
            roi: 2.4,
          },
        ]

        const totalValue = mockUserAssets.reduce((sum, asset) => sum + asset.totalValue, 0)
        const totalInvested = mockUserAssets.reduce((sum, asset) => sum + asset.purchasePrice, 0)
        const totalROI = ((totalValue - totalInvested) / totalInvested) * 100

        const stats: PortfolioStats = {
          totalValue,
          totalInvested,
          totalROI,
          totalAssets: mockUserAssets.length,
          totalTokens: mockUserAssets.reduce((sum, asset) => sum + asset.tokenCount, 0),
        }

        setUserAssets(mockUserAssets)
        setPortfolioStats(stats)
        setLoading(false)
      }, 1000)
    }

    fetchPortfolioData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/">
                  <h1 className="text-2xl font-bold font-mono text-primary neon-text">RealWorldX</h1>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold font-mono text-primary neon-text">RealWorldX</h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/discover" className="text-foreground hover:text-primary transition-colors">
                Discover
              </Link>
              <Link href="/dashboard" className="text-primary font-semibold">
                Dashboard
              </Link>
              <Button
                variant="outline"
                className="neon-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Wallet className="w-4 h-4 mr-2" />
                0x742d...8D4
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-primary neon-text mb-2">Portfolio Dashboard</h1>
          <p className="text-lg text-foreground/80">Track your tokenized asset investments</p>
        </div>

        {/* Portfolio Stats */}
        {portfolioStats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Portfolio Value"
              value={`$${portfolioStats.totalValue.toLocaleString()}`}
              change={`+${portfolioStats.totalROI.toFixed(2)}%`}
              icon={DollarSign}
              trend="up"
            />
            <StatsCard
              title="Total Invested"
              value={`$${portfolioStats.totalInvested.toLocaleString()}`}
              change="Since inception"
              icon={TrendingUp}
              trend="up"
            />
            <StatsCard
              title="Total Assets"
              value={portfolioStats.totalAssets}
              change={`${portfolioStats.totalTokens} tokens`}
              icon={PieChart}
              trend="up"
            />
            <StatsCard
              title="Profit/Loss"
              value={`$${(portfolioStats.totalValue - portfolioStats.totalInvested).toLocaleString()}`}
              change={`+${portfolioStats.totalROI.toFixed(2)}%`}
              icon={BarChart3}
              trend="up"
            />
          </div>
        )}

        {/* Portfolio Content */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="bg-muted/50 border border-border/50">
            <TabsTrigger
              value="assets"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              My Assets
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Recent Activity
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold font-mono text-secondary">Your Tokenized Assets</h2>
              <Button
                asChild
                className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                <Link href="/discover">
                  <Coins className="w-4 h-4 mr-2" />
                  Discover More Assets
                </Link>
              </Button>
            </div>

            {userAssets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Assets Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start building your portfolio by tokenizing real-world assets
                  </p>
                  <Button
                    asChild
                    className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    <Link href="/discover">Explore Assets</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-semibold font-mono text-secondary">Recent Activity</h2>
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      action: "Purchased",
                      asset: "Luxury Apartment in Mumbai",
                      amount: "5 tokens",
                      value: "$125,000",
                      date: "Jan 15, 2024",
                      type: "buy",
                    },
                    {
                      action: "Purchased",
                      asset: "Picasso Original Painting",
                      amount: "2 tokens",
                      value: "$900,000",
                      date: "Dec 8, 2023",
                      type: "buy",
                    },
                    {
                      action: "Purchased",
                      asset: "Rare Wine Collection",
                      amount: "10 tokens",
                      value: "$85,000",
                      date: "Nov 22, 2023",
                      type: "buy",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-chart-4/20 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-chart-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {activity.action} {activity.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">{activity.asset}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{activity.value}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold font-mono text-secondary">Portfolio Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-mono text-primary">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Art", percentage: 82, value: "$920,000", color: "bg-primary" },
                      { category: "Real Estate", percentage: 11, value: "$127,500", color: "bg-secondary" },
                      { category: "Commodity", percentage: 7, value: "$87,000", color: "bg-chart-3" },
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{item.category}</span>
                          <span className="text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                        <div className="text-right text-xs text-muted-foreground">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-mono text-primary">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Performer</span>
                      <span className="text-chart-4 font-semibold">Rare Wine Collection (+2.4%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Return</span>
                      <span className="text-chart-4 font-semibold">+$22,500 (+2.1%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investment Period</span>
                      <span className="text-foreground">3 months avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Level</span>
                      <span className="text-secondary font-semibold">Moderate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
