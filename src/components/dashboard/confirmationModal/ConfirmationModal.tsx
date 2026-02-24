"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are You Sure?",
    description = "Do you want to log out?",
    confirmText = "Log Out",
    cancelText = "Cancel",
}: ConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[325px] mx-auto text-center justify-center rounded-lg">
                <div className="items-center text-center">
                    <div className="w-16 h-16 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center">
                        <span className="text-green-500 text-2xl font-bold">?</span>
                    </div>
                </div>
                <DialogHeader className="text-center mx-auto">
                    <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                    <DialogDescription className="text-gray-500 mt-2">{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center justify-center gap-4 mt-2">
                    <Button variant="destructive" onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white px-6">
                        {confirmText}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 px-6"
                    >
                        {cancelText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}