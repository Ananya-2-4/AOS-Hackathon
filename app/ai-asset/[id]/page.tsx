"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Bot,
  Brain,
  AlertTriangle,
  Target,
  FileText,
  Zap,
  TrendingUp,
  Calendar,
  Database,
  BarChart3,
  Shield,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

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
  detailedAnalysis: {
    marketTrends: string[]
    riskFactors: string[]
    opportunities: string[]
    comparableAssets: string[]
  }
}

export default function AIAssetDetailPage() {
  const params = useParams()
  const [asset, setAsset] = useState<AIAsset | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch AI asset details
    const fetchAsset = async () => {
      setLoading(true)
      try {
        // Mock data - in real app this would come from API
        const mockAsset: AIAsset = {
          id: params.id as string,
          title: "Abandoned Industrial Complex - Detroit",
          category: "Industrial Assets",
          image: "/abandoned-industrial-building.png",
          estimatedValue: "$2,400,000",
          location: "Detroit, Michigan, USA",
          description:
            "Large industrial complex identified through satellite imagery analysis and government records. The property spans 15 acres with multiple buildings totaling 200,000 sq ft of industrial space.",
          aiConfidence: 87,
          riskLevel: "Medium",
          pricePredict: "$3,200,000",
          dataSource: "Michigan State Property Records",
          aiTags: ["Renovation Potential", "Zoning Approved", "Infrastructure Access"],
          discoveredDate: "2024-01-15",
          detailedAnalysis: {
            marketTrends: [
              "Industrial real estate demand up 15% in Detroit metro",
              "Manufacturing reshoring driving industrial space needs",
              "Government incentives for industrial redevelopment",
            ],
            riskFactors: [
              "Environmental assessment required",
              "Structural integrity needs evaluation",
              "Zoning compliance verification needed",
            ],
            opportunities: [
              "Prime location near major transportation hubs",
              "Eligible for tax incentives and grants",
              "High demand for industrial space in area",
            ],
            comparableAssets: [
              "Similar industrial complex sold for $3.1M (2023)",
              "Renovated facility nearby valued at $4.2M",
              "Industrial land in area: $180/sq ft average",
            ],
          },
        }
        setAsset(mockAsset)
      } catch (error) {
        console.error("Failed to fetch asset:", error)
      } finally {
        setTimeout(() => setLoading(false), 1000)
      }
    }

    fetchAsset()
  }, [params.id])

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

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading AI asset analysis...</p>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="min-h-screen gradient-bg-subtle flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Asset not found</p>
          <Button asChild>
            <Link href="/discover">Back to Discover</Link>
          </Button>
        </div>
      </div>
    )
  }

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
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/discover" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Image and Basic Info */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
              <div className="relative">
                <Image
                  src={asset.image || "/placeholder.svg"}
                  alt={asset.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/20 text-primary border-primary/50 flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    AI Discovered
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50">
                    {asset.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl gradient-text">{asset.title}</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {asset.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-6">{asset.description}</p>

                {/* AI Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {asset.aiTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-muted/50 border-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Data Source */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <FileText className="w-4 h-4" />
                  <span>Discovered from: {asset.dataSource}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Discovery Date: {new Date(asset.discoveredDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Tabs */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Analysis & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="trends" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="trends">Market Trends</TabsTrigger>
                    <TabsTrigger value="risks">Risk Factors</TabsTrigger>
                    <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                    <TabsTrigger value="comparables">Comparables</TabsTrigger>
                  </TabsList>

                  <TabsContent value="trends" className="space-y-3">
                    {asset.detailedAnalysis.marketTrends.map((trend, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{trend}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="risks" className="space-y-3">
                    {asset.detailedAnalysis.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{risk}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="opportunities" className="space-y-3">
                    {asset.detailedAnalysis.opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{opportunity}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="comparables" className="space-y-3">
                    {asset.detailedAnalysis.comparableAssets.map((comparable, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <BarChart3 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{comparable}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Metrics */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Confidence Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Overall Confidence</span>
                    <span className="text-sm font-semibold text-primary">{asset.aiConfidence}%</span>
                  </div>
                  <Progress value={asset.aiConfidence} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <Badge className={getRiskColor(asset.riskLevel)}>{asset.riskLevel}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Quality</p>
                    <Badge className="text-green-400 border-green-400/50 bg-green-400/10">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Valuation */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Valuation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Estimate</p>
                  <p className="text-2xl font-bold text-foreground">{asset.estimatedValue}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Price Target (12 months)
                  </p>
                  <p className="text-xl font-semibold text-secondary">{asset.pricePredict}</p>
                </div>
                <div className="pt-4 border-t border-border/30">
                  <p className="text-sm text-muted-foreground">Potential ROI</p>
                  <p className="text-lg font-semibold text-chart-3">+33.3%</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full gradient-button-primary text-white font-medium">
                  <Link href={`/tokenize/${asset.id}`}>
                    <Zap className="w-4 h-4 mr-2" />
                    Tokenize Asset
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/validation">
                    <Shield className="w-4 h-4 mr-2" />
                    Submit for Verification
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Database className="w-4 h-4 mr-2" />
                  View Raw Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
