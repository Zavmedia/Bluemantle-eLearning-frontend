import { KnowledgeCard } from "@/components/KnowledgeCard";
import { Folder, FileText, Download, Eye } from "lucide-react";

export default function NotesPage() {
  const folders = [
    { name: "Technical Analysis Module", fileCount: 12 },
    { name: "Risk Management Basics", fileCount: 5 },
    { name: "Trading Psychology", fileCount: 8 },
  ];

  const recentFiles = [
    { name: "Fibonacci Cheatsheet.pdf", folder: "Technical Analysis Module", size: "2.4 MB" },
    { name: "Position Sizing Calculator.xlsx", folder: "Risk Management Basics", size: "1.1 MB" },
    { name: "Market Stages Notes.pdf", folder: "Trading Psychology", size: "3.5 MB" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-4xl font-manrope font-bold tracking-tight mb-6">Notes & Materials</h1>
      
      <section>
        <h2 className="text-xl font-bold font-manrope mb-4 text-on_surface">Course Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder, i) => (
            <KnowledgeCard key={i} className="hover:border-primary/50 cursor-pointer group">
              <div className="p-6 flex items-center gap-4">
                <div className="p-4 rounded-xl bg-primary_fixed_dim/20 text-primary group-hover:scale-110 transition-transform">
                  <Folder className="w-8 h-8 fill-current opacity-80" />
                </div>
                <div>
                  <h3 className="font-bold text-on_surface group-hover:text-primary transition-colors">{folder.name}</h3>
                  <p className="text-sm text-on_surface_variant mt-1">{folder.fileCount} files</p>
                </div>
              </div>
            </KnowledgeCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold font-manrope mb-4 text-on_surface">Recent Files</h2>
        <div className="space-y-3">
          {recentFiles.map((file, i) => (
            <KnowledgeCard key={i} className="flex justify-between items-center p-4 border border-outline_variant/30 hover:bg-surface_container_lowest transition-all hover:shadow-md">
              <div className="flex gap-4 items-center">
                <FileText className="w-6 h-6 text-secondary" />
                <div>
                  <h4 className="font-bold text-on_surface text-sm">{file.name}</h4>
                  <p className="text-xs text-on_surface_variant">{file.folder} • {file.size}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-on_surface_variant hover:text-primary p-2 rounded-full hover:bg-primary/10 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-on_surface_variant hover:text-primary p-2 rounded-full hover:bg-primary/10 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </KnowledgeCard>
          ))}
        </div>
      </section>
    </div>
  );
}
