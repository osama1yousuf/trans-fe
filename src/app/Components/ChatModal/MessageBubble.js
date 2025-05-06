// import { format } from "date-fns";
// import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MessageBubble({ message }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12
    return `${hours}:${minutes} ${ampm}`;
  };
  const myId = JSON.parse(localStorage.getItem("user"))._id;
  const userType = localStorage.getItem("userType");
  const isMe =
    userType === "SUPERADMIN"
      ? message?.adminId === myId
      : message?.driverId === myId;
  console.log("message", message, isMe);

  return (
    <div
      className={cn(
        "flex items-end gap-2 max-w-[80%]",
        isMe ? "ml-auto justify-end" : "mr-auto"
      )}
    >
      {!isMe && (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={message?.driver !== null && message?.driver?.image}
            alt={"user"}
          />
          <AvatarFallback>
            {message?.driver !== null
              ? message?.driver?.firstName[0]
              : message?.admin?.firstName[0]}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg p-3 relative",
          isMe ? "bg-emerald-100" : "bg-white"
        )}
      >
        <p className="text-xs font-medium text-emerald-600 mb-1">
          {message?.admin
            ? message?.admin?.firstName
            : message?.driver?.firstName}
            {/* Test */}
        </p>
        <p className="text-sm">{message.body}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[10px] text-gray-500">
            {formatTime(message.createdAt)}
          </span>
          {/* {isMe && (
            <span className="text-emerald-600">
              {message.status === "read" ? <CheckCheck size={14} /> : <Check size={14} />}
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
}
