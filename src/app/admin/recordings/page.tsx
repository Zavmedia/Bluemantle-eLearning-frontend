import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { PlayCircle, Plus, HardDrive, Video, Calendar, Clock, CloudUpload, MoreHorizontal } from "lucide-react";

export default function RecordingManagement() {
  const recordings = [
    { title: "Identity Access Management", module: "Section 04 • Module 2", date: "Oct 24, 2024", time: "10:30 AM - 12:00 PM", status: "Published" },
    { title: "Virtual Network Topology", module: "Section 03 • Module 1", date: "Oct 22, 2024", time: "02:00 PM - 04:30 PM", status: "Published" },
    { title: "Database Sharding Patterns", module: "Section 09 • Final Review", date: "Oct 20, 2024", time: "09:00 AM - 11:00 AM", status: "Processing" },
  ];

  return (
    <div className="space-y-8 pb-16">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Class Recordings</h1>
          <p className="text-on_surface_variant">Azure Academy • Library Management</p>
        </div>
        <button className="bg-primary text-on_primary px-6 py-2.5 rounded-full font-bold shadow-ambient flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm">
          <Plus className="w-4 h-4" /> Create New Entry
        </button>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KnowledgeCard className="p-6">
           <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-primary">
                <Video className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Recordings</p>
                 <h3 className="text-2xl font-bold font-manrope">1,284</h3>
              </div>
           </div>
        </KnowledgeCard>
        <KnowledgeCard className="p-6">
           <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-secondary">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Active Batches</p>
                 <h3 className="text-2xl font-bold font-manrope">12</h3>
              </div>
           </div>
        </KnowledgeCard>
        <KnowledgeCard className="p-6">
           <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-primary_fixed_variant">
                <HardDrive className="w-5 h-5" />
              </div>
              <div className="flex-1">
                 <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Storage Used</p>
                 <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold font-manrope">84%</h3>
                    <div className="flex-1 h-1.5 bg-surface_container_highest rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: '84%' }} />
                    </div>
                 </div>
              </div>
           </div>
        </KnowledgeCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recording List */}
        <div className="lg:col-span-2 space-y-4">
           <h2 className="text-xl font-bold font-manrope text-on_surface mb-4">Recent Library Activity</h2>
           <div className="space-y-4">
              {recordings.map((rec) => (
                <div key={rec.title} className="flex flex-col sm:flex-row gap-4 p-5 bg-surface_container_lowest rounded-2xl border border-outline_variant/20 hover:border-primary/30 transition-all group cursor-pointer shadow-ambient">
                   <div className="w-full sm:w-40 aspect-video rounded-xl bg-surface_container_high flex items-center justify-center relative overflow-hidden">
                      <PlayCircle className="w-10 h-10 text-primary opacity-60 group-hover:scale-110 transition-transform" />
                      {rec.status === 'Processing' && (
                        <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-on_surface_variant flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Processing
                           </span>
                        </div>
                      )}
                   </div>
                   <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                         <div className="flex justify-between items-start">
                            <h3 className="font-bold text-on_surface group-hover:text-primary transition-colors">{rec.title}</h3>
                            <button className="p-1 hover:bg-surface_container_high rounded-full"><MoreHorizontal className="w-4 h-4 text-outline" /></button>
                         </div>
                         <p className="text-xs text-on_surface_variant mt-1 font-medium">{rec.module}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5" /> {rec.date}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5" /> {rec.time}
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Sidebar Ops */}
        <div className="space-y-6">
           <KnowledgeCard className="bg-surface_container_low border-primary/10">
              <CardBody className="p-8">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <CloudUpload className="w-6 h-6" />
                 </div>
                 <h3 className="font-manrope font-bold text-lg mb-2">Sync to Azure</h3>
                 <p className="text-sm text-on_surface_variant leading-relaxed mb-6">
                   Automatically backup your YouTube recordings to the academy&apos;s secure internal cloud storage every Sunday at 02:00 AM.
                 </p>
                 <button className="w-full bg-primary text-on_primary py-3 rounded-full font-bold text-sm shadow-ambient hover:opacity-90 transition-opacity">
                    Configure Auto-Sync
                 </button>
              </CardBody>
           </KnowledgeCard>

           <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
              <div className="flex gap-4 items-start">
                 <PlayCircle className="w-5 h-5 text-secondary mt-0.5" />
                 <div>
                    <h4 className="text-sm font-bold text-on_surface">Automated Playlists</h4>
                    <p className="text-xs text-on_surface_variant mt-1">Smart collections are being generated based on module cross-referencing.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
