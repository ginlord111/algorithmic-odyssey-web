import { Bell } from "lucide-react";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserNotification } from "@/actions/actions";
import { Notifications } from "@prisma/client";
import NotificationList from "./NotificationList";
import { readNotification } from "@/actions/actions";
import { useRouter } from "next/navigation";
const Notification = ({ userId }: { userId: string }) => {
  const { data: notifs } = useQuery({
    queryKey: ["get-user-notification", userId],
    queryFn: () => fetchUserNotification(userId),
  });
  /// TODO: MAKE A GLOBAL STATE THAT TRACCK IF SOMEONE LIKE AND IF SO REVALIDATE THE GET USER NOTIFCATION FOR REALTIME NOTIF
  const queryClient = useQueryClient();
  const router = useRouter()
  const unReadNotif = notifs?.some((notif) => notif.isRead === false);
  const handleClickNotif = async(id:string, route:string) => {
    await readNotification(id);
    queryClient.invalidateQueries({ queryKey: ["get-user-notification"] });
    router.push(route)
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <Bell className="w-7 h-7" />
          {unReadNotif && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu className="w-fit" aria-label="Dynamic Actions" items={notifs}
      emptyContent={<p>You got 0 notification</p>}
      >
      {/* {unReadNotif && (
            <p className="text-lg font-bold">New notification</p>
        )} */}
          
          {(notif:Notifications) => {
               return (
                <DropdownItem key={notif.id} className="w-full p-5" onClick={()=>handleClickNotif(notif.id, notif.resourceId)}>
                    <NotificationList notif={notif} />

                 </DropdownItem>
               )
            
          }}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Notification;
