"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@clerk/nextjs"

export function KycPopupForm({
  user,
  needsKyc,
}: {
  user?: { id: string; firstName?: string; lastName?: string; email?: string }
  needsKyc: boolean
}) {
  const { user: clerkUser, isLoaded } = useUser()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    groupName: "",
    bvn: "",
    nin: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)

  // Show popup only if server said user needs KYC
  useEffect(() => {
    if (!open) return
  
    const fetchKyc = async () => {
      try {
        const res = await fetch("/api/kyc")
        if (res.ok) {
          const data = await res.json()
          if (data) {
            setFormData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              groupName: data.groupName || "",
              bvn: data.bvn || "",
              nin: data.nin || "",
              phone: data.phone || "",
            })
          }
        }
      } catch (err) {
        console.error("Error loading KYC:", err)
      }
    }
  
    fetchKyc()
  }, [open])
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        console.log("KYC info saved to Clerk ✅")

        // Refresh Clerk user metadata client-side
        if (clerkUser && isLoaded) {
          await clerkUser.reload()
          console.log("Updated Clerk publicMetadata:", clerkUser.publicMetadata)
        }

        setOpen(false) // close popup
      } else {
        console.error("Failed to save KYC")
      }
    } catch (err) {
      console.error("Error saving KYC:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Complete Your Ajo/Esusu KYC</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input id="groupName" name="groupName" value={formData.groupName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="bvn">BVN</Label>
            <Input id="bvn" name="bvn" value={formData.bvn} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="nin">NIN</Label>
            <Input id="nin" name="nin" value={formData.nin} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
