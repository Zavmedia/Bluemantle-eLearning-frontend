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

      <h3 className="text-2xl font-manrope font-bold mt-12 mb-4">Upcoming Schedule</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Macroeconomics Recap", time: "Tomorrow, 2:00 PM", prof: "Dr. Hassan" },
          { title: "Algorithmic Trading Intro", time: "Friday, 10:00 AM", prof: "P. Sharma" }
        ].map((c, i) => (
          <KnowledgeCard key={i}>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-on_surface">{c.title}</h4>
                <p className="text-sm text-on_surface_variant">{c.time} • {c.prof}</p>
              </div>
              <button className="text-sm font-bold text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-on_primary transition-colors">
                Register
              </button>
            </div>
          </KnowledgeCard>
        ))}
      </div>
    </div>
  );
}
