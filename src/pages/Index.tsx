import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowRight, Upload, Search, Edit, Save } from "lucide-react";

const Index = () => {
  const categories = [
    { name: "Living Room", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop", path: "/design/living-room" },
    { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", path: "/design/kitchen" },
    { name: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop", path: "/design/bedroom" },
    { name: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", path: "/design/office" },
    { name: "Classroom", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop", path: "/design/classroom" },
    { name: "Factory", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop", path: "/design/factory" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Transform Your Space
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Design, customize, and visualize any space with our powerful interactive platform. 
            From homes to factories, classrooms to events - bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/design">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6">
                Start Designing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/proposals">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-purple-50">
                <Search className="mr-2 w-5 h-5" />
                Explore Ideas
              </Button>
            </Link>
          </div>

          {/* Hero Images Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categories.slice(0, 3).map((category, index) => (
              <Link key={index} to={category.path} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                        <p className="text-white/80 text-sm">Click to start designing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to transform your space</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Upload & Select</h3>
              <p className="text-gray-600">Upload a photo of your space or choose from our templates. Select your design category and goals.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Design & Customize</h3>
              <p className="text-gray-600">Drag and drop furniture, change colors, and modify layouts with our intuitive design tools.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Save className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Save & Share</h3>
              <p className="text-gray-600">Save your designs, export them as images, and share with others for feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Any Space</h2>
            <p className="text-xl text-gray-600">From residential to commercial, we've got you covered</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.path} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg"></div>
            <span className="text-2xl font-bold">Design Me</span>
          </div>
          <p className="text-gray-400 mb-8">Transform any space with intelligent design tools</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/proposals" className="hover:text-white transition-colors">Explore</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
