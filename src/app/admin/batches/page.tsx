"use client";

import { useState, useMemo } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { DataTable } from "@/components/DataTable";
import { 
  Layers, Users, Star, TrendingUp, Activity, 
  Search, Filter, ArrowLeft, GraduationCap, 
  ShieldAlert, Clock, CheckCircle2, AlertCircle,
  BarChart3, MessageSquareWarning, ExternalLink
} from "lucide-react";

// Mock Data
const MASTER_BATCHES = [
  { id: "b1", name: "Batch A", teacher: "Sarah Chen", teacherId: "TCH-001", enrollment: 98, max: 100, attendance: "92%", progress: "78%", startDate: "Jan 12, 2024" },
  { id: "b2", name: "Batch B", teacher: "Julian Mayer", teacherId: "TCH-004", enrollment: 100, max: 100, attendance: "88%", progress: "65%", startDate: "Jan 15, 2024" },
  { id: "b3", name: "Batch C", teacher: "Elena Kostic", teacherId: "TCH-003", enrollment: 45, max: 100, attendance: "94%", progress: "82%", startDate: "Feb 01, 2024" },
  { id: "b4", name: "Advanced AI", teacher: "Dr. Sarah Jenkins", teacherId: "TCH-001", enrollment: 62, max: 100, attendance: "96%", progress: "90%", startDate: "Feb 10, 2024" },
  { id: "b5", name: "Economics", teacher: "Prof. Smith", teacherId: "TCH-005", enrollment: 38, max: 100, attendance: "85%", progress: "55%", startDate: "Mar 01, 2024" },
  { id: "b6", name: "Digital Arts", teacher: "Ms. Elena Rodriguez", teacherId: "TCH-003", enrollment: 15, max: 100, attendance: "98%", progress: "95%", startDate: "Apr 22, 2024" }
];

const BATCH_STUDENTS = [
  { name: "Elena Rodriguez", email: "elena.rodriguez@academy.edu", id: "STU-9284", cohort: "Advanced AI", status: "Active", attendance: 92, progress: 85 },
  { name: "Julian Chen", email: "j.chen@academy.edu", id: "STU-8821", cohort: "Advanced AI", status: "Active", attendance: 98, progress: 92 },
  { name: "Markus Vance", email: "m.vance@academy.edu", id: "STU-7732", cohort: "Batch A", status: "Active", attendance: 85, progress: 70 },
  { name: "Sarah Jenkins", email: "sarah.j@academy.edu", id: "STU-6610", cohort: "Batch A", status: "Active", attendance: 94, progress: 88 },
  { name: "David Miller", email: "d.miller@academy.edu", id: "STU-5541", cohort: "Batch B", status: "Active", attendance: 75, progress: 40 },
];

const BATCH_GRIEVANCES = [
  { id: "GRV-1024", student: "Alice Waverly", studentId: "STU-8901", cohort: "Advanced AI", subject: "Lab Availability", status: "Resolved", date: "Oct 15" },
  { id: "GRV-1028", student: "John Doe", studentId: "STU-8821", cohort: "Batch B", subject: "Material Quality", status: "Pending", date: "Oct 22" },
  { id: "GRV-1033", student: "Julian Chen", studentId: "STU-8824", cohort: "Advanced AI", subject: "Instruction Pacing", status: "Escalated", date: "Oct 24" },
];

