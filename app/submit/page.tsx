"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, MapPin, FileText, Camera, CheckCircle, ArrowRight, ArrowLeft, X, Plus } from "lucide-react"
import Link from "next/link"

export default function SubmitAssetPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    coordinates: "",
    estimatedValue: "",
    images: [] as File[],
    documents: [] as File[],
    tags: [] as string[],
    newTag: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const categories = [
    "Real Estate",
    "Agricultural Land",
    "Commercial Property",
    "Industrial Assets",
    "Art & Collectibles",
    "Commodities",
    "Infrastructure",
    "Other",
  ]

  const handleFileUpload = (files: FileList | null, type: "images" | "documents") => {
    if (!files) return
    const newFiles = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }))
  }

  const removeFile = (index: number, type: "images" | "documents") => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Simulate submission
    console.log("Submitting asset:", formData)
    alert("Asset submitted successfully! Our experts will review it within 24-48 hours.")
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
              <Link href="/submit" className="text-foreground font-medium">
                Submit Asset
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Submit Your Asset</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share hidden gems with our community. Upload asset details, documentation, and let our experts verify and
            tokenize your discovery.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Steps */}
        <Card className="bg-card/30 border-border/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && (
                <>
                  <FileText className="h-5 w-5" /> Basic Information
                </>
              )}
              {currentStep === 2 && (
                <>
                  <MapPin className="h-5 w-5" /> Location & Details
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Upload className="h-5 w-5" /> Upload Files
                </>
              )}
              {currentStep === 4 && (
                <>
                  <CheckCircle className="h-5 w-5" /> Review & Submit
                </>
              )}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your asset discovery"}
              {currentStep === 2 && "Provide location and additional details"}
              {currentStep === 3 && "Upload images and supporting documents"}
              {currentStep === 4 && "Review your submission before sending"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Asset Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Historic Warehouse in Downtown District"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select asset category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the asset, its current condition, potential uses, and why you think it's valuable..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedValue">Estimated Value (USD)</Label>
                  <Input
                    id="estimatedValue"
                    type="number"
                    placeholder="e.g., 250000"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData((prev) => ({ ...prev, estimatedValue: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location & Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location Address *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., 123 Main Street, City, State, Country"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="coordinates">GPS Coordinates (Optional)</Label>
                  <Input
                    id="coordinates"
                    placeholder="e.g., 40.7128, -74.0060"
                    value={formData.coordinates}
                    onChange={(e) => setFormData((prev) => ({ ...prev, coordinates: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add tags (e.g., historic, commercial, renovation)"
                      value={formData.newTag}
                      onChange={(e) => setFormData((prev) => ({ ...prev, newTag: e.target.value }))}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Upload Files */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Asset Images *</Label>
                  <div className="mt-2 border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Upload high-quality images of your asset</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, "images")}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Choose Images
                      </label>
                    </Button>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.images.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index, "images")}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Supporting Documents</Label>
                  <div className="mt-2 border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Upload deeds, permits, surveys, or other relevant documents
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileUpload(e.target.files, "documents")}
                      className="hidden"
                      id="document-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="document-upload" className="cursor-pointer">
                        Choose Documents
                      </label>
                    </Button>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index, "documents")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Submission Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Title:</strong> {formData.title || "Not provided"}
                    </div>
                    <div>
                      <strong>Category:</strong> {formData.category || "Not selected"}
                    </div>
                    <div>
                      <strong>Location:</strong> {formData.location || "Not provided"}
                    </div>
                    <div>
                      <strong>Estimated Value:</strong>{" "}
                      {formData.estimatedValue
                        ? `$${Number.parseInt(formData.estimatedValue).toLocaleString()}`
                        : "Not provided"}
                    </div>
                    <div>
                      <strong>Images:</strong> {formData.images.length} uploaded
                    </div>
                    <div>
                      <strong>Documents:</strong> {formData.documents.length} uploaded
                    </div>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="mt-4">
                      <strong>Tags:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">What happens next?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Our expert validators will review your submission within 24-48 hours</li>
                    <li>• We'll verify the asset details and documentation</li>
                    <li>• You'll receive updates on the validation progress</li>
                    <li>• Once approved, your asset will be available for tokenization</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="gradient-button-primary text-white flex items-center gap-2"
                  disabled={
                    (currentStep === 1 && (!formData.title || !formData.category || !formData.description)) ||
                    (currentStep === 2 && !formData.location) ||
                    (currentStep === 3 && formData.images.length === 0)
                  }
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="gradient-button-secondary text-background flex items-center gap-2"
                >
                  Submit Asset
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
