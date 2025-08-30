import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import EmployeeSidebar from "@/components/employee-sidebar";
import FileUploadArea from "@/components/file-upload-area";
import FilePreviewModal from "@/components/ui/file-preview-modal";

interface UploadProps {
  onLogout: () => void;
}

const Upload = ({ onLogout }: UploadProps) => {
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set());
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleEmployeeSelect = (employeeId: string, selected: boolean) => {
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(employeeId);
      } else {
        newSet.delete(employeeId);
      }
      return newSet;
    });
  };

  const handleDepartmentSelect = (departmentId: string, selected: boolean) => {
    setSelectedDepartments(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(departmentId);
      } else {
        newSet.delete(departmentId);
      }
      return newSet;
    });
  };

  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handlePreviewFile = (file: File) => {
    setPreviewFile(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true}
        onLogout={onLogout}
        hideSearchBar={true}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 border-r border-border bg-background">
          <EmployeeSidebar
            selectedEmployees={selectedEmployees}
            selectedDepartments={selectedDepartments}
            onEmployeeSelect={handleEmployeeSelect}
            onDepartmentSelect={handleDepartmentSelect}
          />
        </div>
        
        {/* Main Upload Area */}
        <div className="flex-1 overflow-auto">
          <FileUploadArea
            uploadedFiles={uploadedFiles}
            onFilesUpload={handleFilesUpload}
            onPreviewFile={handlePreviewFile}
          />
        </div>
      </div>
      
      <FilePreviewModal
        file={previewFile}
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};

export default Upload;