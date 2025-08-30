import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  summary?: string;
}

const DocumentModal = ({ isOpen, onClose, title, summary }: DocumentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground pr-8">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex-1 min-h-0">
            <h3 className="text-sm font-medium text-foreground mb-3">Summary</h3>
            <div className="bg-muted/30 rounded-lg p-4 h-64 overflow-y-auto">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {summary || "This is a placeholder summary for the document. The actual AI-generated summary will appear here, providing key insights, actionable items, and important information extracted from the source document. This summary will be tailored to help users quickly understand the document's relevance to their role and responsibilities within KOCHI METRO operations."}
              </p>
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <a 
              href="#" 
              className="text-primary hover:text-primary/80 underline text-sm font-medium transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Go to the document
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentModal;