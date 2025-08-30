import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";

interface DocumentCardProps {
  title: string;
  snippet: string;
  department?: string;
  date?: string;
  language?: string;
  thumbnail?: string;
  isVisited?: boolean;
  isStarred?: boolean;
  onClick?: () => void;
  onStar?: () => void;
  onLanguageChange?: (language: string) => void;
}

const DocumentCard = ({ 
  title, 
  snippet, 
  department, 
  date, 
  language, 
  thumbnail, 
  isVisited = false,
  isStarred = false,
  onClick,
  onStar,
  onLanguageChange
}: DocumentCardProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language || "English");

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    onLanguageChange?.(lang);
  };

  return (
    <Card 
      className={`hover:shadow-md transition-all duration-normal cursor-pointer ${
        isVisited ? 'bg-gray-50' : 'bg-background'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
            {thumbnail ? (
              <img 
                src={thumbnail} 
                alt="Document preview" 
                className="w-full h-full object-cover rounded-md border border-border"
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-md border border-border flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">DOC</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {snippet}
            </p>
            
            {/* Metadata and Actions */}
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                {department && (
                  <Badge variant="secondary" className="text-xs">
                    {department}
                  </Badge>
                )}
                {date && (
                  <Badge variant="outline" className="text-xs">
                    {date}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 px-2 text-xs gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedLanguage}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => handleLanguageSelect("English")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageSelect("Hindi")}>
                      Hindi
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageSelect("Malayalam")}>
                      Malayalam
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Star Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 w-6 p-0 ${isStarred ? 'text-yellow-500' : 'text-muted-foreground'} hover:text-yellow-500`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStar?.();
                  }}
                >
                  <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;