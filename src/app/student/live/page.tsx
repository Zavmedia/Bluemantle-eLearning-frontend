"use client";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { Clock } from "lucide-react";
import { LiveJoinManager } from "@/components/LiveJoinManager";

export default function LiveClassPage() {
  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-4xl font-manrope font-bold tracking-tight mb-6">Live Classes</h1>

      <KnowledgeCard className="bg-surface_container_lowest border-primary/20 shadow-ambient overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
              </span>
              <span className="text-sm font-bold text-error uppercase tracking-widest">Live Now</span>
            </div>

            <h2 className="text-3xl font-manrope font-bold mb-2">Options Pricing Models in Real-Time</h2>
            <p className="text-on_surface_variant text-lg mb-6">Instructor: Sarah Chen • Batch A • 10:00 AM - 11:30 AM</p>

            <LiveJoinManager />
          </div>

          <div className="bg-surface_container_low p-6 rounded-2xl border border-outline_variant/20 text-center min-w-[200px]">
            <span className="text-sm font-bold text-outline uppercase tracking-wider block mb-2">Session Timer</span>
            <div className="text-4xl font-manrope font-bold text-primary flex items-center justify-center gap-2">
              <Clock className="w-8 h-8 opacity-50" /> 45:12
            </div>
          </div>
        </div>
      </KnowledgeCard>

      <h3 className="text-2xl font-manrope font-bold mt-12 mb-4">Past Recorded Live Classes</h3>
      <div className="space-y-4">
        {[
          { 
            title: "Advanced Derivatives & Hedging", 
            date: "2026-04-25", 
            prof: "Sarah Chen", 
            youtubeId: "dQw4w9WgXcQ", 
            wasAttended: false 
          },
          { 
            title: "Market Microstructure Analysis", 
            date: "2026-04-20", 
            prof: "Dr. Hassan", 
            youtubeId: "dQw4w9WgXcQ", 
            wasAttended: true 
          }
        ].map((c, i) => {
          const classDate = new Date(c.date);
          const now = new Date();
          const daysDiff = Math.floor((now.getTime() - classDate.getTime()) / (1000 * 3600 * 24));
          const isWithinGracePeriod = daysDiff <= 7;
          
          return (
            <KnowledgeCard key={i}>
              <div className="p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-surface_container_high rounded-xl flex items-center justify-center overflow-hidden border border-outline_variant/20">
                     <div className="text-primary font-bold text-xs">REPLAY</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-on_surface">{c.title}</h4>
                    <p className="text-sm text-on_surface_variant">Held on {c.date} • {c.prof}</p>
                    <div className="mt-2 flex gap-2">
                       {c.wasAttended ? (
                         <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-1 rounded">Attended</span>
                       ) : isWithinGracePeriod ? (
                         <span className="text-[10px] font-bold uppercase bg-warning/10 text-warning px-2 py-1 rounded">Missed (Watch now for 'Late' Attendance)</span>
                       ) : (
                         <span className="text-[10px] font-bold uppercase bg-error/10 text-error px-2 py-1 rounded">Absent (Grace Period Expired)</span>
                       )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="btn-premium py-2 px-6 text-sm">
                    Watch Recording
                  </button>
                  {!c.wasAttended && isWithinGracePeriod && (
                    <button 
                      onClick={() => alert("Attendance marked as 'Late'. Logic needs to be linked to backend /api/attendance.")}
                      className="text-xs font-bold text-secondary border border-secondary px-4 py-2 rounded-full hover:bg-secondary hover:text-on_secondary transition-all"
                    >
                      Mark Attendance
                    </button>
                  )}
                </div>
              </div>
            </KnowledgeCard>
          );
        })}
      </div>
    </div>
  );
}
