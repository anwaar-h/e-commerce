"use client"
import Link from "next/link"
import { Search, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {

    return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
            <div className="flex justify-center">
            <div className="h-32 w-32 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-16 w-16 text-muted-foreground" />
            </div>
            </div>
        </div>

        {/* Error Content */}
        <div className="space-y-3">
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <p className="text-sm text-muted-foreground">
            The page might have been moved, deleted, or the URL might be incorrect.
            </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
            <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
            </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
            </Button>
        </div>

        {/* Help Link */}
        <div className="text-sm text-muted-foreground">
            <p>
            Still need help?{" "}
            <Link 
                href="/contact" 
                className="text-primary hover:underline"> 
            Contact our support team
            </Link>
            </p>
        </div>
        </div>
    </div>
    )
}