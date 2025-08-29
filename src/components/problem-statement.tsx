import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProblemStatementProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProblemStatement = ({ isOpen, onClose }: ProblemStatementProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Problem Statement
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="prose max-w-none text-foreground leading-relaxed">
            <p className="mb-4">
              Since its first commercial run in 2017, KMRL has grown into a complex, multidisciplinary enterprise that stretches far beyond train operations. Every business day the organization generates and receives thousands of pages of material: engineering drawings, maintenance job cards, incident reports, vendor invoices, purchase-order correspondence, regulatory directives, environmental-impact studies, safety circulars, HR policies, legal opinions, and board-meeting minutes. These arrive through e-mail, Maximo exports, SharePoint repositories, WhatsApp PDFs, hard-copy scans, and ad-hoc cloud links—often in both English and Malayalam, sometimes in bilingual hybrids, frequently with embedded tables, photos, or signatures.
            </p>
            
            <p className="mb-4">
              The sheer diversity and volume have created a silent productivity tax:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Information latency:</strong> Front-line managers spend hours skimming lengthy documents for the few actionable lines that affect their shift, delaying decisions on train availability, contractor payments, or staffing reallocations.
              </li>
              <li>
                <strong>Siloed awareness:</strong> Procurement may negotiate a spare-parts contract without realizing that Engineering has already flagged an upcoming design change HR may schedule refresher training unaware of a new safety bulletin released the previous evening.
              </li>
              <li>
                <strong>Compliance exposure:</strong> Regulatory updates from the Commissioner of Metro Rail Safety and the Ministry of Housing & Urban Affairs are buried in inboxes, risking missed deadlines or audit non-conformities.
              </li>
              <li>
                <strong>Knowledge attrition:</strong> Institutional memory remains locked in static files when key personnel transfer or retire, hard-won insights vanish with them.
              </li>
              <li>
                <strong>Duplicated effort:</strong> Different teams independently create summaries or slide decks of the same source documents, multiplying manual work and version-control headaches.
              </li>
            </ul>
            
            <p className="mb-4">
              As KMRL prepares to expand its corridor, add two new depots, and integrate emerging technologies such as Unified Namespace (UNS) data streams and IoT condition monitoring, the documentary burden will only intensify. Without an organization-wide mechanism to condense, contextualize, and route critical information, the metro risks slower decision cycles, avoidable operating costs, diminished service reliability, and heightened safety and legal vulnerabilities.
            </p>
            
            <p>
              The challenge, therefore, is to equip every stakeholder—from station controllers and rolling-stock engineers to finance officers and executive directors—with rapid, trustworthy snapshots of the documents that matter to them, while preserving traceability to the original source. Solving this problem will unlock faster cross-department coordination, strengthen regulatory compliance, safeguard institutional knowledge, and ultimately support KMRL's mission of delivering safe, efficient, and passenger-centric urban transit to Kochi
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProblemStatement;