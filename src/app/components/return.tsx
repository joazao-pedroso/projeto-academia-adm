import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Return(){
    const router = useRouter();
    return(
        <div onClick={() => router.push('/')} className="w-12 h-12 rounded-[50%] flex items-center justify-center cursor-pointer hover:animate-bounce absolute top-10 left-39 border-2 bg-black border-gray-200">
            <MoveLeft className="text-gray-200 text-xl" />
        </div>
    )
}