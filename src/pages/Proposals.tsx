
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Search, Filter, Heart } from "lucide-react";

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const proposals = [
    {
      id: 1,
      title: "Modern Minimalist Living Room",
      category: "Living Room",
      description: "Clean lines and neutral colors create a peaceful atmosphere",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      likes: 124,
      author: "Design Studio Pro"
    },
    {
      id: 2,
      title: "Industrial Kitchen Design",
      category: "Kitchen", 
      description: "Exposed brick and steel elements for a modern industrial look",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      likes: 89,
      author: "Urban Spaces"
    },
    {
      id: 3,
      title: "Cozy Bedroom Retreat",
      category: "Bedroom",
      description: "Warm colors and soft textures for ultimate comfort",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
      likes: 156,
      author: "Comfort Designs"
    },
    {
      id: 4,
      title: "Productive Home Office",
      category: "Office",
      description: "Organized workspace with natural lighting and ergonomic furniture",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      likes: 67,
      author: "Work From Home Co"
    },
    {
      id: 5,
      title: "Interactive Classroom Layout",
      category: "Classroom",
      description: "Flexible seating arrangements to encourage student collaboration",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
      likes: 43,
      author: "Education Spaces"
    },
    {
      id: 6,
      title: "Efficient Factory Floor",
      category: "Factory",
      description: "Optimized workflow with clear pathways and safety considerations",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      likes: 78,
      author: "Industrial Solutions"
    }
  ];

  const categories = ["all", "Living Room", "Kitchen", "Bedroom", "Office", "Classroom", "Factory"];

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || proposal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Design Inspiration</h1>
          <p className="text-lg text-gray-600">Discover amazing design ideas from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search design ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={proposal.image} 
                    alt={proposal.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">
                    {proposal.category}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{proposal.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{proposal.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">by {proposal.author}</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span>{proposal.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/design/${proposal.category.toLowerCase().replace(' ', '-')}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Try This Design
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No designs found matching your criteria.</p>
            <Button className="mt-4" onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;
