'use client'
import { useState } from 'react'
import { Bell, Package, Truck, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function DeliveryWorkerDashboard() {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', address: '123 Main St', status: 'pending' },
    { id: 2, customer: 'Jane Smith', address: '456 Elm St', status: 'pending' },
    { id: 3, customer: 'Bob Johnson', address: '789 Oak St', status: 'pending' },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New delivery guidelines available', read: false },
    { id: 2, message: 'Schedule change for next week', read: false },
    { id: 3, message: 'Performance review upcoming', read: true },
  ])

  const handleOrderAction = (orderId, action) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: action } : order
    ))
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Delivery Worker" />
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, Delivery Worker</h1>
            <p className="text-muted-foreground">Ready for today's deliveries?</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Incoming Orders
            </CardTitle>
            <CardDescription>Manage your delivery requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {orders.map((order) => (
                <div key={order.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.address}</p>
                    </div>
                    <Badge variant={order.status === 'pending' ? 'outline' : (order.status === 'approved' ? 'success' : 'destructive')}>
                      {order.status}
                    </Badge>
                  </div>
                  {order.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleOrderAction(order.id, 'approved')}>Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => handleOrderAction(order.id, 'rejected')}>Reject</Button>
                    </div>
                  )}
                  <Separator className="my-2" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>Updates from the store owner</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <div key={notification.id} className="mb-4 last:mb-0">
                  <div className="flex items-start">
                    <Badge variant={notification.read ? 'outline' : 'default'} className="mt-1 mr-2">
                      {notification.read ? 'Read' : 'New'}
                    </Badge>
                    <p>{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <Button size="sm" variant="link" onClick={() => markNotificationAsRead(notification.id)}>
                      Mark as read
                    </Button>
                  )}
                  <Separator className="my-2" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="mr-2" />
            Delivery Summary
          </CardTitle>
          <CardDescription>Your performance at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold">15</h3>
              <p className="text-sm text-muted-foreground">Deliveries Today</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold">98%</h3>
              <p className="text-sm text-muted-foreground">On-Time Rate</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold">4.8</h3>
              <p className="text-sm text-muted-foreground">Customer Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}