import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface QRDesignSettings {
  fgColor: string;
  bgColor: string;
  eyeColor: string;
  moduleShape: "square" | "circle" | "rounded" | "dots";
  eyeShape: "square" | "circle" | "rounded" | "leaf";
  logo: string | null;
  logoSize: number;
  frame: "none" | "simple" | "badge" | "bubble";
  frameText: string;
  errorLevel: "L" | "M" | "Q" | "H";
}

interface CustomizationPanelProps {
  settings: QRDesignSettings;
  updateSettings: (settings: Partial<QRDesignSettings>) => void;
}

const CustomizationPanel = ({ settings, updateSettings }: CustomizationPanelProps) => {
  const handleChange = (key: keyof QRDesignSettings, value: any) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="colors" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="shapes">Shapes</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="frame">Frame</TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-4 overflow-y-auto pr-1">
          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground</Label>
                <div className="flex items-center gap-2">
                  <div className="relative w-full h-10 rounded-md overflow-hidden border">
                    <input
                      type="color"
                      value={settings.fgColor}
                      onChange={(e) => handleChange("fgColor", e.target.value)}
                      className="absolute -top-2 -left-2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-0"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex items-center gap-2">
                  <div className="relative w-full h-10 rounded-md overflow-hidden border">
                    <input
                      type="color"
                      value={settings.bgColor}
                      onChange={(e) => handleChange("bgColor", e.target.value)}
                      className="absolute -top-2 -left-2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-0"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Eye Color</Label>
                <div className="flex items-center gap-2">
                  <div className="relative w-full h-10 rounded-md overflow-hidden border">
                    <input
                      type="color"
                      value={settings.eyeColor}
                      onChange={(e) => handleChange("eyeColor", e.target.value)}
                      className="absolute -top-2 -left-2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Shapes Tab */}
          <TabsContent value="shapes" className="space-y-6">
            <div className="space-y-4">
              <Label>Module Shape</Label>
              <div className="grid grid-cols-4 gap-2">
                {["square", "circle", "rounded", "dots"].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => handleChange("moduleShape", shape)}
                    className={cn(
                      "aspect-square rounded-lg border-2 flex items-center justify-center transition-all",
                      settings.moduleShape === shape
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 bg-current",
                      shape === "circle" ? "rounded-full" :
                        shape === "rounded" ? "rounded-sm" :
                          shape === "dots" ? "rounded-full scale-75" : "rounded-none"
                    )} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Eye Shape</Label>
              <div className="grid grid-cols-4 gap-2">
                {["square", "circle", "rounded", "leaf"].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => handleChange("eyeShape", shape)}
                    className={cn(
                      "aspect-square rounded-lg border-2 flex items-center justify-center transition-all",
                      settings.eyeShape === shape
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 border-4 border-current",
                      shape === "circle" ? "rounded-full" :
                        shape === "rounded" ? "rounded-md" :
                          shape === "leaf" ? "rounded-tr-lg rounded-bl-lg" : "rounded-none"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Logo Tab */}
          <TabsContent value="logo" className="space-y-6">
            <div className="space-y-4">
              <Label>Upload Logo</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2 hover:bg-muted/50 transition-colors">
                {settings.logo ? (
                  <div className="relative group">
                    <img src={settings.logo} alt="Logo" className="w-16 h-16 object-contain" />
                    <button
                      onClick={() => handleChange("logo", null)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    Click to upload (Simulation)
                    {/* Hidden input simulation */}
                    <input
                      type="file"
                      className="hidden"
                      id="logo-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => handleChange("logo", e.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label htmlFor="logo-upload" className="absolute inset-0 cursor-pointer" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Logo Size</Label>
                <span className="text-xs text-muted-foreground">{settings.logoSize}%</span>
              </div>
              <Slider
                value={[settings.logoSize]}
                min={10}
                max={30}
                step={1}
                onValueChange={([val]) => handleChange("logoSize", val)}
              />
            </div>

            <div className="p-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-800 text-xs">
              ⚠️ High error correction (H) recommended when using a logo.
            </div>
          </TabsContent>

          {/* Frame Tab */}
          <TabsContent value="frame" className="space-y-6">
            <div className="space-y-4">
              <Label>Frame Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {["none", "simple", "badge", "bubble"].map((frame) => (
                  <button
                    key={frame}
                    onClick={() => handleChange("frame", frame)}
                    className={cn(
                      "p-3 rounded-lg border-2 text-sm capitalize transition-all",
                      settings.frame === frame
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-muted hover:border-primary/50 text-muted-foreground"
                    )}
                  >
                    {frame}
                  </button>
                ))}
              </div>
            </div>

            {settings.frame !== "none" && (
              <div className="space-y-2">
                <Label>Frame Text</Label>
                <Input
                  value={settings.frameText}
                  onChange={(e) => handleChange("frameText", e.target.value)}
                  placeholder="Scan me!"
                  maxLength={20}
                />
              </div>
            )}
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
};

export default CustomizationPanel;