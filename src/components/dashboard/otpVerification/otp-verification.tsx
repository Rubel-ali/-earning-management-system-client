"use client"

import type React from "react"

import { useState, useRef, type KeyboardEvent, type ChangeEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface OtpVerificationProps {
    email: string
    onVerify?: (otp: string) => void
}

export default function OtpVerification({ email, onVerify }: OtpVerificationProps) {
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 4)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value

        // Only allow one digit
        if (value.length > 1) return

        // Update the OTP array
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Move to next input if current input is filled
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text")

        // Only process if pasted content looks like an OTP
        if (!/^\d+$/.test(pastedData)) return

        const otpArray = pastedData.slice(0, 4).split("")
        const newOtp = [...otp]

        otpArray.forEach((digit, index) => {
            if (index < 5) {
                newOtp[index] = digit
            }
        })

        setOtp(newOtp)

        // Focus the next empty input or the last input
        const lastFilledIndex = Math.min(otpArray.length - 1, 3)
        if (lastFilledIndex < 4) {
            inputRefs.current[lastFilledIndex + 1]?.focus()
        } else {
            inputRefs.current[3]?.focus()
        }
    }

    const handleSubmit = () => {
        const otpString = otp.join("")
        if (otpString.length === 4) {
            onVerify?.(otpString)
        }
    }

    return (
        <div className="w-full max-w-md p-6">
            <h1 className="text-center text-2xl font-semibold text-green-600 mb-6">OTP Verification</h1>
            <p className="text-center text-sm text-gray-600 mb-6">We&apos;ve sent a code reset to: {email}</p>

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
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors"
            >
                Next
            </Button>
        </div>
    )
}
