import {Loader2 } from "lucide-react";

export function LoadingSpinner(){
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-cols items-center space-y-4">
            <Loader2 className="text-primary animate-spin h-8 w-8"/>
            <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Loading..</h3>
            <p className="text-muted-foreground text-sm">
                Please Wait Untill We Load Your Content</p>
            </div>
            </div>
        </div>
    )
    
}