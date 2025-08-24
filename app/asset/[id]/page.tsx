"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  Verified,
  Users,
  Calendar,
  DollarSign,
  Coins,
  Shield,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

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

export default function AssetDetailsPage() {
  const params = useParams()
  const [asset, setAsset] = useState<Asset | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAsset = async () => {
      setLoading(true)
      try {
        const response = await fetch("/data/assets.json")
        const assets = await response.json()
        const foundAsset = assets.find((a: Asset) => a.id === params.id)
        setAsset(foundAsset || null)
      } catch (error) {
        console.error("Failed to fetch asset:", error)
      } finally {
        setTimeout(() => setLoading(false), 800)
      }
    }

    if (params.id) {
      fetchAsset()
    }
  }, [params.id])

  if (loading) {
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
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!asset) {
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
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Asset Not Found</h1>
          <p className="text-muted-foreground mb-8">The asset you're looking for doesn't exist.</p>
          <Button
            asChild
            variant="outline"
            className="neon-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/discover">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Discover
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const tokenizationProgress = ((asset.totalTokens - asset.availableTokens) / asset.totalTokens) * 100

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
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button
                variant="outline"
                className="neon-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-muted-foreground hover:text-primary">
          <Link href="/discover">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discover
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Asset Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg neon-glow border border-border/50">
              <Image
                src={asset.image || "/placeholder.svg"}
                alt={asset.title}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                {asset.verified && (
                  <Badge className="bg-primary/20 text-primary border-primary/50 neon-glow">
                    <Verified className="w-4 h-4 mr-1" />
                    Verified Asset
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50">
                  {asset.category}
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-chart-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expected ROI</p>
                      <p className="font-semibold text-chart-4">{asset.roi}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Investors</p>
                      <p className="font-semibold text-primary">{asset.totalTokens - asset.availableTokens}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Asset Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary neon-text mb-2">{asset.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {asset.location}
              </div>
              <p className="text-foreground/80 leading-relaxed">{asset.description}</p>
            </div>

            <Separator className="bg-border/50" />

            {/* Financial Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-mono text-secondary">Financial Overview</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Asset Value</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{asset.currentValue}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Price per Token</span>
                  </div>
                  <p className="text-2xl font-bold text-secondary">{asset.tokenValue}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tokenization Progress</span>
                </div>
                <div className="space-y-2">
                  <Progress value={tokenizationProgress} className="h-3 neon-glow" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{asset.totalTokens - asset.availableTokens} tokens sold</span>
                    <span>{asset.availableTokens} remaining</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Tokenization Status */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-mono text-secondary">Tokenization Status</h3>

              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
                <span className="text-foreground">Active - Ready for Investment</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Fully verified and compliant</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Listed on January 15, 2024</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="w-full neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 animate-pulse-glow"
              >
                <Link href={`/tokenize/${asset.id}`}>
                  <Coins className="w-5 h-5 mr-2" />
                  Tokenize This Asset
                </Link>
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-2">Minimum investment: {asset.tokenValue}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-primary">Security & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>• SEC compliant tokenization</li>
                <li>• Third-party asset verification</li>
                <li>• Smart contract audited</li>
                <li>• Insurance coverage included</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-secondary">Investment Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>• Fractional ownership</li>
                <li>• 24/7 trading capability</li>
                <li>• Transparent pricing</li>
                <li>• Instant settlement</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-chart-3">Risk Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>• Market volatility</li>
                <li>• Liquidity considerations</li>
                <li>• Regulatory changes</li>
                <li>• Asset-specific risks</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
