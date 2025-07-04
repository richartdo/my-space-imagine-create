
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { useDesigns, useDeleteDesign } from "@/hooks/useDesigns";
import { Plus, Edit, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: designs = [], isLoading } = useDesigns();
  const deleteDesign = useDeleteDesign();

  const handleDeleteDesign = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteDesign.mutate(id);
    }
  };

  const categories = [
    { name: "Living Room", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop", path: "/design/living-room" },
    { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", path: "/design/kitchen" },
    { name: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop", path: "/design/bedroom" },
    { name: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", path: "/design/office" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </h1>
          <p className="text-xl text-gray-600">
            Continue your design journey or start something new
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.name} to={category.path} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white text-sm font-semibold">{category.name}</h3>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Saved Designs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Designs</h2>
            <Link to="/design">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Design
              </Button>
            </Link>
          </div>

          {designs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No designs yet</h3>
                <p className="text-gray-600 mb-4">Start creating your first design</p>
                <Link to="/design">
                  <Button>Create Your First Design</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{design.title}</CardTitle>
                    <CardDescription className="capitalize">
                      {design.category.replace('-', ' ')} • {new Date(design.updated_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Link to={`/design/${design.category}?id=${design.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Export feature coming soon!")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteDesign(design.id, design.title)}
                        disabled={deleteDesign.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
