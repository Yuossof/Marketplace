'use client'
import { useEffect, useState } from 'react'
import { User, Briefcase, Heart, MoreVertical, ArrowRight, ParkingSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface NotificationType {
    id: string,
    username: string,
    useremail: string,
    title: string,
    description: string,
    createdAt: Date,
    phoneNumber: string,
    markAsRead: boolean,
    userId: string
}


export default function NotificationBox({ storeId }: {storeId: string}) {
      const [notifications, setNotifications] = useState<NotificationType[]>([])
      const [acceptLoading, setAcceptLoading] = useState(false)
    useEffect(()=> {
        const getNotifications = async () => {
            const response = await axios.get(`http://localhost:3000/api/store/delivery/${storeId}`)
            const data = response.data
           setNotifications(data as NotificationType[])
        }
        getNotifications()
    }, [])

    const acceptDeliveryJob = async (deliveryWorkerId: string) => {
        try {
            setAcceptLoading(true)
            await axios.put("http://localhost:3000/api/store/delivery", {
                storeId: storeId,
                deliveryWorkerId: deliveryWorkerId
            })
            setAcceptLoading(false)
        } catch (error) {
           console.log("something went wroooong")
        }
    }





    return (
        <div className="w-[400px]  bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <Badge variant="secondary">3 Unread</Badge>
            </div>
            <ScrollArea className="h-[400px]">
                {false ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No new notifications</p>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {notifications.map((item) => (
                            <li key={item.id} className={`flex items-start ${acceptLoading ? "opacity-55" : ""} space-x-2 hover:bg-slate-100 transition-[0.1s] p-3 ${true ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}`}>
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                    {/* <AvatarImage src={notification.avatar} alt={notification.sender} />
                                                 */}
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium truncate">{item.username}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">1/1</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold truncate text-green-500">{item.title}</p>
                                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={()=>acceptDeliveryJob(item.userId)}>
                                            Accept
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Mark as {true ? 'unread' : 'read'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ))}
                    </ul>
                )}
            </ScrollArea>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                    className="w-full flex items-center justify-center"
                    variant="outline"
                >
                    Show All Messages
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}