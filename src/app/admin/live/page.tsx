import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { Video, Calendar, Plus, Info, Activity, Clock, Users, ArrowRight } from "lucide-react";

export default function ClassScheduling() {
  const upcomingSessions = [
    { title: "Advanced Quantum Mechanics", teacher: "Prof. Sarah Chen", date: "Oct 28, 2024", time: "10:00 AM", capacity: "150/150", status: "Full" },
    { title: "Ethical AI Frameworks", teacher: "Dr. Julian Azure", date: "Oct 29, 2024", time: "02:00 PM", capacity: "85/200", status: "Open" },
    { title: "Micro-Economics Policy", teacher: "Prof. David Miller", date: "Oct 30, 2024", time: "09:00 AM", capacity: "120/120", status: "Full" },
  ];

  return (
    <div className="space-y-8 pb-16">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Live Class Scheduling</h1>
          <p className="text-on_surface_variant">Manage and coordinate real-time broadcasts across Azure Academy.</p>
        </div>
        <button className="bg-primary text-on_primary px-6 py-2.5 rounded-full font-bold shadow-ambient flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm">
          <Plus className="w-4 h-4" /> Schedule New Session
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Scheduling Form / Info */}
        <div className="lg:col-span-2 space-y-8">
           <KnowledgeCard className="bg-surface_container_low border-primary/20">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" /> Create New Live Session
                 </CardTitle>
                 <p className="text-xs text-on_surface_variant mt-1 font-medium">Coordinate your next global broadcast.</p>
              </CardHeader>
              <CardBody className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Class Title</label>
                       <input type="text" className="w-full bg-surface_container_lowest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" placeholder="e.g. Quantum Computing 101" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Assign Faculty</label>
                       <select className="w-full bg-surface_container_lowest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none">
                          <option>Select Professor</option>
                          <option>Dr. Sarah Jenkins</option>
                          <option>Prof. Marcus Thorne</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Date & Time</label>
                       <input type="datetime-local" className="w-full bg-surface_container_lowest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Student Capacity</label>
                       <input type="number" className="w-full bg-surface_container_lowest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" placeholder="Max students" />
                    </div>
                 </div>
                 
                 <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                       <h5 className="text-sm font-bold text-primary">Scheduling Tip</h5>
                       <p className="text-xs text-on_surface_variant leading-relaxed">
                          Azure Academy recommends scheduling sessions at least 48 hours in advance to ensure student notification systems are triggered correctly.
                       </p>
                    </div>
                 </div>

                 <button className="w-full bg-primary text-on_primary py-4 rounded-xl font-bold text-sm shadow-ambient hover:opacity-90 transition-opacity">
                    Confirm Broadcast Schedule
                 </button>
              </CardBody>
           </KnowledgeCard>

           <div className="space-y-4">
              <h2 className="text-xl font-bold font-manrope text-on_surface mb-4 px-2">Scheduled Live Sessions</h2>
              <div className="grid grid-cols-1 gap-4">
                 {upcomingSessions.map((session) => (
                   <div key={session.title} className="flex flex-col md:flex-row justify-between items-center p-6 bg-surface_container_lowest rounded-2xl border border-outline_variant/10 shadow-sm hover:shadow-ambient transition-all group">
                      <div className="flex gap-4 items-center">
                         <div className="w-12 h-12 rounded-2xl bg-surface_container_high text-primary flex items-center justify-center font-bold">
                            <Calendar className="w-6 h-6" />
                         </div>
                         <div>
                            <h4 className="font-bold text-on_surface">{session.title}</h4>
                            <p className="text-xs text-on_surface_variant">{session.teacher} • {session.date} at {session.time}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 mt-4 md:mt-0">
                         <div className="text-right">
                            <p className="text-sm font-bold text-on_surface">{session.capacity}</p>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${session.status === 'Full' ? 'text-error' : 'text-primary'}`}>
                               {session.status} Seats
                            </span>
                         </div>
                         <button className="p-2 hover:bg-surface_container_high rounded-full transition-colors">
                            <ArrowRight className="w-5 h-5 text-outline" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <KnowledgeCard className="p-8">
              <div className="flex gap-4 items-center mb-6">
                 <div className="p-3 rounded-xl bg-surface_container_high text-secondary">
                    <Activity className="w-6 h-6" />
                 </div>
                 <h4 className="font-manrope font-bold text-lg leading-tight">Capacity Insights</h4>
              </div>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-outline mb-2">
                       <span>Teacher Bandwidth</span>
                       <span>65% utilized</span>
                    </div>
                    <div className="h-1.5 bg-surface_container_highest rounded-full overflow-hidden">
                       <div className="h-full bg-secondary" style={{ width: '65%' }} />
                    </div>
                 </div>
                 <div className="pt-4 border-t border-outline_variant/10">
                    <div className="flex justify-between items-center">
                       <p className="text-sm font-bold text-on_surface">14 Active Sessions</p>
                       <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">This Week</span>
                    </div>
                 </div>
              </div>
           </KnowledgeCard>

           <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
              <div className="flex gap-4 items-start">
                 <Clock className="w-5 h-5 text-secondary mt-0.5" />
                 <div>
                    <h4 className="text-sm font-bold text-on_surface">Auto-Notification</h4>
                    <p className="text-xs text-on_surface_variant mt-1 leading-relaxed">
                       Once a session is confirmed, calendar invites and SMS reminders are automatically dispatched to all enrolled students.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
