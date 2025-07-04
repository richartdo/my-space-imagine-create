
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Canvas as FabricCanvas, Rect, Circle } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Save, Download, Share, Upload, Plus, Palette, Undo, Redo } from "lucide-react";
import { toast } from "sonner";

const DesignStudio = () => {
  const { category } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#8B5CF6");
  const [activeTool, setActiveTool] = useState<"select" | "rectangle" | "circle">("select");

  const furnitureItems = [
    { name: "Sofa", color: "#8B4513", type: "rectangle" },
    { name: "Chair", color: "#654321", type: "rectangle" },
    { name: "Table", color: "#D2691E", type: "circle" },
    { name: "Bed", color: "#4682B4", type: "rectangle" },
    { name: "Desk", color: "#708090", type: "rectangle" },
    { name: "Plant", color: "#228B22", type: "circle" }
  ];

  const colorPalette = [
    "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", 
    "#EF4444", "#EC4899", "#6366F1", "#84CC16"
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);
    toast.success("Design studio ready! Start creating!");

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleAddFurniture = (item: typeof furnitureItems[0]) => {
    if (!fabricCanvas) return;

    if (item.type === "rectangle") {
      const rect = new Rect({
        left: Math.random() * 400 + 50,
        top: Math.random() * 300 + 50,
        fill: item.color,
        width: 100,
        height: 60,
        rx: 5,
      });
      fabricCanvas.add(rect);
    } else {
      const circle = new Circle({
        left: Math.random() * 400 + 50,
        top: Math.random() * 300 + 50,
        fill: item.color,
        radius: 30,
      });
      fabricCanvas.add(circle);
    }
    
    toast.success(`${item.name} added to design!`);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    if (fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject) {
        activeObject.set('fill', color);
        fabricCanvas.renderAll();
      }
    }
  };

  const handleSave = () => {
    toast.success("Design saved successfully!");
  };

  const handleExport = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = `design-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      toast.success("Design exported successfully!");
    }
  };

  const handleClear = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "#ffffff";
      fabricCanvas.renderAll();
      toast.success("Canvas cleared!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Design Studio</h2>
              {category && (
                <Badge variant="secondary" className="capitalize">
                  {category.replace('-', ' ')}
                </Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <Button onClick={handleSave} className="w-full" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Design
              </Button>
              <div className="flex space-x-2">
                <Button onClick={handleExport} variant="outline" className="flex-1" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {}}
              >
                <Undo className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button variant="outline" size="sm">
                <Redo className="w-4 h-4 mr-2" />
                Redo
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear All
              </Button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Colors
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    activeColor === color ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          {/* Furniture Library */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Furniture</h3>
            <div className="space-y-2">
              {furnitureItems.map((item) => (
                <Card 
                  key={item.name} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleAddFurniture(item)}
                >
                  <CardContent className="p-3 flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                    <Plus className="w-4 h-4 ml-auto text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg p-4 h-full">
            <div className="flex justify-center items-center h-full">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-inner">
                <canvas ref={canvasRef} className="max-w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;
