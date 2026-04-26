"use client";

import { useEffect, useState, use } from "react";
import { KnowledgeCard, CardBody } from "@/components/KnowledgeCard";
import { 
  ArrowLeft, Plus, Trash2, GripVertical, 
  Save, Video, FileText, ChevronRight, Layout 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CourseContentEditor({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const [catalog, setCatalog] = useState<any[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/institutional")
      .then((res) => res.json())
      .then((data) => {
        setCatalog(data.courseCatalog);
        setCourse(data.courseCatalog.find((c: any) => c.id === courseId));
      });
  }, [courseId]);

  const saveChanges = async (updatedCourse: any) => {
    setIsSaving(true);
    const newCatalog = catalog.map(c => c.id === courseId ? updatedCourse : c);
    
    await fetch("/api/institutional", {
      method: "POST",
      body: JSON.stringify({
        action: "updateCatalog",
        payload: { catalog: newCatalog }
      })
    });
    
    setCourse(updatedCourse);
    setCatalog(newCatalog);
    setIsSaving(false);
  };

  const addModule = () => {
    const newModule = {
      id: `mod-${Date.now()}`,
      title: "New Module",
      chapters: []
    };
    saveChanges({ ...course, modules: [...course.modules, newModule] });
  };

  const addChapter = (modId: string) => {
    const newChapter = {
      id: `ch-${Date.now()}`,
      title: "New Chapter",
      duration: "00:00",
      videoUrl: "https://www.youtube.com/embed/"
    };
    const newModules = course.modules.map((m: any) => 
      m.id === modId ? { ...m, chapters: [...m.chapters, newChapter] } : m
    );
    saveChanges({ ...course, modules: newModules });
  };

  const updateChapter = (modId: string, chId: string, field: string, value: string) => {
    const newModules = course.modules.map((m: any) => 
      m.id === modId ? {
        ...m,
        chapters: m.chapters.map((c: any) => c.id === chId ? { ...c, [field]: value } : c)
      } : m
    );
    setCourse({ ...course, modules: newModules });
  };

  const deleteChapter = (modId: string, chId: string) => {
    const newModules = course.modules.map((m: any) => 
      m.id === modId ? {
        ...m,
        chapters: m.chapters.filter((c: any) => c.id !== chId)
      } : m
    );
    saveChanges({ ...course, modules: newModules });
  };

  if (!course) return <div className="p-20 text-center">Loading Course Content...</div>;

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses" className="p-2 hover:bg-surface_container_high rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-manrope font-bold tracking-tight">{course.title}</h1>
            <p className="text-sm text-on_surface_variant">Content Management & Structure</p>
          </div>
        </div>
        <button 
          onClick={() => saveChanges(course)}
          disabled={isSaving}
          className="bg-primary text-on_primary px-8 py-2.5 rounded-full font-bold shadow-ambient flex items-center gap-2 hover:opacity-90 transition-all text-sm disabled:opacity-50"
        >
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Content</>}
        </button>
      </header>

      <div className="space-y-6">
        {course.modules.map((mod: any, modIdx: number) => (
          <div key={mod.id} className="bg-surface_container_lowest rounded-2xl border border-outline_variant/20 overflow-hidden shadow-sm">
            <div className="bg-surface_container_low px-6 py-4 flex justify-between items-center border-b border-outline_variant/10">
               <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {modIdx + 1}
                  </div>
                  <input 
                    className="bg-transparent font-bold font-manrope text-lg focus:outline-none border-b border-transparent focus:border-primary/40 px-1"
                    value={mod.title}
                    onChange={(e) => {
                      const newModules = course.modules.map((m:any) => m.id === mod.id ? {...m, title: e.target.value} : m);
                      setCourse({...course, modules: newModules});
                    }}
                  />
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-xs text-on_surface_variant font-medium">{mod.chapters.length} Chapters</span>
                  <button className="text-error hover:bg-error/5 p-2 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>

            <div className="p-6 space-y-4">
               {mod.chapters.map((chapter: any, chIdx: number) => (
                 <div key={chapter.id} className="flex gap-4 items-start bg-surface_container_low/40 p-4 rounded-xl border border-outline_variant/10 group">
                    <div className="mt-2 text-outline group-hover:text-primary transition-colors">
                       <GripVertical className="w-4 h-4 cursor-move" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                       <div className="md:col-span-5">
                          <label className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1 block">Title</label>
                          <input 
                            className="w-full bg-surface_container_lowest border border-outline_variant/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                            value={chapter.title}
                            onChange={(e) => updateChapter(mod.id, chapter.id, 'title', e.target.value)}
                          />
                       </div>
                       <div className="md:col-span-5">
                          <label className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1 block">Video URL (YouTube Embed)</label>
                          <input 
                            className="w-full bg-surface_container_lowest border border-outline_variant/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                            value={chapter.videoUrl}
                            onChange={(e) => updateChapter(mod.id, chapter.id, 'videoUrl', e.target.value)}
                          />
                       </div>
                       <div className="md:col-span-2">
                          <label className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1 block">Duration</label>
                          <input 
                            className="w-full bg-surface_container_lowest border border-outline_variant/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                            value={chapter.duration}
                            onChange={(e) => updateChapter(mod.id, chapter.id, 'duration', e.target.value)}
                          />
                       </div>
                       <div className="md:col-span-12">
                          <label className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1 block">Chapter Description</label>
                          <textarea 
                            rows={2}
                            className="w-full bg-surface_container_lowest border border-outline_variant/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 resize-none"
                            placeholder="Briefly describe what this chapter covers..."
                            value={chapter.description || ""}
                            onChange={(e) => updateChapter(mod.id, chapter.id, 'description', e.target.value)}
                          />
                       </div>
                    </div>
                    <button 
                      onClick={() => deleteChapter(mod.id, chapter.id)}
                      className="mt-6 p-2 text-on_surface_variant hover:text-error transition-colors"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
               ))}

               <button 
                onClick={() => addChapter(mod.id)}
                className="w-full py-4 border-2 border-dashed border-outline_variant/30 rounded-xl flex items-center justify-center gap-2 text-on_surface_variant hover:border-primary/40 hover:text-primary transition-all group"
               >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Add New Chapter</span>
               </button>
            </div>
          </div>
        ))}

        <button 
          onClick={addModule}
          className="w-full py-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary/10 transition-all group"
        >
           <Layout className="w-6 h-6 text-primary mb-1" />
           <span className="text-sm font-bold text-primary">Create New Module Section</span>
        </button>
      </div>
    </div>
  );
}
