import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-metro.jpg";
interface HeroSectionProps {
  onLoginClick: () => void;
}
const HeroSection = ({
  onLoginClick
}: HeroSectionProps) => {
  return <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Hero Image with Blur */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`,
      filter: 'blur(2px)',
      transform: 'scale(1.05)'
    }} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-xl px-12 py-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6">Document Manager

          </h1>
            <Button onClick={onLoginClick} size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-3 text-lg">
              Click here to login
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;