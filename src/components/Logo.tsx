import { Gift, Sparkles } from "lucide-react"

const Logo = () => {
    return (
        <div className="flex justify-center mb-8">
            <div className="relative">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <Gift className="absolute -top-2 -right-2 w-6 h-6 text-indigo-400 animate-float" />
            </div>
        </div>
    )
}

export default Logo