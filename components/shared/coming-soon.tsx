import { Construction } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

export function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Construction className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">{description || "This feature is coming soon. Stay tuned!"}</p>
    </div>
  );
}
