import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { BookOpen, Plus, Search, Filter, Layers, Clock, Settings2, ChevronRight } from "lucide-react";

export default function CourseManagement() {
  const courses = [
    { title: "Advanced Quantum Mechanics", level: "Graduate", modules: 12, students: 142, status: "Active" },
    { title: "Introduction to Ethics in AI", level: "Undergraduate", modules: 8, students: 850, status: "Active" },
    { title: "Micro-Economics & Policy", level: "Intermediate", modules: 10, students: 320, status: "Active" },
    { title: "Neural Network Architectures", level: "Graduate", modules: 15, students: 98, status: "Draft" },
  ];

  return (
    <div className="space-y-8 pb-16">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Academic Content Hub</h1>
          <p className="text-on_surface_variant">Design and structure high-impact learning experiences for Azure Academy.</p>
        </div>
        <button className="bg-primary text-on_primary px-6 py-2.5 rounded-full font-bold shadow-ambient flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm">
          <Plus className="w-4 h-4" /> Define New Course
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-manrope text-on_surface">Active Curriculum</h2>
            <div className="flex gap-2">
               <button className="p-2 bg-surface_container_low rounded-lg hover:bg-surface_container_high transition-colors">
                 <Search className="w-4 h-4 text-outline" />
               </button>
               <button className="p-2 bg-surface_container_low rounded-lg hover:bg-surface_container_high transition-colors">
                 <Filter className="w-4 h-4 text-outline" />
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <KnowledgeCard key={course.title} className="p-0 overflow-hidden group hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-center p-6 gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-surface_container_high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-on_surface">{course.title}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${course.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-surface_container_highest text-outline'}`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-on_surface_variant">
                      <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {course.modules} Modules</span>
                      <span className="flex items-center gap-1 font-bold text-secondary">● {course.level}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </KnowledgeCard>
            ))}
          </div>
        </div>

        {/* Builder / Quick Edit */}
        <div className="space-y-6">
           <KnowledgeCard className="bg-surface_container_low shadow-none">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <Settings2 className="w-5 h-5 text-primary" /> Curriculum Builder
               </CardTitle>
               <p className="text-xs text-on_surface_variant mt-1">Editing: Advanced Quantum Mechanics</p>
             </CardHeader>
             <CardBody className="space-y-6">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-outline">Content Sequence</h4>
                   <div className="space-y-2">
                      {[
                        { title: "Wave Duality", duration: "45m" },
                        { title: "Uncertainty Principle", duration: "60m" },
                        { title: "Schrödinger Equation", duration: "90m" },
                      ].map((mod, i) => (
                        <div key={mod.title} className="flex items-center gap-3 p-3 bg-surface_container_lowest rounded-xl border border-outline_variant/20">
                          <span className="text-xs font-bold text-outline w-4">{i + 1}</span>
                          <div className="flex-1">
                             <p className="text-sm font-bold text-on_surface leading-none">{mod.title}</p>
                             <span className="text-[10px] text-on_surface_variant flex items-center gap-1 mt-1">
                               <Clock className="w-3 h-3" /> {mod.duration}
                             </span>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
                <button className="w-full bg-primary text-on_primary py-3 rounded-xl font-bold text-sm shadow-ambient hover:scale-[1.02] active:scale-95 transition-all">
                  Add Next Module
                </button>
             </CardBody>
           </KnowledgeCard>
           
           <KnowledgeCard className="bg-secondary/5 border-secondary/20 shadow-none">
              <CardBody className="p-6">
                 <h4 className="font-bold text-on_surface mb-1">Collaborative Design</h4>
                 <p className="text-xs text-on_surface_variant leading-relaxed">
                   2 faculty members are currently viewing this curriculum design.
                 </p>
              </CardBody>
           </KnowledgeCard>
        </div>
      </div>
    </div>
  );
}
