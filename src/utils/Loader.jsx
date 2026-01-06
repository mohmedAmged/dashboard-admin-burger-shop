import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader({title}) {
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <Loader2 size={64} className="text-yellow animate-spin" />
                <h2 className="text-2xl font-modern-negra text-white">Loading {title}...</h2>
                <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-yellow animate-loading-bar" />
                </div>
            </div>
    </>
  )
}
