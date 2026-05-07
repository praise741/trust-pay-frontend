"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle, XCircle, Clock, Eye, User } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_KYC_APPLICATIONS } from "@/constants";
import { getInitials, formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminKycPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="KYC Verification" description="Review and approve identity verifications" />
      <div className="space-y-3">
        {MOCK_KYC_APPLICATIONS.map((kyc, i) => (
          <motion.div key={kyc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="hover:border-primary/20 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11"><AvatarFallback>{getInitials(kyc.userName)}</AvatarFallback></Avatar>
                    <div><p className="font-medium">{kyc.userName}</p><p className="text-sm text-muted-foreground">{kyc.userEmail}</p><p className="text-xs text-muted-foreground mt-0.5">Submitted {formatDateTime(kyc.submittedAt)}</p></div>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${kyc.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : kyc.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>{kyc.status}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                  <div><p className="text-xs text-muted-foreground">ID Type</p><p className="font-medium capitalize">{kyc.idType.replace("_", " ")}</p></div>
                  <div><p className="text-xs text-muted-foreground">ID Number</p><p className="font-medium">{kyc.idNumber}</p></div>
                  {kyc.ninNumber && <div><p className="text-xs text-muted-foreground">NIN</p><p className="font-medium">{kyc.ninNumber}</p></div>}
                  {kyc.bvnNumber && <div><p className="text-xs text-muted-foreground">BVN</p><p className="font-medium">{kyc.bvnNumber}</p></div>}
                </div>
                {kyc.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5 mr-1" /> View Documents</Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => toast.success("KYC approved!")}><CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => toast.error("KYC rejected")}><XCircle className="h-3.5 w-3.5 mr-1" /> Reject</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
