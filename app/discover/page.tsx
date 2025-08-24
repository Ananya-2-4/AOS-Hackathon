"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Verified,
  Bot,
  Brain,
  AlertTriangle,
  Target,
  FileText,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Asset {
  id: string
  title: string
  category: string
  image: string
  currentValue: string
  tokenValue: string
  totalTokens: number
  availableTokens: number
  location: string
  description: string
  verified: boolean
  roi: string
}

interface AIAsset {
  id: string
  title: string
  category: string
  image: string
  estimatedValue: string
  location: string
  description: string
  aiConfidence: number
  riskLevel: "Low" | "Medium" | "High"
  pricePredict: string
  dataSource: string
  aiTags: string[]
  discoveredDate: string
}

function AIAssetCard({ asset }: { asset: AIAsset }) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "High":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group relative">
      {/* AI Badge */}
      <div className="absolute top-2 left-2 z-10">
        <Badge className="bg-primary/20 text-primary border-primary/50 flex items-center gap-1">
          <Bot className="w-3 h-3" />
          AI Found
        </Badge>
      </div>

      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={asset.image || "/placeholder.svg"}
          alt={asset.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50">
            {asset.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-foreground group-hover:text-primary transition-colors">{asset.title}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {asset.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Confidence & Risk */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Brain className="w-3 h-3" />
              AI Confidence
            </p>
            <p className="font-semibold text-primary">{asset.aiConfidence}%</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Risk Level
            </p>
            <Badge className={getRiskColor(asset.riskLevel)}>{asset.riskLevel}</Badge>
          </div>
        </div>

        {/* Value & Prediction */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Est. Value</p>
            <p className="font-semibold text-foreground">{asset.estimatedValue}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Target className="w-3 h-3" />
              Price Target
            </p>
            <p className="font-semibold text-secondary">{asset.pricePredict}</p>
          </div>
        </div>

        {/* AI Tags */}
        <div className="flex flex-wrap gap-1">
          {asset.aiTags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-muted/50 border-muted">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Data Source */}
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <FileText className="w-3 h-3" />
          Source: {asset.dataSource}
        </div>

        <Button asChild className="w-full gradient-button-primary text-white font-medium">
          <Link href={`/ai-asset/${asset.id}`}>
            <Zap className="w-4 h-4 mr-2" />
            Analyze & Tokenize
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={asset.image || "/placeholder.svg"}
          alt={asset.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          {asset.verified && (
            <Badge className="bg-primary/20 text-primary border-primary/50">
              <Verified className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50">
            {asset.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-foreground group-hover:text-primary transition-colors">{asset.title}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {asset.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Asset Value</p>
            <p className="font-semibold text-foreground">{asset.currentValue}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Token Price</p>
            <p className="font-semibold text-secondary">{asset.tokenValue}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-chart-3">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-semibold">{asset.roi} ROI</span>
          </div>
          <div className="text-muted-foreground">
            {asset.availableTokens}/{asset.totalTokens} available
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((asset.totalTokens - asset.availableTokens) / asset.totalTokens) * 100}%` }}
          />
        </div>

        <Button asChild className="w-full gradient-button-secondary text-background font-medium">
          <Link href={`/asset/${asset.id}`}>View & Tokenize</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function AssetCardSkeleton() {
  return (
    <Card className="bg-card/30 border-border/30">
      <Skeleton className="w-full h-48 rounded-t-lg" />
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export default function DiscoverPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [aiAssets, setAiAssets] = useState<AIAsset[]>([])
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([])
  const [filteredAiAssets, setFilteredAiAssets] = useState<AIAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [activeTab, setActiveTab] = useState("community")

  useEffect(() => {
    // Simulate API call
    const fetchAssets = async () => {
      setLoading(true)
      try {
        const response = await fetch("/data/assets.json")
        const data = await response.json()
        setAssets(data)
        setFilteredAssets(data)

        const aiData: AIAsset[] = [
          {
            id: "ai-1",
            title: "Abandoned Industrial Complex - Detroit",
            category: "Industrial Assets",
            image: "/abandoned-industrial-building.png",
            estimatedValue: "$2,400,000",
            location: "Detroit, Michigan, USA",
            description:
              "Large industrial complex identified through satellite imagery analysis and government records.",
            aiConfidence: 87,
            riskLevel: "Medium",
            pricePredict: "$3,200,000",
            dataSource: "Michigan State Property Records",
            aiTags: ["Renovation Potential", "Zoning Approved", "Infrastructure Access"],
            discoveredDate: "2024-01-15",
          },
          {
            id: "ai-2",
            title: "Rural Farmland - Nebraska",
            category: "Agricultural Land",
            image: "/rural-farmland-nebraska.png",
            estimatedValue: "$850,000",
            location: "Lincoln County, Nebraska, USA",
            description: "Prime agricultural land identified through USDA database analysis and soil quality reports.",
            aiConfidence: 94,
            riskLevel: "Low",
            pricePredict: "$1,100,000",
            dataSource: "USDA Agricultural Census",
            aiTags: ["High Soil Quality", "Water Rights", "Climate Resilient"],
            discoveredDate: "2024-01-12",
          },
          {
            id: "ai-3",
            title: "Historic Warehouse District - Portland",
            category: "Commercial Property",
            image: "/historic-warehouse-portland.png",
            estimatedValue: "$5,200,000",
            location: "Portland, Oregon, USA",
            description: "Historic warehouse complex discovered through city planning documents and zoning changes.",
            aiConfidence: 76,
            riskLevel: "High",
            pricePredict: "$7,800,000",
            dataSource: "Portland City Planning Office",
            aiTags: ["Historic District", "Development Potential", "Transit Access"],
            discoveredDate: "2024-01-10",
          },
          {
            id: "ai-4",
            title: "Coastal Development Land - Florida",
            category: "Real Estate",
            image: "/coastal-development-land-florida.png",
            estimatedValue: "$3,600,000",
            location: "Sarasota County, Florida, USA",
            description: "Undeveloped coastal property identified through environmental impact studies and permits.",
            aiConfidence: 82,
            riskLevel: "Medium",
            pricePredict: "$4,900,000",
            dataSource: "Florida Environmental Protection",
            aiTags: ["Coastal Access", "Development Ready", "Environmental Cleared"],
            discoveredDate: "2024-01-08",
          },
        ]
        setAiAssets(aiData)
        setFilteredAiAssets(aiData)
      } catch (error) {
        console.error("Failed to fetch assets:", error)
      } finally {
        setTimeout(() => setLoading(false), 1000)
      }
    }

    fetchAssets()
  }, [])

  useEffect(() => {
    // Filter community assets
    let filtered = assets
    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((asset) => asset.category === selectedCategory)
    }
    if (priceRange !== "all") {
      filtered = filtered.filter((asset) => {
        const value = Number.parseInt(asset.currentValue.replace(/[$,]/g, ""))
        switch (priceRange) {
          case "under-1m":
            return value < 1000000
          case "1m-10m":
            return value >= 1000000 && value < 10000000
          case "10m-50m":
            return value >= 10000000 && value < 50000000
          case "over-50m":
            return value >= 50000000
          default:
            return true
        }
      })
    }
    setFilteredAssets(filtered)

    let filteredAI = aiAssets
    if (searchTerm) {
      filteredAI = filteredAI.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== "all") {
      filteredAI = filteredAI.filter((asset) => asset.category === selectedCategory)
    }
    if (priceRange !== "all") {
      filteredAI = filteredAI.filter((asset) => {
        const value = Number.parseInt(asset.estimatedValue.replace(/[$,]/g, ""))
        switch (priceRange) {
          case "under-1m":
            return value < 1000000
          case "1m-10m":
            return value >= 1000000 && value < 10000000
          case "10m-50m":
            return value >= 10000000 && value < 50000000
          case "over-50m":
            return value >= 50000000
          default:
            return true
        }
      })
    }
    setFilteredAiAssets(filteredAI)
  }, [assets, aiAssets, searchTerm, selectedCategory, priceRange])

  const allCategories = [
    "all",
    ...Array.from(new Set([...assets.map((asset) => asset.category), ...aiAssets.map((asset) => asset.category)])),
  ]

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
              <Link href="/discover" className="text-foreground font-medium">
                Discover
              </Link>
              <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                Submit Asset
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Discover Assets</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore community-submitted and AI-discovered real-world assets ready for tokenization
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search assets, locations, or categories..."
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
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48 bg-input/50 border-border/30">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-1m">Under $1M</SelectItem>
                <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                <SelectItem value="over-50m">Over $50M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/30">
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Verified className="w-4 h-4" />
                Community Assets ({filteredAssets.length})
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Discovered ({filteredAiAssets.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="community">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <AssetCardSkeleton key={i} />)
                  : filteredAssets.map((asset) => <AssetCard key={asset.id} asset={asset} />)}
              </div>
              {!loading && filteredAssets.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">No community assets found matching your criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ai">
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary">AI Discovery Engine</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  These assets were automatically discovered through AI analysis of government databases, satellite
                  imagery, and public records. Each asset includes AI-generated risk analysis and price predictions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => <AssetCardSkeleton key={i} />)
                  : filteredAiAssets.map((asset) => <AIAssetCard key={asset.id} asset={asset} />)}
              </div>
              {!loading && filteredAiAssets.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No AI-discovered assets found matching your criteria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory !== "all" || priceRange !== "all") && (
            <div className="text-center mt-8">
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange("all")
                }}
                variant="outline"
                className="bg-transparent border-primary/50 text-primary hover:bg-primary/10"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
