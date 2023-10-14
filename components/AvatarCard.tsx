import { IUsers } from "@/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


export default function AvatarCard({ user, hoverable = true }: { user: IUsers, hoverable?: boolean }) {
  return (
    hoverable ? 
    <HoverCard>
      <HoverCardTrigger>
        <Avatar className={`h-7 w-7 transition-all cursor-pointer border ${hoverable && 'hover:h-8 hover:w-8'}`}>
          <AvatarImage src={user.image} alt="user image" />
          <AvatarFallback className="text-sm">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image} alt="user image" />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p>
              {user.name}
            </p>
            <a className="text-xs text-zinc-500 underline hover:text-teal-500 cursor-pointer" href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
    : 
    <Avatar className={`h-7 w-7 transition-all border`}>
      <AvatarImage src={user.image} alt="user image" />
      <AvatarFallback className="text-sm">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}