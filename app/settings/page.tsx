"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Monitor,
  Lock,
  LogOut,
  Save,
  Eye,
  EyeOff,
  X,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import JungleDecorations from "@/components/jungle-decorations"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = (section: string) => {
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: `Your ${section} settings have been updated successfully.`,
      })
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900/20 to-blue-900/20 pb-20">
      <JungleDecorations />

      {/* Settings Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Manage your account preferences, security, and personalization options
          </p>
        </div>
      </motion.div>

      {/* Settings Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Monitor className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Language</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock className="h-4 w-4 md:mr-0" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback className="bg-primary text-2xl">TG</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>

                    <div className="grid gap-4 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="TropicalGamer" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="display-name">Display Name</Label>
                          <Input id="display-name" defaultValue="Tropical Gamer" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="user@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="Passionate gamer who loves tropical-themed games. Always looking for new challenges and friends to play with!"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => handleSave("profile")} disabled={saving} className="gap-2">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input id="new-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => handleSave("password")} disabled={saving} className="gap-2">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">SMS Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a code via SMS to verify your identity
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate verification codes
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Email Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a code via email to verify your identity
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("2fa")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save 2FA Settings
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>Manage your active sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <Monitor className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Windows • Chrome • Miami, USA</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <Smartphone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-muted-foreground">iOS • BloxLucky App • Miami, USA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <LogOut className="h-3 w-3" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="w-full gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout from All Devices
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Manage your email notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Promotions and Offers</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about special offers and promotions
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Account Updates</div>
                      <div className="text-sm text-muted-foreground">Receive emails about your account activity</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">New Game Releases</div>
                      <div className="text-sm text-muted-foreground">Get notified when new games are released</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Friend Activity</div>
                      <div className="text-sm text-muted-foreground">Get notified about your friends' activity</div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("email notifications")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Email Preferences
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>Manage your push notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Game Invites</div>
                      <div className="text-sm text-muted-foreground">Get notified when someone invites you to play</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Bonuses and Rewards</div>
                      <div className="text-sm text-muted-foreground">Get notified about new bonuses and rewards</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Friend Requests</div>
                      <div className="text-sm text-muted-foreground">Get notified about new friend requests</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Tournament Updates</div>
                      <div className="text-sm text-muted-foreground">Get notified about tournament updates</div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("push notifications")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Push Preferences
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 5555</p>
                          <p className="text-sm text-muted-foreground">Expires 08/24</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Set Default
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <CreditCard className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>Manage your billing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Tropical Ave" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="Miami" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="Florida" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" defaultValue="33101" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("billing")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Billing Information
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Customize your visual experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <RadioGroup defaultValue="dark" className="grid grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="light" id="light" className="sr-only" />
                        <Label
                          htmlFor="light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Monitor className="mb-2 h-6 w-6 text-black" />
                          <span className="text-sm font-medium text-black">Light</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="dark" className="sr-only" />
                        <Label
                          htmlFor="dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 p-4 hover:bg-gray-900 hover:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Monitor className="mb-2 h-6 w-6 text-white" />
                          <span className="text-sm font-medium text-white">Dark</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="system" id="system" className="sr-only" />
                        <Label
                          htmlFor="system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-r from-white to-gray-950 p-4 hover:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Monitor className="mb-2 h-6 w-6" />
                          <span className="text-sm font-medium">System</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Animation Preferences</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Reduced Motion</div>
                        <div className="text-sm text-muted-foreground">Minimize animations for accessibility</div>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Game Effects</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Visual Effects</div>
                        <div className="text-sm text-muted-foreground">Enable visual effects in games</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("appearance")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Appearance Settings
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Language Settings */}
          <TabsContent value="language" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Language & Region</CardTitle>
                  <CardDescription>Customize your language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Display Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select defaultValue="na">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="na">North America</SelectItem>
                        <SelectItem value="sa">South America</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                        <SelectItem value="as">Asia</SelectItem>
                        <SelectItem value="oc">Oceania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                        <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                        <SelectItem value="cad">Canadian Dollar (CAD)</SelectItem>
                        <SelectItem value="aud">Australian Dollar (AUD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("language")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Language Settings
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Profile Visibility</div>
                      <div className="text-sm text-muted-foreground">Control who can see your profile</div>
                    </div>
                    <Select defaultValue="friends">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Activity Status</div>
                      <div className="text-sm text-muted-foreground">Show when you're online</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Game Activity</div>
                      <div className="text-sm text-muted-foreground">Show what games you're playing</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Friend Requests</div>
                      <div className="text-sm text-muted-foreground">Control who can send you friend requests</div>
                    </div>
                    <Select defaultValue="everyone">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends-of-friends">Friends of Friends</SelectItem>
                        <SelectItem value="nobody">Nobody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Data Collection</div>
                      <div className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve your experience
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave("privacy")} disabled={saving} className="gap-2 w-full">
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Privacy Settings
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Deletion</CardTitle>
                  <CardDescription>Permanently delete your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <X className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-medium text-destructive">Warning: This action is irreversible</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Deleting your account will permanently remove all your data, including your profile, game
                            history, purchases, and balance. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="confirm-deletion" className="rounded border-input h-4 w-4" />
                      <Label htmlFor="confirm-deletion" className="text-sm">
                        I understand that this action is permanent and cannot be undone
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="w-full gap-2">
                    <X className="h-4 w-4" />
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function toast(arg0: { title: string; description: string }) {
  throw new Error("Function not implemented.")
}

