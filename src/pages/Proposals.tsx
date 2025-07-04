import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useProposals } from "@/hooks/useProposals";
import { Star } from "lucide-react";

const Proposals = () => {
  const { data: proposals = [], isLoading } = useProposals();

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

  const featuredProposals = proposals.filter(p => p.is_featured);
  const otherProposals = proposals.filter(p => !p.is_featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Inspiration</h1>
          <p className="text-xl text-gray-600">
            Discover amazing design ideas and templates to spark your creativity
          </p>
        </div>

        {/* Featured Proposals */}
        {featuredProposals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Featured Designs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProposals.map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={proposal.image_url || '/placeholder.svg'} 
                        alt={proposal.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold mb-2">{proposal.title}</h3>
                        <p className="text-white/90 text-sm">{proposal.description}</p>
                        <Badge variant="secondary" className="mt-2 capitalize">
                          {proposal.category.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Proposals */}
        {otherProposals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Ideas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProposals.map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={proposal.image_url || '/placeholder.svg'} 
                        alt={proposal.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-sm font-semibold mb-1">{proposal.title}</h3>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {proposal.category.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {proposals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No proposals available</h3>
            <p className="text-gray-600">Check back later for design inspiration!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;
