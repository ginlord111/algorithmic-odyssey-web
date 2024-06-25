import timeDiff from '@/utils/timeCalc';
import { Avatar, DropdownItem } from '@nextui-org/react'
import { Notifications } from '@prisma/client'
import React, { useMemo } from 'react'

const NotificationList = ({notif}:{notif:Notifications,}) => {
  const timeDiffCalc = useMemo(() => {
    return timeDiff(notif.createdAt);
  }, [notif.createdAt]);
  return (
    <div className="flex flex-row items-start gap-3">
      <Avatar showFallback src={notif.fromUserImage} size="md" />
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="text-muted-foreground">{timeDiffCalc}</p>
        <p className="inline-block">
          <strong>{notif.fromUsername} </strong>{notif.type === "like" ? "just liked your post!" : "just commented on your post!"}
        </p>
      </div>
       {notif.isRead === false && (
    <p className="text-md text-muted-foreground">Unread</p>
)}
    </div>

  )
}

export default NotificationList