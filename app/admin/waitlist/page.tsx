"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Mail, Calendar, Users, Loader2 } from "lucide-react"
import { waitlistApi, type WaitlistEntry } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Using WaitlistEntry from API types

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "invited" | "joined">("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadWaitlistEntries()
  }, [])

  const loadWaitlistEntries = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await waitlistApi.getWaitlistEntries(1, 1000) // Get all entries
      
      if (response.error) {
        // Check if it's an authentication error
        if (response.status === 401) {
          toast({
            title: "Authentication required",
            description: "Please log in to access this page",
            variant: "destructive"
          })
          return
        }
        
        setError(response.error)
        toast({
          title: "Error loading waitlist",
          description: response.error,
          variant: "destructive"
        })
        return
      }

      if (response.data) {
        setEntries(response.data.items)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load waitlist"
      setError(errorMessage)
      toast({
        title: "Error loading waitlist",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || entry.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: entries.length,
    pending: entries.filter(e => e.status === "pending").length,
    invited: entries.filter(e => e.status === "invited").length,
    joined: entries.filter(e => e.status === "joined").length
  }

  const exportCSV = () => {
    const csv = [
      ["Email", "Date", "Status", "Queue Position", "UTM Source"],
      ...filteredEntries.map(e => [
        e.email, 
        new Date(e.created_at).toLocaleDateString(), 
        e.status, 
        e.queue_position.toString(),
        e.utm_source || ''
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "waitlist.csv"
    a.click()
  }

  const updateStatus = async (email: string, newStatus: string) => {
    try {
      const response = await waitlistApi.updateWaitlistStatus(email, newStatus)
      
      if (response.error) {
        toast({
          title: "Error updating status",
          description: response.error,
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Status updated",
        description: `Successfully updated status for ${email}`
      })
      
      // Reload the entries
      loadWaitlistEntries()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update status"
      toast({
        title: "Error updating status",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Waitlist</h1>
          <p className="text-muted-foreground">
            Manage users waiting to join your platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadWaitlistEntries} variant="outline" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Refresh
          </Button>
          <Button onClick={exportCSV} variant="outline" disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invited</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.invited}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Joined</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.joined}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>
            A list of all users who have joined your waitlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 border border-red-200 bg-red-50 rounded-lg text-red-700">
              <p className="font-medium">Error loading waitlist:</p>
              <p>{error}</p>
              <Button 
                onClick={loadWaitlistEntries} 
                variant="outline" 
                size="sm" 
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          )}
          
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                disabled={loading}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "invited" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("invited")}
              >
                Invited
              </Button>
              <Button
                variant={filterStatus === "joined" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("joined")}
              >
                Joined
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading waitlist entries...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Queue Position</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>UTM Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.email}</TableCell>
                    <TableCell>#{entry.queue_position}</TableCell>
                    <TableCell>{new Date(entry.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{entry.utm_source || '-'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          entry.status === "joined" ? "default" :
                          entry.status === "invited" ? "secondary" :
                          "outline"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {entry.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(entry.email, "invited")}
                          >
                            Invite
                          </Button>
                        )}
                        {entry.status === "invited" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(entry.email, "joined")}
                          >
                            Mark Joined
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && filteredEntries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {entries.length === 0 ? "No waitlist entries yet" : "No entries match your search"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