export default function AdminBatchesPage() {
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Students" | "Faculty" | "Grievances">("Students");

  const selectedBatch = MASTER_BATCHES.find(b => b.id === selectedBatchId);

  const studentsInBatch = useMemo(() => {
    return BATCH_STUDENTS.filter(s => s.cohort === selectedBatch?.name);
  }, [selectedBatch]);

  const grievancesInBatch = useMemo(() => {
    return BATCH_GRIEVANCES.filter(g => g.cohort === selectedBatch?.name);
  }, [selectedBatch]);

  if (selectedBatch) {
    return (
      <div className="space-y-8 pb-16 animate-in slide-in-from-right-4 duration-500">
         <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setSelectedBatchId(null)}
                 className="p-2.5 bg-surface_container_high rounded-full hover:bg-surface_container_highest transition-all"
               >
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest">{selectedBatch.id}</span>
                     <h1 className="text-3xl font-manrope font-bold tracking-tight">{selectedBatch.name}</h1>
                  </div>
                  <p className="text-on_surface_variant text-sm flex items-center gap-2">
                     <GraduationCap className="w-4 h-4" /> Primary Instructor: <span className="font-bold text-on_surface">{selectedBatch.teacher}</span>
                  </p>
               </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
               <button className="flex-1 sm:flex-none btn-premium gap-2 scale-90 sm:scale-100">
                  <Activity className="w-4 h-4" /> Broadcast to Batch
               </button>
            </div>
         </header>

         {/* Batch Stats Quick View */}
         <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Enrollment",   value: `${selectedBatch.enrollment}/${selectedBatch.max}`, icon: Users, color: "text-primary" },
              { label: "Attendance",   value: selectedBatch.attendance, icon: Activity, color: "text-secondary" },
              { label: "Completion",   value: selectedBatch.progress, icon: BarChart3, color: "text-primary" },
              { label: "Grievances",   value: grievancesInBatch.length, icon: ShieldAlert, color: grievancesInBatch.length > 2 ? "text-error" : "text-outline" },
            ].map(s => (
              <KnowledgeCard key={s.label} className="p-4">
                 <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg bg-surface_container_high ${s.color}`}>
                       <s.icon className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-outline uppercase tracking-wider">{s.label}</p>
                       <p className={`text-xl font-extrabold font-manrope ${s.color}`}>{s.value}</p>
                    </div>
                 </div>
              </KnowledgeCard>
            ))}
         </section>

         {/* Tabs Section */}
         <div className="flex gap-2 border-b border-outline_variant/10">
            {(["Students", "Faculty", "Grievances"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
                  activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on_surface'
                }`}
              >
                {tab}
              </button>
            ))}
         </div>

         <div className="animate-in fade-in duration-300">
            {activeTab === "Students" && (
              <KnowledgeCard>
                 <CardBody className="p-0">
                    <DataTable 
                      data={studentsInBatch}
                      columns={[
                        { key: "name", header: "Student", render: (v, r) => (
                          <div>
                            <p className="font-bold text-on_surface">{v}</p>
                            <p className="text-[10px] text-outline font-bold">{r.id}</p>
                          </div>
                        )},
                        { key: "email", header: "Email Address" },
                        { key: "attendance", header: "Attendance", render: (v) => <span className="font-bold">{v}%</span> },
                        { key: "progress", header: "Course Progress", render: (v) => (
                           <div className="flex items-center gap-2">
                             <div className="w-16 h-1.5 bg-surface_container_high rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${v}%` }} />
                             </div>
                             <span className="text-xs font-bold">{v}%</span>
                           </div>
                        )},
                        { key: "status", header: "State", render: (v) => <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">{v}</span> }
                      ]}
                    />
                 </CardBody>
              </KnowledgeCard>
            )}

            {activeTab === "Faculty" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <KnowledgeCard className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-16 h-16 rounded-2xl bg-signature-gradient text-on_primary flex items-center justify-center text-2xl font-bold">
                          {selectedBatch.teacher.split(' ').map(n=>n[0]).join('')}
                       </div>
                       <div>
                          <h3 className="text-xl font-bold font-manrope">{selectedBatch.teacher}</h3>
                          <p className="text-xs text-outline font-bold uppercase tracking-widest">{selectedBatch.teacherId} · Lead Instructor</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between p-3 bg-surface_container_low rounded-xl">
                          <span className="text-xs font-bold text-on_surface_variant">Assigned Date</span>
                          <span className="text-xs font-bold">{selectedBatch.startDate}</span>
                       </div>
                       <div className="flex justify-between p-3 bg-surface_container_low rounded-xl">
                          <span className="text-xs font-bold text-on_surface_variant">Load Factor</span>
                          <span className="text-xs font-bold">1/4 Batches</span>
                       </div>
                    </div>
                 </KnowledgeCard>
                 <KnowledgeCard className="p-8 bg-surface_container_low flex flex-col justify-center items-center text-center border-dashed">
                    <div className="p-3 bg-outline_variant/20 text-outline rounded-full mb-4">
                       <Users className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-on_surface">No Assistant Assigned</p>
                    <p className="text-xs text-outline mt-1 mb-4">Batch A currently operates with one lead instructor.</p>
                    <button className="text-xs font-bold text-primary hover:underline">Add Teaching Assistant</button>
                 </KnowledgeCard>
              </div>
            )}

            {activeTab === "Grievances" && (
              <KnowledgeCard className="border-error/10">
                 <CardHeader className="bg-error/5 p-4 flex items-center gap-3 border-b border-error/10">
                    <ShieldAlert className="w-4 h-4 text-error" />
                    <p className="text-xs font-bold text-error uppercase tracking-widest">Confidential Grievance Logs · Admin Access Only</p>
                 </CardHeader>
                 <CardBody className="p-0">
                    {grievancesInBatch.length === 0 ? (
                      <div className="p-20 text-center">
                         <CheckCircle2 className="w-10 h-10 text-primary/30 mx-auto mb-4" />
                         <p className="text-sm font-bold text-on_surface">Zero Active Grievances</p>
                         <p className="text-xs text-outline mt-1">This cohort is currently clear of internal administrative issues.</p>
                      </div>
                    ) : (
                      <DataTable 
                        data={grievancesInBatch}
                        columns={[
                          { key: "id", header: "Ref ID" },
                          { key: "student", header: "Student Identity", render: (v,r) => (
                             <div>
                                <p className="font-bold text-on_surface text-sm">{v}</p>
                                <p className="text-[10px] text-outline font-bold">{r.studentId}</p>
                             </div>
                          )},
                          { key: "subject", header: "The Concern", render: (v) => <span className="font-medium">"{v}"</span> },
                          { key: "status", header: "Status", render: (v) => (
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                               v === 'Escalated' ? 'bg-error text-on_error shadow-glow-error' : 
                               v === 'Resolved'  ? 'bg-primary/10 text-primary' : 
                                                   'bg-secondary/10 text-secondary'
                             }`}>
                                {v}
                             </span>
                          )},
                          { key: "date", header: "Filed" },
                          { key: "actions", header: "", render: () => (
                             <button className="p-2 bg-surface_container_high rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
                                <ExternalLink className="w-4 h-4" />
                             </button>
                          )}
                        ]}
                      />
                    )}
                 </CardBody>
              </KnowledgeCard>
            )}
         </div>
      </div>
    );
  }

  // LEVEL 1: Batch Grid View
  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Academic Batch Intelligence</h1>
          <p className="text-on_surface_variant max-w-2xl text-sm italic">
            "Observe. Evaluate. Calibrate. The core of institutional excellence lies in the cluster."
          </p>
        </div>
        <div className="flex gap-3">
           <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface_container_high rounded-xl border border-outline_variant/30">
              <Search className="w-4 h-4 text-outline" />
              <input type="text" placeholder="Locate batch cluster..." className="bg-transparent border-none text-xs focus:outline-none w-32" />
           </div>
           <button className="btn-premium gap-2">
              <Layers className="w-4 h-4" /> Provision New Batch
           </button>
        </div>
      </header>

      {/* Cluster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {MASTER_BATCHES.map(b => (
           <div 
             key={b.id}
             onClick={() => setSelectedBatchId(b.id)}
             className="group relative cursor-pointer"
           >
              <KnowledgeCard className="h-full border-outline_variant/20 hover:border-primary/50 hover:shadow-ambient transition-all overflow-hidden">
                 {/* Top Indicator */}
                 <div className="h-1 w-full bg-surface_container_highest">
                    <div 
                      className={`h-full transition-all duration-1000 ${parseInt(b.attendance) > 90 ? 'bg-primary' : 'bg-warning'}`} 
                      style={{ width: b.attendance }} 
                    />
                 </div>
                 
                 <CardBody className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{b.id}</span>
                       <div className="p-2 bg-primary/10 text-primary rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                          <Activity className="w-4 h-4" />
                       </div>
                    </div>

                    <h2 className="text-xl font-bold font-manrope mb-1 text-on_surface group-hover:text-primary transition-colors">{b.name}</h2>
                    <p className="text-xs text-outline font-bold mb-6 flex items-center gap-1.5">
                       <GraduationCap className="w-3.5 h-3.5" /> {b.teacher}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <div>
                          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Vitality</p>
                          <p className="font-bold text-sm text-on_surface">{b.attendance} Attendance</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Saturation</p>
                          <p className={`font-bold text-sm ${b.enrollment >= b.max ? 'text-error' : 'text-on_surface'}`}>
                             {b.enrollment}/{b.max} Capacity
                          </p>
                       </div>
                    </div>

                    <div className="pt-4 border-t border-outline_variant/10 flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-bold text-primary uppercase">{b.progress} Optimized</span>
                       </div>
                       <button className="text-[10px] font-black uppercase text-outline group-hover:text-primary transition-colors flex items-center gap-1">
                          Cluster Intelligence <ExternalLink className="w-2.5 h-2.5" />
                       </button>
                    </div>
                 </CardBody>
              </KnowledgeCard>
           </div>
         ))}
      </div>

    </div>
  );
}
