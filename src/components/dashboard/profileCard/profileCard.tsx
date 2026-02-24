"use client"
import Image from "next/image"
import { MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetMeQuery } from "@/redux/features/auth/userApi"

export default function ProfileCard() {
    const { data, isLoading, error } = useGetMeQuery({})
    
    if (isLoading) return (
        <div className="max-w-8xl mx-auto p-4 font-sans">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <div className="bg-green-600 text-white rounded-lg px-8 p-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="h-6 w-40" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="w-20 h-10" />
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
    
    if (error) return (
        <div className="max-w-8xl mx-auto p-4 font-sans">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                Error loading profile data
            </div>
        </div>
    )

    const profileData = data?.data || {
        firstName: 'Johan',
        lastName: 'Smith',
        address: '27 Oak Street, Manchester',
        phone: '+09 3454 346 46',
        profileImage: '/dPerson.png'
    }

    return (
        <div className="max-w-8xl mx-auto p-4 font-sans">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>

            <div className="bg-green-600 text-white rounded-lg px-8 p-4 mb-6 flex justify-between items-center">
                <div className="flex justify-between items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white overflow-hidden flex-shrink-0">
                        <Image
                            src={profileData?.profileImage || '/dPerson.png'}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{`${profileData.firstName} ${profileData.lastName}`}</h2>
                    </div>
                </div>
                <div>
                    <div className="flex items-center text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                        <Phone className="w-4 h-4 mr-1" />
                        <span>{profileData.phoneNumber}</span>
                    </div>
                </div>
                <Link href={`/dashboard/profileEdit/${profileData.id}`}>
                    <Button className="bg-white w-20 text-black hover:bg-gray-100">Edit</Button>
                </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <div className="bg-green-50 p-3 rounded-md">{profileData.firstName}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <div className="bg-green-50 p-3 rounded-md">{profileData.lastName}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Your Location</label>
                        <div className="bg-green-50 p-3 rounded-md flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                            {profileData.location}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Your phone number</label>
                        <div className="bg-green-50 p-3 rounded-md flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-600" />
                            {profileData.phoneNumber}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

