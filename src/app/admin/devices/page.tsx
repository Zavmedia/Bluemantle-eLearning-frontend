"use client";

import { useState } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { Laptop2, ShieldCheck, Search, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";

export default function DeviceControl() {
  const [requests, setRequests] = useState([
    { id: "req-1", studentName: "Julian Mayer", studentId: "AZ-44821", deviceReqName: "iPad Pro 12.9\"", type: "Permanent Switch", reqDate: "2026-04-18" },
    { id: "req-2", studentName: "Kevin Dubois", studentId: "AZ-55677", deviceReqName: "Dell XPS 15", type: "Temp (24 Hrs)", reqDate: "2026-04-18" },
    { id: "req-3", studentName: "Elena Rodriguez", studentId: "AZ-92841", deviceReqName: "MacBook Air", type: "Permanent Switch", reqDate: "2026-04-17" },
  ]);

  const handleAuthorize = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleDecline = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 pb-16">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Device Control & Security</h1>
          <p className="text-on_surface_variant max-w-2xl">
            Manage student hardware linking, approve device transition requests, and monitor terminal integrity for Azure Academy portal.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Lookup */}
          <KnowledgeCard>
            <CardHeader>
              <CardTitle>Student Device Lookup</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
               <div className="relative mb-8">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                 <input 
                   type="text" 
                   placeholder="Enter Student Name or AZ-ID..." 
                   className="w-full bg-surface_container_low border border-outline_variant/30 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                   defaultValue="Elena Rodriguez"
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-surface_container_low border border-outline_variant/20">
                  <div className="flex gap-4 items-center">
                     <div className="w-16 h-16 rounded-2xl bg-surface_container_highest flex items-center justify-center text-primary">
                        <Laptop2 className="w-10 h-10" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Current Linked Device</p>
                        <h4 className="font-bold text-on_surface underline decoration-primary/30 underline-offset-4">MacBook Pro 14&quot; (M2 Max)</h4>
                        <p className="text-[10px] text-outline font-mono mt-1">MAC-A1B2-C3D4</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Last Sync</p>
                        <p className="text-sm font-bold text-on_surface">2 mins ago</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-outline uppercase tracking-wider">IP Address</p>
                        <p className="text-sm font-bold text-on_surface">192.168.1.144</p>
                     </div>
                  </div>
                  <div className="md:col-span-2 flex justify-between items-center pt-4 border-t border-outline_variant/10">
                     <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Security Status: Single-Device Locked</span>
                     </div>
                     <button className="text-xs font-bold text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-colors">Force Unlink</button>
                  </div>
               </div>
            </CardBody>
          </KnowledgeCard>

          {/* Queue */}
          <KnowledgeCard>
            <CardHeader className="flex justify-between items-center mb-0 border-b border-outline_variant/10 pb-6">
              <CardTitle>Device Change Requests</CardTitle>
              <span className="text-xs font-bold text-outline uppercase tracking-widest">{requests.length} Pending</span>
            </CardHeader>
            <CardBody className="p-0">
               {requests.length === 0 && (
                 <div className="p-8 text-center text-on_surface_variant">
                   No pending device requests.
                 </div>
               )}
               {requests.map((req) => (
                 <div key={req.id} className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-outline_variant/10 last:border-0 hover:bg-surface_container_low transition-colors group">
                    <div className="flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-full bg-surface_container_highest flex items-center justify-center font-bold text-primary">
                         {req.studentName[0]}
                       </div>
                       <div>
                          <h5 className="font-bold text-on_surface">{req.studentName}</h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-1.5 rounded-sm">{req.type}</span>
                            <span className="text-xs text-on_surface_variant">Req: {req.deviceReqName}</span>
                          </div>
                          
                       </div>
                    </div>
                    <div className="flex gap-3 mt-4 sm:mt-0">
                       <button onClick={() => handleDecline(req.id)} className="px-4 py-2 rounded-lg bg-surface_container_highest text-xs font-bold text-on_surface hover:bg-outline_variant/30 transition-colors">Decline</button>
                       <button onClick={() => handleAuthorize(req.id)} className="px-4 py-2 rounded-lg bg-primary text-on_primary text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-transform">Authorize</button>
                    </div>
                 </div>
               ))}
            </CardBody>
          </KnowledgeCard>
        </div>

        {/* Info / Sidebar */}
        <div className="space-y-8">
           <KnowledgeCard className="bg-primary text-on_primary border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-on_primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <CardBody className="p-8 relative z-10">
                 <div className="flex gap-4 items-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-on_primary_container" />
                    <div>
                       <h4 className="font-manrope font-bold text-lg leading-tight">Security Protocol</h4>
                       <p className="text-xs text-on_primary_container opacity-80">Anti-Fraud Protection: Active</p>
                    </div>
                 </div>
                 <p className="text-sm text-on_primary_container leading-relaxed mb-6">
                   All student accounts are inherently restricted to a single registered hardware hash. Secondary logins will automatically be blocked until requested here.
                 </p>
                 <div className="p-4 rounded-xl bg-on_primary/10 border border-on_primary/20">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Fraud Detection</span>
                       <CheckCircle2 className="w-4 h-4 text-secondary_fixed" />
                    </div>
                    <p className="text-xs font-bold">100% Account Integrity</p>
                 </div>
              </CardBody>
           </KnowledgeCard>

           <div className="grid grid-cols-1 gap-4">
              <KnowledgeCard className="p-6 border-error/20 bg-error/5">
                 <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-xl bg-error/10 text-error">
                       <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-error uppercase tracking-wider">Blocked Access Attempts</p>
                       <h4 className="text-2xl font-bold font-manrope text-error">12</h4>
                       <p className="text-[10px] text-on_surface_variant mt-1 font-semibold">Flagged due to unapproved MAC signatures</p>
                    </div>
                 </div>
              </KnowledgeCard>
           </div>
        </div>
      </div>
    </div>
  );
}
