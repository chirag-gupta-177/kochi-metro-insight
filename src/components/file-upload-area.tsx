import { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadAreaProps {
  uploadedFiles: File[];
  onFilesUpload: (files: File[]) => void;
  onPreviewFile: (file: File) => void;
}

const FileUploadArea = ({ uploadedFiles, onFilesUpload, onPreviewFile }: FileUploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesUpload(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-full p-8">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {uploadedFiles.length === 0 ? (
          // Initial Upload State
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            {/* Large Upload Icon */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted/30 flex items-center justify-center">
                <Plus className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Upload</h2>
            </div>

            {/* Browse Files Button */}
            <Button 
              onClick={handleBrowseClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "w-full max-w-2xl h-48 border-2 border-dashed rounded-lg transition-all duration-200",
                "flex items-center justify-center text-center p-8",
                isDragOver 
                  ? "border-primary bg-primary/5 text-primary" 
                  : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/50"
              )}
            >
              <div className="space-y-2">
                <Upload className={cn("w-8 h-8 mx-auto", isDragOver && "text-primary")} />
                <p className="text-lg font-medium">
                  {isDragOver ? "Drop files here" : "Drag & Drop files here"}
                </p>
                <p className="text-sm">
                  Supports PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, and image files
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Files Uploaded State
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Files Uploaded</h2>
            </div>

            {/* File List */}
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreviewFile(file)}
                    className="ml-4"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              ))}
            </div>

            {/* Add More Files */}
            <div className="text-center pt-4">
              <Button 
                onClick={handleBrowseClick}
                variant="outline"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add More Files
              </Button>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.bmp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUploadArea;