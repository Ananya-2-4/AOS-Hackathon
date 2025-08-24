"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ArrowRight,
  Wallet,
  Coins,
  CheckCircle,
  Loader2,
  ExternalLink,
  Copy,
  Sparkles,
  Shield,
  Zap,
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

export default function TokenizationWizardPage() {
  const params = useParams()
  const [asset, setAsset] = useState<Asset | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [tokenAmount, setTokenAmount] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [tokenizing, setTokenizing] = useState(false)
  const [tokenizationProgress, setTokenizationProgress] = useState(0)
  const [transactionHash, setTransactionHash] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

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

  const handleConnectWallet = async () => {
    setWalletConnected(false)
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true)
      setCurrentStep(3)
    }, 2000)
  }

  const handleTokenize = async () => {
    setTokenizing(true)
    setTokenizationProgress(0)

    console.log("[v0] Initializing aOS SDK and CW721 NFT ADO contract...")

    // Simulate aOS SDK initialization
    setTimeout(() => {
      console.log("[v0] aOS SDK initialized, connecting to Andromeda chain...")
      setTokenizationProgress(15)
    }, 200)

    // Simulate ADO contract deployment and minting process
    const interval = setInterval(() => {
      setTokenizationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTokenizing(false)
          setTransactionHash("0xado" + Math.random().toString(16).substr(2, 60))
          setShowConfetti(true)
          setCurrentStep(4)
          console.log("[v0] CW721 NFT ADO minting completed successfully")
          return 100
        }

        if (prev === 15) {
          console.log("[v0] Deploying CW721 NFT ADO contract...")
        } else if (prev >= 30 && prev < 35) {
          console.log("[v0] Setting up asset metadata on Arweave...")
        } else if (prev >= 50 && prev < 55) {
          console.log("[v0] Minting fractionalized NFT tokens...")
        } else if (prev >= 75 && prev < 80) {
          console.log("[v0] Registering tokens in ADO marketplace...")
        }

        return prev + Math.random() * 15
      })
    }, 300)
  }

  const copyTransactionHash = () => {
    navigator.clipboard.writeText(transactionHash)
  }

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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!asset) {
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Asset Not Found</h1>
          <p className="text-muted-foreground mb-8">The asset you're trying to tokenize doesn't exist.</p>
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

  const totalCost = tokenAmount * Number.parseInt(asset.tokenValue.replace(/[$,]/g, ""))

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-muted-foreground hover:text-primary">
          <Link href={`/asset/${asset.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Asset Details
          </Link>
        </Button>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold font-mono text-primary neon-text">Tokenization Wizard</h1>
            <div className="text-sm text-muted-foreground">Step {currentStep} of 4</div>
          </div>

          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-primary text-primary-foreground neon-glow"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-primary neon-glow" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Confirm</span>
            <span>Connect</span>
            <span>Tokenize</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm neon-glow">
          {/* Step 1: Asset Confirmation */}
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="font-mono text-primary flex items-center">
                  <Coins className="w-5 h-5 mr-2" />
                  Confirm Asset Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={asset.image || "/placeholder.svg"}
                      alt={asset.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{asset.title}</h3>
                      <p className="text-muted-foreground">{asset.location}</p>
                      <Badge variant="secondary" className="mt-2">
                        {asset.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asset Value:</span>
                        <span className="font-semibold">{asset.currentValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per Token:</span>
                        <span className="font-semibold text-secondary">{asset.tokenValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Available Tokens:</span>
                        <span className="font-semibold">{asset.availableTokens}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-4">
                  <Label htmlFor="tokenAmount" className="text-foreground font-semibold">
                    Number of Tokens to Purchase
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="tokenAmount"
                      type="number"
                      min="1"
                      max={asset.availableTokens}
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:neon-glow"
                    />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-xl font-bold text-secondary">${totalCost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Continue to Wallet Connection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: Wallet Connection */}
          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="font-mono text-primary flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Your Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
                    <Wallet className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect your wallet to proceed with the tokenization process
                  </p>

                  {!walletConnected ? (
                    <Button
                      onClick={handleConnectWallet}
                      disabled={walletConnected}
                      className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
                    >
                      {walletConnected ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect Wallet
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-chart-4">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Wallet Connected Successfully</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">Connected Address:</p>
                        <p className="font-mono text-foreground">0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-border/50 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  {walletConnected && (
                    <Button
                      onClick={() => setCurrentStep(3)}
                      className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Proceed to Tokenization
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </>
          )}

          {/* Step 3: Tokenization Process */}
          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="font-mono text-primary flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Tokenization in Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow animate-pulse-glow">
                    {tokenizing ? (
                      <Loader2 className="w-12 h-12 text-secondary animate-spin" />
                    ) : (
                      <Zap className="w-12 h-12 text-secondary" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {tokenizing ? "Processing Transaction..." : "Ready to Tokenize"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {tokenizing
                      ? "Please wait while we process your tokenization request"
                      : "Review your purchase details and confirm the transaction"}
                  </p>

                  {tokenizing && (
                    <div className="space-y-4 mb-6">
                      <Progress value={tokenizationProgress} className="h-4 neon-glow" />
                      <p className="text-sm text-muted-foreground">{tokenizationProgress.toFixed(0)}% Complete</p>
                    </div>
                  )}

                  <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                    <h4 className="font-semibold text-foreground mb-2">Transaction Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asset:</span>
                        <span className="text-foreground">{asset.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tokens:</span>
                        <span className="text-foreground">{tokenAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per Token:</span>
                        <span className="text-foreground">{asset.tokenValue}</span>
                      </div>
                      <Separator className="bg-border/50" />
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Total:</span>
                        <span className="text-secondary">${totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {!tokenizing && (
                    <Button
                      onClick={handleTokenize}
                      className="neon-glow bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-3 animate-pulse-glow"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Confirm & Tokenize
                    </Button>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    disabled={tokenizing}
                    className="border-border/50 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle className="font-mono text-chart-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Tokenization Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="animate-bounce">
                        <Sparkles className="w-6 h-6 text-secondary absolute top-4 left-1/4" />
                        <Sparkles className="w-4 h-4 text-primary absolute top-8 right-1/3" />
                        <Sparkles className="w-5 h-5 text-chart-3 absolute top-12 left-1/2" />
                      </div>
                    </div>
                  )}

                  <div className="w-24 h-24 bg-chart-4/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
                    <CheckCircle className="w-12 h-12 text-chart-4" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h3>
                  <p className="text-muted-foreground mb-6">
                    You have successfully tokenized {tokenAmount} tokens of {asset.title}
                  </p>

                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-foreground mb-4">Transaction Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction Hash:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-foreground text-xs">
                            {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyTransactionHash}
                            className="h-6 w-6 p-0 hover:bg-primary/20"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NFT Tokens Minted:</span>
                        <span className="text-foreground font-semibold">{tokenAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contract Type:</span>
                        <span className="text-secondary font-semibold">CW721 NFT ADO</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Paid:</span>
                        <span className="text-secondary font-semibold">${totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-chart-4 font-semibold">Minted & Confirmed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      <Link href="/dashboard">
                        <Coins className="w-4 h-4 mr-2" />
                        View in Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="neon-glow border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Explorer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
