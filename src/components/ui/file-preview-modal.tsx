import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilePreviewModalProps {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
}

const FilePreviewModal = ({ file, isOpen, onClose }: FilePreviewModalProps) => {
  if (!file) return null;

  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';
  const isText = file.type.startsWith('text/');

  const renderPreview = () => {
    if (isImage) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <div className="flex justify-center">
          <img 
            src={imageUrl} 
            alt={file.name}
            className="max-w-full max-h-96 object-contain rounded-lg"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </div>
      );
    }

    if (isPDF) {
      const pdfUrl = URL.createObjectURL(file);
      return (
        <div className="w-full h-96">
          <iframe
            src={pdfUrl}
            className="w-full h-full border rounded-lg"
            title={file.name}
          />
        </div>
      );
    }

    if (isText) {
      return (
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Text file preview is not supported in this demo. The file "{file.name}" would be displayed here in a production environment.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-lg bg-muted flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{file.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Preview not available for this file type
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground pr-8">
            {file.name}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="mt-4">
            {renderPreview()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewModal;