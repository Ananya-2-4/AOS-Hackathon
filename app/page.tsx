"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Upload, Coins, TrendingUp, Search, MapPin, Wallet, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnectWallet = async () => {
    // Simulate wallet connection
    try {
      // Mock wallet connection - in real app this would use Web3 provider
      const mockAddress = "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4"
      setWalletAddress(mockAddress)
      setIsWalletConnected(true)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
  }

  const handleLaunchApp = () => {
    // Navigate to the main app dashboard
    window.location.href = "/discover"
  }

  return (
    <div className="min-h-screen gradient-bg-subtle">
      {/* Navigation */}
      <nav className="border-b border-border/20 backdrop-blur-sm bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">RealWorldX</h1>
            </div>
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
              <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                Marketplace
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              {!isWalletConnected ? (
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent rounded-full px-6"
                  onClick={handleConnectWallet}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent rounded-full px-4"
                  onClick={handleDisconnectWallet}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                </Button>
              )}
              <Button
                className="gradient-button-secondary text-background rounded-full px-6 font-medium"
                onClick={handleLaunchApp}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Launch App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text leading-tight">
            Discover Hidden
            <br />
            Real-World Assets
          </h1>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Uncover overlooked properties, rural land, and undervalued assets through AI + Community + Experts. Tokenize
            hidden gems and make real estate investment accessible to everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gradient-button-primary text-white font-medium px-8 py-6 text-lg rounded-full border-0 hover:opacity-90 transition-opacity"
            >
              <Link href="/discover">
                <Search className="mr-2 h-5 w-5" />
                Discover Hidden Assets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="gradient-button-secondary text-background font-medium px-8 py-6 text-lg rounded-full border-0 hover:opacity-90 transition-opacity"
            >
              <Link href="/submit">
                <MapPin className="mr-2 h-5 w-5" />
                Submit Local Asset
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 rounded-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary text-xl">1. Upload & Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  Upload your asset documentation and complete our verification process to ensure authenticity and legal
                  compliance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 rounded-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Coins className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-secondary text-xl">2. Tokenize on Blockchain</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  Create digital tokens representing ownership shares of your real-world asset using secure blockchain
                  technology.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 rounded-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-chart-3" />
                </div>
                <CardTitle className="text-chart-3 text-xl">3. Trade & Manage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  Trade your tokens on our marketplace, track performance, and manage your digital asset portfolio with
                  ease.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">RealWorldX</h3>
              <p className="text-muted-foreground">
                Revolutionizing asset tokenization with cutting-edge blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/discover" className="hover:text-primary transition-colors">
                    Discover Assets
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-primary transition-colors">
                    Submit Asset
                  </Link>
                </li>
                <li>
                  <Link href="/validation" className="hover:text-primary transition-colors">
                    Validation
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-primary transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-primary transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Social</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 RealWorldX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
