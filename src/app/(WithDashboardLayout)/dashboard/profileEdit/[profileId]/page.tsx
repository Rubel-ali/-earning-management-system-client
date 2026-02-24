"use client"
import ProfileEditForm from "@/components/dashboard/profileCard/profileEdit"
import { useGetMeQuery } from "@/redux/features/auth/userApi"



export default function ProfileEditPage() {


    const { data: profileData, refetch } = useGetMeQuery({})


    return <ProfileEditForm data={profileData?.data} refetch={refetch} />
}
