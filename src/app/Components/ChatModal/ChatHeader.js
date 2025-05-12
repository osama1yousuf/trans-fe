import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logo from '../../../assets/logo.png'
export function ChatHeader() {
  return (
    <div className="flex items-center sticky top-[8%] justify-between px-3 bg-emerald-600 text-white z-20 w-full">
      <div className="flex items-center gap-3">
        <Avatar className="h-14 w-14 border-1 border-white">
          <AvatarImage src={logo.src} alt="Group" />
          <AvatarFallback>TE</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">New Muhammadi Group</h2>
        </div>
      </div>
    </div>
  )
}

