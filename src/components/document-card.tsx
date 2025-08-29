import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  title: string;
  snippet: string;
  department?: string;
  date?: string;
  language?: string;
  thumbnail?: string;
}

const DocumentCard = ({ title, snippet, department, date, language, thumbnail }: DocumentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-normal cursor-pointer">
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
            
            {/* Metadata */}
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
              {language && (
                <Badge variant="outline" className="text-xs text-primary border-primary">
                  {language}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;