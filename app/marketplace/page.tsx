"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  BarChart3,
  Activity,
  DollarSign,
  Users,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MarketplaceToken {
  id: string
  assetTitle: string
  tokenSymbol: string
  category: string
  image: string
  currentPrice: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  totalSupply: number
  availableTokens: number
  holders: number
  liquidity: number
  lastTrade: string
  priceHistory: number[]
}

interface TradeOrder {
  id: string
  type: "buy" | "sell"
  tokenSymbol: string
  amount: number
  price: number
  total: number
  timestamp: string
  status: "pending" | "completed" | "cancelled"
}

function TokenCard({ token }: { token: MarketplaceToken }) {
  const [showTradeDialog, setShowTradeDialog] = useState(false)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [tradeAmount, setTradeAmount] = useState("")
  const [tradePrice, setTradePrice] = useState(token.currentPrice.toString())

  const priceChangeColor = token.priceChange24h >= 0 ? "text-green-400" : "text-red-400"
  const priceChangeIcon =
    token.priceChange24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />

  const handleTrade = () => {
    const amount = Number.parseFloat(tradeAmount)
    const price = Number.parseFloat(tradePrice)
    const total = amount * price

    console.log(`[v0] ${tradeType.toUpperCase()} Order:`, {
      token: token.tokenSymbol,
      amount,
      price,
      total,
    })

    // Simulate trade execution
    alert(
      `${tradeType.toUpperCase()} order placed: ${amount} ${token.tokenSymbol} at $${price} each (Total: $${total.toFixed(2)})`,
    )
    setShowTradeDialog(false)
    setTradeAmount("")
  }

  return (
    <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Image
            src={token.image || "/placeholder.svg"}
            alt={token.assetTitle}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div className="flex-1">
            <CardTitle className="text-foreground text-lg">{token.tokenSymbol}</CardTitle>
            <CardDescription className="text-muted-foreground">{token.assetTitle}</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50">
            {token.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price & Change */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">${token.currentPrice.toFixed(4)}</p>
            <div className={`flex items-center gap-1 text-sm ${priceChangeColor}`}>
              {priceChangeIcon}
              <span>
                {token.priceChange24h >= 0 ? "+" : ""}
                {token.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="font-semibold text-foreground">${token.volume24h.toLocaleString()}</p>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-semibold text-foreground">${(token.marketCap / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-muted-foreground">Available</p>
            <p className="font-semibold text-secondary">{token.availableTokens.toLocaleString()}</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-muted/30 rounded">
            <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <p className="font-medium text-foreground">{token.holders}</p>
            <p className="text-muted-foreground">Holders</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded">
            <DollarSign className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <p className="font-medium text-foreground">${(token.liquidity / 1000).toFixed(0)}K</p>
            <p className="text-muted-foreground">Liquidity</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded">
            <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <p className="font-medium text-foreground">{token.lastTrade}</p>
            <p className="text-muted-foreground">Last Trade</p>
          </div>
        </div>

        {/* Trading Buttons */}
        <div className="flex gap-2">
          <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
            <DialogTrigger asChild>
              <Button
                className="flex-1 gradient-button-primary text-white font-medium"
                onClick={() => setTradeType("buy")}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Buy
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={() => setTradeType("sell")}
              >
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Sell
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-card border-border/50">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {tradeType === "buy" ? (
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-400" />
                  )}
                  {tradeType === "buy" ? "Buy" : "Sell"} {token.tokenSymbol}
                </DialogTitle>
                <DialogDescription>
                  {tradeType === "buy" ? "Purchase" : "Sell"} {token.tokenSymbol} tokens from {token.assetTitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.0001"
                      value={tradePrice}
                      onChange={(e) => setTradePrice(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold text-foreground">
                      ${(Number.parseFloat(tradeAmount || "0") * Number.parseFloat(tradePrice || "0")).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Fee (0.5%):</span>
                    <span className="text-foreground">
                      $
                      {(Number.parseFloat(tradeAmount || "0") * Number.parseFloat(tradePrice || "0") * 0.005).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleTrade}
                  disabled={!tradeAmount || Number.parseFloat(tradeAmount) <= 0}
                  className={`w-full font-medium ${
                    tradeType === "buy"
                      ? "gradient-button-primary text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {tradeType === "buy" ? "Place Buy Order" : "Place Sell Order"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button asChild variant="outline" className="w-full bg-transparent border-border/50">
          <Link href={`/token/${token.id}`}>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function RecentTrades({ trades }: { trades: TradeOrder[] }) {
  return (
    <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Recent Trades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trades.slice(0, 5).map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    trade.type === "buy"
                      ? "bg-green-400/20 text-green-400 border-green-400/50"
                      : "bg-red-400/20 text-red-400 border-red-400/50"
                  }
                >
                  {trade.type.toUpperCase()}
                </Badge>
                <div>
                  <p className="font-medium text-foreground">{trade.tokenSymbol}</p>
                  <p className="text-xs text-muted-foreground">{trade.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{trade.amount} tokens</p>
                <p className="text-sm text-muted-foreground">${trade.price.toFixed(4)} each</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function MarketplacePage() {
  const [tokens, setTokens] = useState<MarketplaceToken[]>([])
  const [recentTrades, setRecentTrades] = useState<TradeOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("volume")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true)

      // Simulate market data
      const tokensData: MarketplaceToken[] = [
        {
          id: "token-1",
          assetTitle: "Luxury Apartment Complex - Miami",
          tokenSymbol: "MIAMI-APT",
          category: "Real Estate",
          image: "/luxury-apartment-building.png",
          currentPrice: 125.45,
          priceChange24h: 5.67,
          volume24h: 234567,
          marketCap: 12545000,
          totalSupply: 100000,
          availableTokens: 23456,
          holders: 1247,
          liquidity: 567890,
          lastTrade: "2m ago",
          priceHistory: [120, 122, 119, 125, 128, 125],
        },
        {
          id: "token-2",
          assetTitle: "Historic Downtown Building - Portland",
          tokenSymbol: "PDX-HIST",
          category: "Commercial Property",
          image: "/historic-downtown-building.png",
          currentPrice: 89.32,
          priceChange24h: -2.34,
          volume24h: 156789,
          marketCap: 8932000,
          totalSupply: 100000,
          availableTokens: 34567,
          holders: 892,
          liquidity: 345678,
          lastTrade: "5m ago",
          priceHistory: [92, 90, 88, 89, 87, 89],
        },
        {
          id: "token-3",
          assetTitle: "Agricultural Land - Nebraska",
          tokenSymbol: "NE-FARM",
          category: "Agricultural Land",
          image: "/agricultural-farmland.png",
          currentPrice: 45.78,
          priceChange24h: 12.45,
          volume24h: 89234,
          marketCap: 4578000,
          totalSupply: 100000,
          availableTokens: 45678,
          holders: 567,
          liquidity: 234567,
          lastTrade: "1m ago",
          priceHistory: [40, 42, 44, 46, 48, 46],
        },
        {
          id: "token-4",
          assetTitle: "Industrial Complex - Detroit",
          tokenSymbol: "DET-IND",
          category: "Industrial Assets",
          image: "/abandoned-industrial-building.png",
          currentPrice: 67.89,
          priceChange24h: -0.89,
          volume24h: 123456,
          marketCap: 6789000,
          totalSupply: 100000,
          availableTokens: 56789,
          holders: 734,
          liquidity: 345678,
          lastTrade: "8m ago",
          priceHistory: [70, 68, 66, 68, 69, 68],
        },
        {
          id: "token-5",
          assetTitle: "Coastal Development Land - Florida",
          tokenSymbol: "FL-COAST",
          category: "Real Estate",
          image: "/coastal-development-land-florida.png",
          currentPrice: 234.56,
          priceChange24h: 8.92,
          volume24h: 345678,
          marketCap: 23456000,
          totalSupply: 100000,
          availableTokens: 12345,
          holders: 1567,
          liquidity: 789012,
          lastTrade: "3m ago",
          priceHistory: [220, 225, 230, 235, 240, 235],
        },
        {
          id: "token-6",
          assetTitle: "Historic Warehouse District - Portland",
          tokenSymbol: "PDX-WARE",
          category: "Commercial Property",
          image: "/historic-warehouse-portland.png",
          currentPrice: 156.78,
          priceChange24h: 3.45,
          volume24h: 198765,
          marketCap: 15678000,
          totalSupply: 100000,
          availableTokens: 28901,
          holders: 1123,
          liquidity: 456789,
          lastTrade: "4m ago",
          priceHistory: [150, 152, 155, 157, 160, 157],
        },
      ]

      const tradesData: TradeOrder[] = [
        {
          id: "trade-1",
          type: "buy",
          tokenSymbol: "MIAMI-APT",
          amount: 150,
          price: 125.45,
          total: 18817.5,
          timestamp: "2 minutes ago",
          status: "completed",
        },
        {
          id: "trade-2",
          type: "sell",
          tokenSymbol: "PDX-HIST",
          amount: 75,
          price: 89.32,
          total: 6699,
          timestamp: "5 minutes ago",
          status: "completed",
        },
        {
          id: "trade-3",
          type: "buy",
          tokenSymbol: "NE-FARM",
          amount: 200,
          price: 45.78,
          total: 9156,
          timestamp: "1 minute ago",
          status: "completed",
        },
        {
          id: "trade-4",
          type: "buy",
          tokenSymbol: "FL-COAST",
          amount: 50,
          price: 234.56,
          total: 11728,
          timestamp: "3 minutes ago",
          status: "completed",
        },
        {
          id: "trade-5",
          type: "sell",
          tokenSymbol: "DET-IND",
          amount: 100,
          price: 67.89,
          total: 6789,
          timestamp: "8 minutes ago",
          status: "completed",
        },
      ]

      setTokens(tokensData)
      setRecentTrades(tradesData)
      setTimeout(() => setLoading(false), 1000)
    }

    fetchMarketData()
  }, [])

  const filteredTokens = tokens
    .filter((token) => {
      if (searchTerm) {
        return (
          token.assetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      return true
    })
    .filter((token) => {
      if (selectedCategory !== "all") {
        return token.category === selectedCategory
      }
      return true
    })
    .filter((token) => {
      if (activeTab === "gainers") return token.priceChange24h > 0
      if (activeTab === "losers") return token.priceChange24h < 0
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.currentPrice - a.currentPrice
        case "change":
          return b.priceChange24h - a.priceChange24h
        case "volume":
          return b.volume24h - a.volume24h
        case "marketcap":
          return b.marketCap - a.marketCap
        default:
          return 0
      }
    })

  const categories = ["all", ...Array.from(new Set(tokens.map((token) => token.category)))]

  return (
    <div className="min-h-screen gradient-bg-subtle">
      {/* Navigation */}
      <nav className="border-b border-border/20 backdrop-blur-sm bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              RealWorldX
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/discover" className="text-muted-foreground hover:text-foreground transition-colors">
                Discover
              </Link>
              <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                Submit Asset
              </Link>
              <Link href="/validation" className="text-muted-foreground hover:text-foreground transition-colors">
                Validation
              </Link>
              <Link href="/marketplace" className="text-foreground font-medium">
                Marketplace
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Token Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trade fractionalized real-world asset tokens with instant liquidity and transparent pricing
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Trading Area */}
          <div className="flex-1">
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">
                    ${tokens.reduce((sum, token) => sum + token.marketCap, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Market Cap</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <p className="text-2xl font-bold text-foreground">
                    ${tokens.reduce((sum, token) => sum + token.volume24h, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-chart-3" />
                  <p className="text-2xl font-bold text-foreground">
                    {tokens.reduce((sum, token) => sum + token.holders, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Holders</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Wallet className="w-8 h-8 mx-auto mb-2 text-chart-4" />
                  <p className="text-2xl font-bold text-foreground">{tokens.length}</p>
                  <p className="text-sm text-muted-foreground">Listed Tokens</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Tabs */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tokens, assets, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input/50 border-border/30"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-input/50 border-border/30">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-input/50 border-border/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">24h Change</SelectItem>
                  <SelectItem value="marketcap">Market Cap</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/30">
                <TabsTrigger value="all">All Tokens ({filteredTokens.length})</TabsTrigger>
                <TabsTrigger value="gainers" className="text-green-400">
                  Gainers ({tokens.filter((t) => t.priceChange24h > 0).length})
                </TabsTrigger>
                <TabsTrigger value="losers" className="text-red-400">
                  Losers ({tokens.filter((t) => t.priceChange24h < 0).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="grid md:grid-cols-2 gap-6">
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="bg-card/30 border-border/30">
                          <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
                              <div className="flex-1 space-y-2">
                                <div className="h-5 bg-muted rounded animate-pulse" />
                                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                              </div>
                            </div>
                            <div className="h-8 bg-muted rounded animate-pulse" />
                            <div className="grid grid-cols-2 gap-4">
                              <div className="h-12 bg-muted rounded animate-pulse" />
                              <div className="h-12 bg-muted rounded animate-pulse" />
                            </div>
                          </div>
                        </Card>
                      ))
                    : filteredTokens.map((token) => <TokenCard key={token.id} token={token} />)}
                </div>

                {!loading && filteredTokens.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg mb-4">No tokens found matching your criteria</p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("all")
                        setActiveTab("all")
                      }}
                      variant="outline"
                      className="bg-transparent border-primary/50 text-primary hover:bg-primary/10"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <RecentTrades trades={recentTrades} />

            {/* Market Overview */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-400/10 border border-green-400/20 rounded">
                    <p className="text-lg font-bold text-green-400">
                      {tokens.filter((t) => t.priceChange24h > 0).length}
                    </p>
                    <p className="text-muted-foreground">Gainers</p>
                  </div>
                  <div className="text-center p-3 bg-red-400/10 border border-red-400/20 rounded">
                    <p className="text-lg font-bold text-red-400">
                      {tokens.filter((t) => t.priceChange24h < 0).length}
                    </p>
                    <p className="text-muted-foreground">Losers</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Top Performers</h4>
                  {tokens
                    .sort((a, b) => b.priceChange24h - a.priceChange24h)
                    .slice(0, 3)
                    .map((token) => (
                      <div key={token.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <div>
                          <p className="font-medium text-foreground text-sm">{token.tokenSymbol}</p>
                          <p className="text-xs text-muted-foreground">${token.currentPrice.toFixed(4)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-400">+{token.priceChange24h.toFixed(2)}%</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
