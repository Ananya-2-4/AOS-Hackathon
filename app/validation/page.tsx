"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Clock, AlertCircle, XCircle, MapPin, Calendar, Shield, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ValidationAsset {
  id: string
  title: string
  category: string
  image: string
  location: string
  submittedBy: string
  submittedDate: string
  status: "pending" | "in-review" | "approved" | "rejected"
  progress: number
  assignedValidator: {
    name: string
    avatar: string
    expertise: string
    rating: number
  }
  validationSteps: {
    step: string
    status: "completed" | "in-progress" | "pending"
    completedDate?: string
    notes?: string
  }[]
  estimatedCompletion: string
  comments: {
    author: string
    avatar: string
    date: string
    message: string
    type: "info" | "warning" | "success" | "error"
  }[]
}

interface ExpertValidator {
  id: string
  name: string
  avatar: string
  expertise: string[]
  rating: number
  completedValidations: number
  activeValidations: number
  joinDate: string
  status: "online" | "offline" | "busy"
}

function ValidationCard({ asset }: { asset: ValidationAsset }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      case "in-review":
        return "text-blue-400 border-blue-400/50 bg-blue-400/10"
      case "pending":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "rejected":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "in-review":
        return <Eye className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={asset.image || "/placeholder.svg"}
          alt={asset.title}
          width={400}
          height={200}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(asset.status)} variant="outline">
            {getStatusIcon(asset.status)}
            <span className="ml-1 capitalize">{asset.status.replace("-", " ")}</span>
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-foreground">{asset.title}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {asset.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Validation Progress</span>
            <span className="text-foreground font-medium">{asset.progress}%</span>
          </div>
          <Progress value={asset.progress} className="h-2" />
        </div>

        {/* Assigned Validator */}
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={asset.assignedValidator.avatar || "/placeholder.svg"} />
            <AvatarFallback>{asset.assignedValidator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{asset.assignedValidator.name}</p>
            <p className="text-xs text-muted-foreground">{asset.assignedValidator.expertise}</p>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary">{asset.assignedValidator.rating}/5</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          {asset.validationSteps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {step.status === "completed" ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : step.status === "in-progress" ? (
                <Clock className="w-4 h-4 text-blue-400" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-muted" />
              )}
              <span className={step.status === "completed" ? "text-foreground" : "text-muted-foreground"}>
                {step.step}
              </span>
            </div>
          ))}
        </div>

        {/* Estimated Completion */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Est. completion: {asset.estimatedCompletion}</span>
        </div>

        <Button asChild className="w-full gradient-button-primary text-white font-medium">
          <Link href={`/validation/${asset.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function ValidatorCard({ validator }: { validator: ExpertValidator }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400"
      case "busy":
        return "bg-yellow-400"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={validator.avatar || "/placeholder.svg"} />
              <AvatarFallback>{validator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
                validator.status,
              )}`}
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-foreground">{validator.name}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">{validator.rating}/5 Rating</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Expertise */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Expertise</p>
          <div className="flex flex-wrap gap-1">
            {validator.expertise.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs bg-muted/50">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Completed</p>
            <p className="font-semibold text-foreground">{validator.completedValidations}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Active</p>
            <p className="font-semibold text-secondary">{validator.activeValidations}</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Expert since {new Date(validator.joinDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ValidationPage() {
  const [validationAssets, setValidationAssets] = useState<ValidationAsset[]>([])
  const [validators, setValidators] = useState<ExpertValidator[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending")

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)

      const assetsData: ValidationAsset[] = [
        {
          id: "val-1",
          title: "Historic Downtown Building",
          category: "Commercial Property",
          image: "/historic-downtown-building.png",
          location: "Portland, Oregon",
          submittedBy: "john.doe@email.com",
          submittedDate: "2024-01-15",
          status: "in-review",
          progress: 65,
          assignedValidator: {
            name: "Dr. Sarah Chen",
            avatar: "/professional-woman-diverse.png",
            expertise: "Commercial Real Estate",
            rating: 4.8,
          },
          validationSteps: [
            { step: "Document Review", status: "completed", completedDate: "2024-01-16" },
            { step: "Property Inspection", status: "completed", completedDate: "2024-01-18" },
            { step: "Legal Verification", status: "in-progress" },
            { step: "Market Analysis", status: "pending" },
            { step: "Final Approval", status: "pending" },
          ],
          estimatedCompletion: "Jan 25, 2024",
          comments: [
            {
              author: "Dr. Sarah Chen",
              avatar: "/professional-woman-diverse.png",
              date: "2024-01-18",
              message: "Property inspection completed. Building structure is sound with minor renovation needs.",
              type: "success",
            },
          ],
        },
        {
          id: "val-2",
          title: "Agricultural Land - Nebraska",
          category: "Agricultural Land",
          image: "/agricultural-farmland.png",
          location: "Lincoln County, Nebraska",
          submittedBy: "farm.investor@email.com",
          submittedDate: "2024-01-12",
          status: "pending",
          progress: 25,
          assignedValidator: {
            name: "Michael Rodriguez",
            avatar: "/professional-man.png",
            expertise: "Agricultural Assets",
            rating: 4.9,
          },
          validationSteps: [
            { step: "Document Review", status: "completed", completedDate: "2024-01-13" },
            { step: "Soil Analysis", status: "in-progress" },
            { step: "Water Rights Check", status: "pending" },
            { step: "Environmental Assessment", status: "pending" },
            { step: "Final Approval", status: "pending" },
          ],
          estimatedCompletion: "Jan 28, 2024",
          comments: [
            {
              author: "Michael Rodriguez",
              avatar: "/professional-man.png",
              date: "2024-01-13",
              message: "Initial documentation looks good. Proceeding with soil analysis.",
              type: "info",
            },
          ],
        },
        {
          id: "val-3",
          title: "Luxury Apartment Complex",
          category: "Real Estate",
          image: "/luxury-apartment-building.png",
          location: "Miami, Florida",
          submittedBy: "luxury.dev@email.com",
          submittedDate: "2024-01-10",
          status: "approved",
          progress: 100,
          assignedValidator: {
            name: "Jennifer Park",
            avatar: "/professional-asian-woman.png",
            expertise: "Residential Real Estate",
            rating: 4.7,
          },
          validationSteps: [
            { step: "Document Review", status: "completed", completedDate: "2024-01-11" },
            { step: "Property Inspection", status: "completed", completedDate: "2024-01-13" },
            { step: "Legal Verification", status: "completed", completedDate: "2024-01-15" },
            { step: "Market Analysis", status: "completed", completedDate: "2024-01-17" },
            { step: "Final Approval", status: "completed", completedDate: "2024-01-18" },
          ],
          estimatedCompletion: "Completed",
          comments: [
            {
              author: "Jennifer Park",
              avatar: "/professional-asian-woman.png",
              date: "2024-01-18",
              message: "All validation steps completed successfully. Asset approved for tokenization.",
              type: "success",
            },
          ],
        },
      ]

      const validatorsData: ExpertValidator[] = [
        {
          id: "exp-1",
          name: "Dr. Sarah Chen",
          avatar: "/professional-woman-diverse.png",
          expertise: ["Commercial Real Estate", "Property Law", "Market Analysis"],
          rating: 4.8,
          completedValidations: 127,
          activeValidations: 3,
          joinDate: "2023-03-15",
          status: "online",
        },
        {
          id: "exp-2",
          name: "Michael Rodriguez",
          avatar: "/professional-man.png",
          expertise: ["Agricultural Assets", "Environmental Law", "Soil Analysis"],
          rating: 4.9,
          completedValidations: 89,
          activeValidations: 2,
          joinDate: "2023-05-20",
          status: "busy",
        },
        {
          id: "exp-3",
          name: "Jennifer Park",
          avatar: "/professional-asian-woman.png",
          expertise: ["Residential Real Estate", "Construction", "Zoning"],
          rating: 4.7,
          completedValidations: 156,
          activeValidations: 4,
          joinDate: "2023-01-10",
          status: "online",
        },
        {
          id: "exp-4",
          name: "David Thompson",
          avatar: "/professional-older-man.png",
          expertise: ["Industrial Assets", "Infrastructure", "Engineering"],
          rating: 4.6,
          completedValidations: 203,
          activeValidations: 1,
          joinDate: "2022-11-05",
          status: "offline",
        },
      ]

      setValidationAssets(assetsData)
      setValidators(validatorsData)
      setTimeout(() => setLoading(false), 1000)
    }

    fetchData()
  }, [])

  const filteredAssets = validationAssets.filter((asset) => {
    if (activeTab === "all") return true
    return asset.status === activeTab
  })

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
              <Link href="/validation" className="text-foreground font-medium">
                Validation
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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Expert Validation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track asset verification progress and connect with expert validators ensuring quality and compliance
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/30">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pending
                </TabsTrigger>
                <TabsTrigger value="in-review" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  In Review
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approved
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Rejected
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="grid md:grid-cols-2 gap-6">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} className="bg-card/30 border-border/30">
                          <div className="p-6 space-y-4">
                            <div className="w-full h-32 bg-muted rounded animate-pulse" />
                            <div className="h-6 bg-muted rounded animate-pulse" />
                            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                            <div className="h-2 bg-muted rounded animate-pulse" />
                          </div>
                        </Card>
                      ))
                    : filteredAssets.map((asset) => <ValidationCard key={asset.id} asset={asset} />)}
                </div>

                {!loading && filteredAssets.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No assets found with {activeTab} status</p>
                  </div>
                )}
              </TabsContent>
            </div>

            {/* Sidebar - Expert Validators */}
            <div className="lg:w-80">
              <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Expert Validators
                  </CardTitle>
                  <CardDescription>Our certified validation experts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded animate-pulse">
                          <div className="w-12 h-12 bg-muted rounded-full" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded" />
                            <div className="h-3 bg-muted rounded w-3/4" />
                          </div>
                        </div>
                      ))
                    : validators.slice(0, 4).map((validator) => (
                        <div
                          key={validator.id}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={validator.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{validator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${
                                validator.status === "online"
                                  ? "bg-green-400"
                                  : validator.status === "busy"
                                    ? "bg-yellow-400"
                                    : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{validator.name}</p>
                            <p className="text-xs text-muted-foreground">{validator.expertise[0]}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Shield className="w-3 h-3 text-primary" />
                              <span className="text-xs text-primary">{validator.rating}/5</span>
                            </div>
                          </div>
                        </div>
                      ))}

                  <Button asChild className="w-full gradient-button-secondary text-background font-medium">
                    <Link href="/validators">View All Validators</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Validation Stats */}
              <Card className="bg-card/30 border-border/30 backdrop-blur-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Validation Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-muted/30 rounded">
                      <p className="text-2xl font-bold text-primary">
                        {validationAssets.filter((a) => a.status === "pending").length}
                      </p>
                      <p className="text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded">
                      <p className="text-2xl font-bold text-blue-400">
                        {validationAssets.filter((a) => a.status === "in-review").length}
                      </p>
                      <p className="text-muted-foreground">In Review</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-muted/30 rounded">
                      <p className="text-2xl font-bold text-green-400">
                        {validationAssets.filter((a) => a.status === "approved").length}
                      </p>
                      <p className="text-muted-foreground">Approved</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded">
                      <p className="text-2xl font-bold text-red-400">
                        {validationAssets.filter((a) => a.status === "rejected").length}
                      </p>
                      <p className="text-muted-foreground">Rejected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
