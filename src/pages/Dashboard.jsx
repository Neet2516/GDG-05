import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getCurrentUser, logout, isAuthenticated } from '@/utils/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground">HealthSnap</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-muted-foreground">Here's your dashboard overview</p>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">@{user.username}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">{user.age}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium capitalize">{user.sex.replace(/-/g, ' ')}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{user.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">Active</p>
                      <p className="text-sm text-muted-foreground">Your account is active</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Member Since</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-auto py-4 flex flex-col items-start" variant="outline">
                    <span className="font-semibold">Edit Profile</span>
                    <span className="text-sm text-muted-foreground">
                      Update your information
                    </span>
                  </Button>
                  
                  <Button className="h-auto py-4 flex flex-col items-start" variant="outline">
                    <span className="font-semibold">Settings</span>
                    <span className="text-sm text-muted-foreground">
                      Manage your preferences
                    </span>
                  </Button>
                  
                  <Button className="h-auto py-4 flex flex-col items-start" variant="outline">
                    <span className="font-semibold">Health Records</span>
                    <span className="text-sm text-muted-foreground">
                      View your health data
                    </span>
                    
                  </Button>
                  
                  <Button className="h-auto py-4 flex flex-col items-start" variant="outline">
                    <span className="font-semibold">Appointments</span>
                    <span className="text-sm text-muted-foreground">
                      Schedule and manage
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
