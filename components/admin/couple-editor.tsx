"use client"

import type React from "react"
import type { User } from "@/lib/auth"
import type { RefObject } from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminHeader } from "@/components/admin/admin-header"
import { Heart, Save, Upload, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface CoupleEditorProps {
  user: User
}

export function CoupleEditor({ user }: CoupleEditorProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    loveStory: "",
    proposalStory: "", // Added proposalStory field
    bridePhotoUrl: "",
    groomPhotoUrl: "",
    couplePhotoUrl: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [uploadingStates, setUploadingStates] = useState({
    bridePhotoUrl: false,
    groomPhotoUrl: false,
    couplePhotoUrl: false,
  })

  const bridePhotoRef = useRef<HTMLInputElement>(null)
  const groomPhotoRef = useRef<HTMLInputElement>(null)
  const couplePhotoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchCoupleData()
  }, [])

  const fetchCoupleData = async () => {
    try {
      const response = await fetch("/api/content/couple")
      if (response.ok) {
        const data = await response.json()
        setFormData({
          brideName: data.brideName || "",
          groomName: data.groomName || "",
          loveStory: data.loveStory || "",
          proposalStory: data.proposalStory || "", // Added proposalStory to form data
          bridePhotoUrl: data.bridePhotoUrl || "",
          groomPhotoUrl: data.groomPhotoUrl || "",
          couplePhotoUrl: data.couplePhotoUrl || "",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load couple data",
        variant: "destructive",
      })
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/content/couple", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Couple information updated successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update couple information",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (field: string, file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file",
        variant: "destructive",
      })
      return
    }

    setUploadingStates((prev) => ({ ...prev, [field]: true }))

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setFormData((prev) => ({ ...prev, [field]: result.url }))
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Upload Failed",
          description: error.error || "Failed to upload image",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingStates((prev) => ({ ...prev, [field]: false }))
    }
  }

  const removePhoto = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: "" }))
  }

  const PhotoUploadArea = ({
    label,
    field,
    photoUrl,
    inputRef,
  }: {
    label: string
    field: string
    photoUrl: string
    inputRef: React.RefObject<HTMLInputElement | null>
  }) => (
    <div className="space-y-4">
      <Label className="text-foreground font-medium">{label}</Label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(field, file)
        }}
        className="hidden"
      />

      {photoUrl ? (
        <div className="relative border-2 border-border rounded-lg overflow-hidden">
          <Image
            src={photoUrl || "/placeholder.svg"}
            alt={label}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
              disabled={uploadingStates[field as keyof typeof uploadingStates]}
            >
              {uploadingStates[field as keyof typeof uploadingStates] ? (
                <>
                  <div className="w-4 h-4 mr-1 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1" />
                  Change
                </>
              )}
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={() => removePhoto(field)}>
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors ${
            uploadingStates[field as keyof typeof uploadingStates] ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => !uploadingStates[field as keyof typeof uploadingStates] && inputRef.current?.click()}
        >
          {uploadingStates[field as keyof typeof uploadingStates] ? (
            <>
              <div className="w-8 h-8 mx-auto mb-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload image</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF up to 5MB</p>
            </>
          )}
        </div>
      )}
    </div>
  )

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader user={user} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Couple Information</h1>
          <p className="text-muted-foreground">Update your names, photos, and love story.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brideName" className="text-foreground font-medium">
                    Bride's Name
                  </Label>
                  <Input
                    id="brideName"
                    value={formData.brideName}
                    onChange={(e) => handleInputChange("brideName", e.target.value)}
                    placeholder="Enter bride's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groomName" className="text-foreground font-medium">
                    Groom's Name
                  </Label>
                  <Input
                    id="groomName"
                    value={formData.groomName}
                    onChange={(e) => handleInputChange("groomName", e.target.value)}
                    placeholder="Enter groom's name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Love Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loveStory" className="text-foreground font-medium">
                  How We Met
                </Label>
                <Textarea
                  id="loveStory"
                  value={formData.loveStory}
                  onChange={(e) => handleInputChange("loveStory", e.target.value)}
                  placeholder="Tell how you met..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposalStory" className="text-foreground font-medium">
                  The Proposal
                </Label>
                <Textarea
                  id="proposalStory"
                  value={formData.proposalStory}
                  onChange={(e) => handleInputChange("proposalStory", e.target.value)}
                  placeholder="Tell your proposal story..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <PhotoUploadArea
                  label="Bride's Photo"
                  field="bridePhotoUrl"
                  photoUrl={formData.bridePhotoUrl}
                  inputRef={bridePhotoRef}
                />
                <PhotoUploadArea
                  label="Groom's Photo"
                  field="groomPhotoUrl"
                  photoUrl={formData.groomPhotoUrl}
                  inputRef={groomPhotoRef}
                />
                <PhotoUploadArea
                  label="Couple Photo"
                  field="couplePhotoUrl"
                  photoUrl={formData.couplePhotoUrl}
                  inputRef={couplePhotoRef}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
