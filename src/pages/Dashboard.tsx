import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import DocumentCard from "@/components/document-card";
import DocumentModal from "@/components/ui/document-modal";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [visitedDocuments, setVisitedDocuments] = useState<Set<string>>(new Set());
  const [starredDocuments, setStarredDocuments] = useState<Set<string>>(new Set());

  // Mock data for different tabs
  const mockDocuments = {
    All: [
      {
        title: "Safety Circular - Emergency Brake Protocol Update",
        snippet: "Revised emergency braking procedures for all rolling stock operations. Implementation required by March 15th, 2024.",
        department: "Safety",
        date: "2024-03-01",
        language: "English"
      },
      {
        title: "വാർഷിക പരിപാലന പദ്ധതി - Rolling Stock Maintenance",
        snippet: "Annual maintenance schedule for metro trains including preventive maintenance protocols and spare parts inventory.",
        department: "Engineering",
        date: "2024-02-28",
        language: "Malayalam"
      },
      {
        title: "Vendor Invoice - Platform Screen Doors",
        snippet: "Invoice and installation certificate for platform screen door upgrades at Aluva and Edappally stations.",
        department: "Procurement",
        date: "2024-02-27",
        language: "Bilingual"
      },
      {
        title: "Passenger Feedback Analysis - Q4 2023",
        snippet: "Quarterly analysis of passenger complaints and suggestions with recommended action items for service improvement.",
        department: "Operations",
        date: "2024-02-25",
        language: "English"
      }
    ],
    Uploaded: [
      {
        title: "Monthly Operations Report - February 2024",
        snippet: "Comprehensive report on train punctuality, passenger loads, and operational efficiency metrics for February.",
        department: "Operations",
        date: "2024-03-01",
        language: "English"
      }
    ],
    Verified: [
      {
        title: "Environmental Impact Assessment - Corridor Extension",
        snippet: "Approved environmental clearance documentation for the proposed metro corridor extension to Kakkanad.",
        department: "Planning",
        date: "2024-02-20",
        language: "English"
      }
    ],
    Marked: [
      {
        title: "HR Policy Update - Remote Work Guidelines",
        snippet: "Updated remote work policy for administrative staff with new approval processes and performance metrics.",
        department: "HR",
        date: "2024-02-15",
        language: "English"
      }
    ]
  };

  // Get documents for current tab, including starred documents for Marked tab
  const getCurrentDocuments = () => {
    if (activeTab === 'Marked') {
      // Return all starred documents from all tabs
      const allDocs = Object.values(mockDocuments).flat();
      return allDocs.filter((_, index) => starredDocuments.has(`${index}`));
    }
    return mockDocuments[activeTab as keyof typeof mockDocuments] || [];
  };

  const currentDocuments = getCurrentDocuments();

  const handleDocumentClick = (doc: any, index: number) => {
    const docId = `${activeTab}-${index}`;
    setVisitedDocuments(prev => new Set(prev).add(docId));
    setSelectedDocument(doc);
  };

  const handleStarDocument = (index: number) => {
    const docId = `${index}`;
    setStarredDocuments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        onLogout={onLogout}
        onUploadClick={() => navigate('/upload')}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {activeTab} ({currentDocuments.length})
          </h1>
        </div>
        
        <div className="space-y-4">
          {currentDocuments.length > 0 ? (
            currentDocuments.map((doc, index) => {
              const docId = `${activeTab}-${index}`;
              const globalIndex = Object.values(mockDocuments).flat().findIndex(d => d.title === doc.title);
              return (
                <DocumentCard
                  key={index}
                  title={doc.title}
                  snippet={doc.snippet}
                  department={doc.department}
                  date={doc.date}
                  language={doc.language}
                  isVisited={visitedDocuments.has(docId)}
                  isStarred={starredDocuments.has(`${globalIndex}`)}
                  onClick={() => handleDocumentClick(doc, index)}
                  onStar={() => handleStarDocument(globalIndex)}
                />
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No documents in {activeTab}</p>
            </div>
          )}
        </div>
      </main>
      
      <DocumentModal 
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        title={selectedDocument?.title || ""}
      />
    </div>
  );
};

export default Dashboard;