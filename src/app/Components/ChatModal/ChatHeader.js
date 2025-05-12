import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logo from '../../../assets/logo.png'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { X } from "lucide-react";
import SearchableSelect from "../searchable-select";
export function ChatHeader({driverList, setDriverIds, driverIds}) {
  const [dropdown, setDropDown] = useState(false);

  return (
    <div className="flex items-center sticky top-[8%] justify-between px-4 bg-emerald-600 text-white z-20 w-full">
      {
        dropdown ?
          <div className="py-2 w-[75%] px-3">
            <SearchableSelect
              handleSelect={(val) => {
                const previousValue = driverIds || [];
                const newValue = previousValue.includes(val)
                  ? previousValue.filter((id) => id !== val)
                  : [...previousValue, val];
                  setDriverIds(newValue);
              }}
              driverIds={driverIds}
              options={
                driverList?.length > 0
                  ? driverList?.map((e) => {
                    return {
                      label: `${e?.firstName} ${e?.contactOne}`,
                      value: e?._id,
                    };
                  })
                  : []
              }
            />
          </div>
          :
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 border-1 border-white">
              <AvatarImage src={logo.src} alt="Group" />
              <AvatarFallback>TE</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">New Muhammadi Group</h2>
            </div>
          </div>
      }
      {
        !dropdown ?
          <MagnifyingGlassIcon onClick={() => setDropDown(true)} width={"20px"} height={"20px"} />
          :
          <X className="ml-auto" onClick={() => setDropDown(false)} width={"20px"} height={"20px"} />
      }
    </div>
  )
}

