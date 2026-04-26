"use client";

import { useEffect, useState, use } from "react";
import { KnowledgeCard, CardBody } from "@/components/KnowledgeCard";
import { 
  PlayCircle, CheckCircle2, ChevronDown, ChevronUp, 
  ArrowLeft, Lock, Play, Menu, X, Clock 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CoursePlayerPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const [data, setData] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState<any>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const studentId = "STU-8821";

  useEffect(() => {
    fetch("/api/institutional")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const course = data.courseCatalog.find((c: any) => c.id === courseId);
        const progress = data.userProgress?.[studentId]?.[courseId];
        
        if (course) {
          // If progress exists, set that chapter, otherwise first chapter
          let targetChapter = course.modules[0].chapters[0];
          let targetModuleId = course.modules[0].id;

          if (progress) {
            const mod = course.modules.find((m: any) => m.id === progress.lastModuleId);
            const ch = mod?.chapters.find((c: any) => c.id === progress.lastChapterId);
            if (ch) {
              targetChapter = ch;
              targetModuleId = progress.lastModuleId;
            }
          }
          
          setActiveChapter(targetChapter);
          setExpandedModules(new Set([targetModuleId]));
        }
      });
  }, [courseId]);

  const toggleModule = (modId: string) => {
    const next = new Set(expandedModules);
    if (next.has(modId)) next.delete(modId);
    else next.add(modId);
    setExpandedModules(next);
  };

  const selectChapter = async (modId: string, chapter: any) => {
    setActiveChapter(chapter);
    
    // Save progress to DB
    await fetch("/api/institutional", {
      method: "POST",
      body: JSON.stringify({
        action: "updateProgress",
        payload: { studentId, courseId, moduleId: modId, chapterId: chapter.id }
      })
    });
  };

  if (!data || !activeChapter) return <div className="h-screen flex items-center justify-center animate-pulse">Initializing Player...</div>;

  const course = data.courseCatalog.find((c: any) => c.id === courseId);

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col">
      {/* Top Nav */}
      <header className="h-16 border-b border-outline_variant/20 bg-surface_container_lowest flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/student/recorded" className="p-2 hover:bg-surface_container_high rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-on_surface" />
          </Link>
          <div className="h-8 w-px bg-outline_variant/20 mx-2" />
          <h1 className="font-manrope font-bold text-lg truncate max-w-md">{course.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Instructor</span>
            <span className="text-sm font-semibold">{course.instructor}</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 bg-surface_container_high rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Player Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-black flex flex-col relative group">
          {/* Dynamic Security Watermark */}
          <div className="absolute top-1/4 left-1/4 pointer-events-none z-50 opacity-20 select-none animate-pulse">
             <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 rotate-[-15deg]">
                <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1">Protected Content</p>
                <p className="text-sm font-manrope font-bold text-white">User: John Doe (STU-8821)</p>
                <p className="text-[8px] text-white/60 font-medium">john@bluemantle.com • {new Date().toLocaleDateString()}</p>
             </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
             <iframe 
                src={`${activeChapter.videoUrl}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`} 
                className="w-full h-full"
                allowFullScreen
                title={activeChapter.title}
             />
          </div>
          <div className="bg-surface_container_lowest p-8 shrink-0">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-manrope font-bold mb-4">{activeChapter.title}</h2>
                <div className="flex items-center gap-4 text-on_surface_variant text-sm mb-8">
                   <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {activeChapter.duration}</span>
                   <span className="w-1.5 h-1.5 rounded-full bg-outline_variant/40" />
                   <span>Module: {course.modules.find((m:any) => m.chapters.some((ch:any) => ch.id === activeChapter.id))?.title}</span>
                </div>
                <div className="space-y-4">
                   <h4 className="font-bold">About this chapter</h4>
                   <p className="text-on_surface_variant leading-relaxed">
                      {activeChapter.description || "This lecture covers the fundamental concepts required to master this section of the course. Ensure you have your notes ready and follow along with the practical exercises shown in the video."}
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <aside className={cn(
          "w-80 border-l border-outline_variant/20 bg-surface_container_low flex flex-col transition-all duration-300 fixed lg:relative inset-y-0 right-0 z-50 lg:z-auto",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"
        )}>
           <div className="p-4 border-b border-outline_variant/20 bg-surface_container_lowest flex justify-between items-center">
              <h3 className="font-bold font-manrope text-sm uppercase tracking-wider text-on_surface_variant">Course Content</h3>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">65% DONE</span>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {course.modules.map((mod: any, modIdx: number) => {
                const isExpanded = expandedModules.has(mod.id);
                return (
                  <div key={mod.id} className="border-b border-outline_variant/10">
                    <button 
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 flex items-start gap-3 hover:bg-surface_container_high transition-colors text-left"
                    >
                      <div className="mt-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold leading-tight mb-1">Module {modIdx + 1}: {mod.title}</h4>
                        <span className="text-[10px] text-on_surface_variant font-medium">{mod.chapters.length} Lectures • 1h 45m</span>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-surface_container_lowest">
                        {mod.chapters.map((chapter: any, chIdx: number) => {
                          const isActive = activeChapter.id === chapter.id;
                          return (
                            <button
                              key={chapter.id}
                              onClick={() => selectChapter(mod.id, chapter)}
                              className={cn(
                                "w-full p-4 pl-11 flex items-start gap-3 hover:bg-primary/5 transition-colors text-left border-l-2",
                                isActive ? "border-primary bg-primary/5" : "border-transparent"
                              )}
                            >
                               <div className="mt-0.5 shrink-0">
                                  {isActive ? <Play className="w-3.5 h-3.5 text-primary fill-primary" /> : <PlayCircle className="w-3.5 h-3.5 text-on_surface_variant" />}
                               </div>
                               <div className="flex-1">
                                  <h5 className={cn("text-xs font-semibold leading-snug", isActive ? "text-primary" : "text-on_surface")}>
                                     {chIdx + 1}. {chapter.title}
                                  </h5>
                                  <div className="flex items-center gap-2 mt-1">
                                     <PlayCircle className="w-3 h-3 text-on_surface_variant" />
                                     <span className="text-[10px] text-on_surface_variant">{chapter.duration}</span>
                                  </div>
                               </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
           </div>
        </aside>
      </div>
    </div>
  );
}
