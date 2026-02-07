import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetAllAppointments } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, LogIn, Shield } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminAppointmentsPage() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: appointments, isLoading, error } = useGetAllAppointments();

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              Please sign in with Internet Identity to access the appointments dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="w-full"
              size="lg"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated but loading
  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Error (likely unauthorized)
  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive" className="mx-auto max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You are not authorized to view appointments. Only admin users can access this page.
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button onClick={handleLogout} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // Success - show appointments
  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and view all appointment requests
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Sign Out
        </Button>
      </div>

      {appointments && appointments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No appointments yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Appointments ({appointments?.length || 0})</CardTitle>
            <CardDescription>
              View all customer appointment requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Device & Contact</TableHead>
                    <TableHead>Issue Details</TableHead>
                    <TableHead>Preferred Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments?.map(([principal, id, appointment]) => {
                    // Parse the serialized data
                    const deviceParts = appointment.deviceType.split(' | ');
                    const deviceModel = deviceParts[0] || '';
                    const phone = deviceParts[1]?.replace('Phone: ', '') || '';

                    const issueParts = appointment.issueDescription.split(' | ');
                    const issue = issueParts[0]?.replace('Issue: ', '') || '';
                    const location = issueParts[1]?.replace('Location: ', '') || '';
                    const time = issueParts[2]?.replace('Time: ', '') || '';
                    const notes = issueParts[3]?.replace('Notes: ', '') || '';

                    return (
                      <TableRow key={`${principal.toString()}-${id}`}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.customerName}</p>
                            <p className="text-sm text-muted-foreground">{phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{deviceModel}</p>
                            <p className="text-sm text-muted-foreground">{location}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{issue}</p>
                            {notes && (
                              <p className="text-sm text-muted-foreground">{notes}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.preferredDate}</p>
                            <p className="text-sm text-muted-foreground">{time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appointment.status === 'Pending'
                                ? 'secondary'
                                : 'default'
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

