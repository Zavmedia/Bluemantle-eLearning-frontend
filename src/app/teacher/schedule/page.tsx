"use client";

import { useState, useEffect } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { 
  Calendar, Clock, MapPin, Users, BookOpen, 
  AlertCircle, ChevronRight, Activity, MoreVertical,
  CalendarDays, Share2, UserCheck, MessageSquare, CheckCircle2
} from "lucide-react";

export default function ClassSchedule() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [activeActions, setActiveActions] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    fetch("/api/institutional")
      .then(res => res.json())
      .then(data => setSchedule(data.schedule));
  }, []);

  const triggerNotification = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 4000);
  };

  const handleAction = (type: string, id: number) => {
    const item = schedule.find(s => s.id === id);
    if (!item) return;

    if (type === 'reschedule') triggerNotification(`Rescheduling protocol initiated for ${item.topic}. Notifications sent to students.`);
    if (type === 'postpone') triggerNotification(`Class "${item.topic}" postponed. WhatsApp alerts dispatched to Batch.`);
    if (type === 'mentor') triggerNotification(`Mentor handover initiated. Request sent to Department Head.`);
    
    setActiveActions(null);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-500 relative">
      
      {/* Toast Notification */}
      {statusMsg && (
        <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right-8 fade-in flex items-center gap-3 bg-secondary_container text-on_secondary_container p-4 rounded-2xl shadow-ambient border border-secondary/20">
           <div className="p-2 bg-secondary text-on_secondary rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
           </div>
           <div>
              <p className="font-bold text-sm">Action Confirmed</p>
              <p className="text-xs opacity-80">{statusMsg}</p>
           </div>
        </div>
      )}

      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Class Schedule</h1>
          <p className="text-on_surface_variant max-w-2xl text-sm italic">
            "Design the student journey. Orchestrate the academic flow with absolute precision."
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="flex justify-between items-center px-2">
              <div className="flex gap-4 items-center">
                 <h2 className="text-xl font-bold font-manrope text-on_surface text-primary">Academic Week 12</h2>
                 <span className="text-[10px] font-bold text-outline border border-outline_variant/30 px-2 py-0.5 rounded-full uppercase tracking-widest">Oct 24 - Oct 30</span>
              </div>
              <button className="p-2 bg-surface_container_low rounded-lg hover:bg-surface_container_high transition-colors"><Activity className="w-4 h-4 text-outline" /></button>
           </div>

           <div className="space-y-4">
              {schedule.map((item) => (
                <div key={item.id} className="relative group">
                  <KnowledgeCard className="p-0 overflow-hidden hover:border-secondary/30 transition-all cursor-pointer">
                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-outline_variant/10">
                        <div className="p-6 md:w-48 bg-surface_container_low/50 flex flex-col justify-center items-center md:items-start relative overflow-hidden">
                           <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">MONDAY</p>
                           <h4 className="text-xl font-bold font-manrope text-on_surface">{item.time}</h4>
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <CalendarDays className="w-12 h-12" />
                           </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col justify-center relative">
                           <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold text-lg text-on_surface group-hover:text-secondary transition-colors leading-snug">{item.topic}</h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveActions(activeActions === item.id ? null : item.id);
                                }}
                                className="p-2 hover:bg-surface_container_high rounded-full transition-colors"
                              >
                                <MoreVertical className="w-4 h-4 text-outline" />
                              </button>
                           </div>
                           <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3">Mentor: {item.teacher}</p>
                           <div className="flex flex-wrap items-center gap-4">
                              <span className="text-xs text-on_surface_variant flex items-center gap-1.5 font-medium">
                                 <MapPin className="w-3.5 h-3.5 text-secondary" /> Auditorium C
                              </span>
                              <span className="text-xs text-on_surface_variant flex items-center gap-1.5 font-medium">
                                 <Users className="w-3.5 h-3.5 text-secondary" /> {item.batch}
                              </span>
                           </div>

                           {/* Action Menu Popover */}
                           {activeActions === item.id && (
                             <div className="absolute right-4 top-12 z-50 w-56 bg-surface_container_lowest border border-outline_variant/30 rounded-2xl shadow-ambient overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <button onClick={() => handleAction('reschedule', item.id)} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-surface_container_high flex items-center gap-3 transition-colors text-on_surface">
                                   <Clock className="w-4 h-4 text-primary" /> Reschedule Session
                                </button>
                                <button onClick={() => handleAction('postpone', item.id)} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-surface_container_high flex items-center gap-3 transition-colors text-on_surface">
                                   <Calendar className="w-4 h-4 text-secondary" /> Postpone Class
                                </button>
                                <button onClick={() => handleAction('mentor', item.id)} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-surface_container_high flex items-center gap-3 transition-colors text-on_surface">
                                   <UserCheck className="w-4 h-4 text-primary" /> Change Mentor
                                </button>
                                <div className="p-3 bg-secondary/5 border-t border-outline_variant/10 flex items-center gap-2">
                                   <MessageSquare className="w-3 h-3 text-secondary" />
                                   <span className="text-[9px] font-black uppercase tracking-widest text-secondary">Broadcasting Enabled</span>
                                </div>
                             </div>
                           )}
                        </div>

                        <div className="p-6 flex items-center justify-center md:w-20 bg-surface_container_highest/30">
                           <ChevronRight className="w-5 h-5 text-outline group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                  </KnowledgeCard>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <KnowledgeCard className="p-8">
              <div className="flex gap-4 items-center mb-6">
                 <div className="p-3 rounded-xl bg-surface_container_high text-secondary">
                    <Clock className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Weekly Intensity</p>
                    <h3 className="text-3xl font-bold font-manrope">24.5h</h3>
                    <p className="text-[10px] text-on_surface_variant mt-1 font-semibold">Total Class Hours</p>
                 </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-outline_variant/10">
                 <button className="w-full bg-secondary text-on_secondary py-3.5 rounded-full font-bold text-sm shadow-glow-secondary hover:opacity-90 transition-opacity">
                    Add New Class Slot
                 </button>
              </div>
           </KnowledgeCard>

           <div className="p-8 rounded-[2rem] bg-surface_container_low border border-outline_variant/20 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-5 rotate-12">
                 <Share2 className="w-24 h-24" />
              </div>
              <div className="flex gap-4 items-start mb-4">
                 <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <AlertCircle className="w-5 h-5" />
                 </div>
                 <h4 className="font-bold text-on_surface">Communication Log</h4>
              </div>
              <p className="text-xs text-on_surface_variant leading-relaxed mb-6">
                 All schedule changes trigger encrypted WhatsApp messages via the **EduConnect Gateway** to ensure 100% student reach.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                 <Activity className="w-3 h-3" /> System Status: Online
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
