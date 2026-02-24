/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { MapPin, Phone, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useUpdateUserMutation } from "@/redux/features/auth/userApi"

interface ProfileEditFormProps {
  data: {
    firstName?: string
    lastName?: string
    location?: string
    phoneNumber?: string
  }
  refetch: () => Promise<any> 
}

export default function ProfileEditForm({data, refetch}: ProfileEditFormProps) {

  const [updateUser] = useUpdateUserMutation()

  console.log(data)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    phoneNumber: '',
    profilePicture: null as File | null
  })

  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  if (data) {
    setFormData({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      location: data.location || '',
      phoneNumber: data.phoneNumber || '',
      profilePicture: null
    })
    setIsLoading(false)
  }
}, [data])

if (isLoading) return <div>Loading...</div>

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profilePicture: e.target.files![0] }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, profilePicture: e.dataTransfer.files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const payload = new FormData()
  
      // Add JSON string inside "text"
      payload.append('text', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
      }))
  
      // Add file inside "file"
      if (formData.profilePicture) {
        payload.append('file', formData.profilePicture)
      }
  
      await updateUser(payload).unwrap()
  
      if (typeof refetch === 'function') {
        await refetch()
      } else {
        console.error('refetch is not a function')
      }
    } catch (error) {
      console.error('Failed to update Post status:', error)
    }
  }
  
  

  return (
    <div className="max-w-8xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Edit</h1>

      <form onSubmit={handleSubmit} className=" rounded-lg shadow-sm p-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="bg-green-50 border-0"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="bg-green-50 border-0"
            />
          </div>

          {/* Your Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Your Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-green-50 border-0 pl-10"
              />
            </div>
          </div>

          {/* Your phone number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
              Your phone number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="bg-green-50 border-0 pl-10"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <div
              className="bg-green-50 p-6 rounded-md flex items-center justify-center border-2 border-dashed border-gray-200"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-5 h-5 text-blue-500" />
                </div>
                <label htmlFor="profilePicture" className="cursor-pointer">
                  <span className="text-blue-500 font-medium hover:underline">Click to upload</span>
                  <span className="text-gray-700"> or drag & drop</span>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">Max resolution 200×200px</p>
                {formData.profilePicture && (
                  <p className="text-sm text-green-600 mt-2">Selected: {formData.profilePicture.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}