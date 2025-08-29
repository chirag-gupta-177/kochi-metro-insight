import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import DocumentCard from "@/components/document-card";
import ProblemStatement from "@/components/problem-statement";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('Inbox');
  const [showProblemStatement, setShowProblemStatement] = useState(false);

  // Mock data for different tabs
  const mockDocuments = {
    Inbox: [
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
    Sent: [
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

  const currentDocuments = mockDocuments[activeTab as keyof typeof mockDocuments] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {activeTab} ({currentDocuments.length})
          </h1>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => setShowProblemStatement(true)}
              className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Problem Statement
            </Button>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {currentDocuments.length > 0 ? (
            currentDocuments.map((doc, index) => (
              <DocumentCard
                key={index}
                title={doc.title}
                snippet={doc.snippet}
                department={doc.department}
                date={doc.date}
                language={doc.language}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No documents in {activeTab}</p>
            </div>
          )}
        </div>
      </main>
      
      <ProblemStatement 
        isOpen={showProblemStatement}
        onClose={() => setShowProblemStatement(false)}
      />
    </div>
  );
};

export default Dashboard;