"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar } from "lucide-react";
import { toast } from "sonner";

const REPORTS = [
  { title: "Transaction Summary", description: "Overview of all transactions", date: "May 2026" },
  { title: "Revenue Report", description: "Platform revenue breakdown", date: "May 2026" },
  { title: "User Growth", description: "New registrations and activity", date: "May 2026" },
  { title: "Dispute Analysis", description: "Dispute trends and resolutions", date: "May 2026" },
  { title: "KYC Compliance", description: "Verification completion rates", date: "May 2026" },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Generate and download platform reports">
        <Select defaultValue="may"><SelectTrigger className="w-40"><Calendar className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="may">May 2026</SelectItem><SelectItem value="apr">April 2026</SelectItem><SelectItem value="mar">March 2026</SelectItem></SelectContent>
        </Select>
      </PageHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map((report) => (
          <Card key={report.title} className="hover:border-primary/20 transition-all">
            <CardContent className="p-5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3"><FileText className="h-5 w-5 text-primary" /></div>
              <h3 className="font-semibold">{report.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{report.date}</p>
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toast.success("Report downloaded!")}><Download className="h-3.5 w-3.5 mr-1" /> Download</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
