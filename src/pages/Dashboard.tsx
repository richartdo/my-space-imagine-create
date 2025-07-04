
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Plus, Edit, Trash2, Share, Download } from "lucide-react";

const Dashboard = () => {
  const [designs] = useState([
    {
      id: 1,
      title: "Modern Living Room",
      category: "Living Room",
      updatedAt: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Cozy Kitchen Design",
      category: "Kitchen",
      updatedAt: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Minimalist Bedroom",
      category: "Bedroom",
      updatedAt: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=200&fit=crop"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Design Studio</h1>
          <p className="text-lg text-gray-600">Manage and create your space designs</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Link to="/design">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 border-purple-300 hover:border-purple-400">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">New Design</h3>
                <p className="text-sm text-gray-600 mt-1">Start fresh</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/proposals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Browse Ideas</h3>
                <p className="text-sm text-gray-600 mt-1">Get inspired</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Upload Photo</h3>
              <p className="text-sm text-gray-600 mt-1">From image</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Share className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Collaborate</h3>
              <p className="text-sm text-gray-600 mt-1">Invite others</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Designs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Designs</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <Card key={design.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={design.thumbnail} 
                      alt={design.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-white/90 text-gray-700">
                      {design.category}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{design.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">Updated {design.updatedAt}</p>
                    
                    <div className="flex justify-between items-center">
                      <Link to={`/design/${design.category.toLowerCase().replace(' ', '-')}/${design.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-600">12</CardTitle>
              <CardDescription>Total Designs</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">3</CardTitle>
              <CardDescription>This Month</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600">8</CardTitle>
              <CardDescription>Shared Designs</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
