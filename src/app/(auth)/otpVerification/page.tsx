/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, {
  useState,
  useRef,
  type KeyboardEvent,
  type ChangeEvent,
  useEffect,
} from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { useVerifyOtpMutation } from "@/redux/features/auth/userApi"

export default function OtpVerificationPage() {
  const searchParams = useSearchParams()
  const verifyEmail = searchParams.get("verify-email")
  const router = useRouter()

  const [otp, setOtp] = useState<string[]>(Array(4).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    if (!/^\d+$/.test(pastedData)) return

    const otpArray = pastedData.slice(0, 4).split("")
    const newOtp = [...otp]

    otpArray.forEach((digit, index) => {
      if (index < 4) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    const lastFilledIndex = Math.min(otpArray.length - 1, 3)
    if (lastFilledIndex < 4) {
      inputRefs.current[lastFilledIndex + 1]?.focus()
    } else {
      inputRefs.current[3]?.focus()
    }
  }

  const handleSubmit = async () => {
    const otpString = otp.join("")
    if (otpString.length === 4 && verifyEmail) {
      try {
        const payload: { email: string; otp: number } = {
          email: verifyEmail,
          otp: Number(otpString),
        }

        console.log("Sending payload:", payload)

        const result = await verifyOtp(payload).unwrap()
        console.log("Verification result:", result)

        toast.success("OTP verified successfully!")
        router.push(`/newPassword?new-password=${verifyEmail}`)
      } catch (err: any) {
        toast.error(err?.data?.message || "OTP verification failed!")
        console.error("OTP Error:", err)
      }
    } else {
      toast.error("Please enter a valid 4-digit OTP.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md p-6">
        <h1 className="text-center text-2xl font-semibold text-green-600 mb-6">
          OTP Verification
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          We&apos;ve sent a code reset to: {verifyEmail}
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors"
        >
          {isLoading ? "Verifying..." : "Next"}
        </Button>
      </div>
    </div>
  )
}
