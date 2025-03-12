import { Phone, Video, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import logo from '../../../assets/logo.png'
export function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-3 bg-emerald-600 text-white">
      <div className="flex items-center gap-3">
        <Avatar className="h-14 w-14 border-1 border-white">
          <AvatarImage src={logo.src} alt="Group" />
          <AvatarFallback>TE</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">New Muhammadi Group</h2>
          {/* <p className="text-xs text-emerald-100">Alice, Bob, Charlie, David, You</p> */}
        </div>
      </div>
      {/* <div className="flex gap-4">
        <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
          <Video size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
          <Phone size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
          <MoreVertical size={20} />
        </Button>
      </div> */}
    </div>
  )
}

