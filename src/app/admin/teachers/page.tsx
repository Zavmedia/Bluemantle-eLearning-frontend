"use client";

import { useState, useMemo } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { DataTable } from "@/components/DataTable";
import { SwitchButton3D } from "@/components/SwitchButton3D";
import { GraduationCap, UserPlus, Search, Filter, MoreVertical, Star, BookOpen, Activity, X } from "lucide-react";

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<any[]>([]);

  // Load teachers from API on mount
  React.useEffect(() => {
    fetch("/api/institutional")
      .then(res => res.json())
      .then(data => setTeachers(data.teachers || []));
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form State
  const [newFaculty, setNewFaculty] = useState({ name: "", role: "", email: "", userId: "", password: "" });

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teachers, searchQuery]);

  const handleRecruit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.email || !newFaculty.userId || !newFaculty.password) return alert("Please fill all required fields.");

    try {
      const res = await fetch("/api/institutional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createUser",
          payload: {
            user: {
              name: newFaculty.name,
              email: newFaculty.email,
              userId: newFaculty.userId,
              password: newFaculty.password,
              role: "teacher",
              title: newFaculty.role || "Standard Faculty",
              batches: 0,
              rating: 0.0,
            }
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setTeachers([...teachers, data.user]);
        setNewFaculty({ name: "", role: "", email: "", userId: "", password: "" });
        setIsAddModalOpen(false);
      } else {
        alert("Failed to recruit faculty");
      }
    } catch (err) {
      alert("Error recruiting faculty");
    }
  };

  const removeFaculty = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };


  const columns = [
    { 
      key: "name", 
      header: "Faculty Member",
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-signature-gradient text-on_primary flex items-center justify-center font-bold text-sm shadow-sm">
            {val.split(' ').map(n => n[0]).join('').substring(0,2)}
          </div>
          <div>
            <p className="font-bold text-on_surface">{val}</p>
            <p className="text-[10px] text-outline uppercase tracking-wider">{row.role}</p>
          </div>
        </div>
      )
    },
    { key: "email", header: "Email Address" },
    { key: "batches", header: "Active Batches" },
    { 
      key: "rating", 
      header: "Rating",
      render: (val: number) => (
        <div className="flex items-center gap-1 text-secondary font-bold">
          <Star className="w-3 h-3 fill-current" />
          <span>{val > 0 ? val : "N/A"}</span>
        </div>
      )
    },
    { 
      key: "status", 
      header: "Status",
      render: (val: string) => (
        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-sm bg-primary/10 text-primary">
          {val}
        </span>
      )
    },
    {
      key: "actions",
      header: "",
      render: (_: any, row: any) => (
        <div className="flex gap-2">
           <button onClick={() => removeFaculty(row.id)} className="p-2 text-error hover:bg-error/10 rounded-full transition-colors" title="Remove Faculty">
             <X className="w-4 h-4" />
           </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Teacher Management</h1>
          <p className="text-on_surface_variant max-w-2xl">
            Oversee Azure Academy&apos;s distinguished faculty. Assign academic cohorts, manage instructional permissions, and monitor active teaching schedules.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-secondary text-on_secondary px-6 py-2.5 rounded-full font-bold shadow-ambient flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm"
        >
          <UserPlus className="w-4 h-4" /> Recruit Faculty
        </button>
      </header>

      {/* Stats Quick View */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Faculty", value: teachers.length.toString(), icon: GraduationCap },
          { label: "Active Batches", value: teachers.reduce((acc, curr) => acc + curr.batches, 0).toString(), icon: BookOpen },
          { label: "Avg. Rating", value: (teachers.reduce((acc, curr) => acc + curr.rating, 0) / (teachers.filter(t => t.rating > 0).length || 1)).toFixed(1), icon: Star },
          { label: "Pending Apps", value: "12", icon: Activity },
        ].map((stat) => (
          <KnowledgeCard key={stat.label} className="p-6">
             <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-surface_container_high text-secondary">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-outline uppercase tracking-wider">{stat.label}</p>
                   <h3 className="text-2xl font-bold font-manrope">{stat.value}</h3>
                </div>
             </div>
          </KnowledgeCard>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2">
          <KnowledgeCard>
            <CardHeader className="flex justify-between items-center border-b border-outline_variant/10 pb-6 mb-0">
              <CardTitle>Faculty Directory</CardTitle>
              <div className="flex gap-2 items-center">
                 {isSearchOpen && (
                   <input 
                     type="text" 
                     placeholder="Search faculty..." 
                     autoFocus
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="px-3 py-1.5 text-sm bg-surface_container_highest border border-outline_variant/30 rounded-lg focus:outline-none focus:border-primary transition-colors text-on_surface animate-in slide-in-from-right-4 w-48"
                   />
                 )}
                 <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 border border-outline_variant/30 rounded-lg hover:bg-surface_container_high transition-colors ${isSearchOpen ? 'bg-surface_container_high' : ''}`}>
                   <Search className="w-4 h-4 text-on_surface_variant" />
                 </button>
                 <button className="p-2 border border-outline_variant/30 rounded-lg hover:bg-surface_container_high transition-colors">
                   <Filter className="w-4 h-4 text-on_surface_variant" />
                 </button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <DataTable columns={columns} data={filteredTeachers} />
              
              {/* Added 3D tactile pagination identically to admin/students */}
              <div className="p-6 flex justify-between items-center border-t border-outline_variant/10 bg-surface_container_lowest">
                 <p className="text-xs text-on_surface_variant">Displaying 1-{filteredTeachers.length} of {teachers.length}</p>
                 <div className="flex gap-3 items-center">
                    <SwitchButton3D>Prev</SwitchButton3D>
                    <span className="font-bold text-on_surface px-2">1</span>
                    <SwitchButton3D>Next</SwitchButton3D>
                 </div>
              </div>
            </CardBody>
          </KnowledgeCard>
        </div>

        {/* Access Control & Info */}
        <div className="space-y-6">
          <KnowledgeCard className="bg-surface_container_low border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-primary" /> Role Access
              </CardTitle>
            </CardHeader>
            <CardBody className="space-y-6">
               <div className="space-y-2">
                  <h4 className="font-bold text-sm text-on_surface flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Standard Faculty
                  </h4>
                  <p className="text-xs text-on_surface_variant leading-relaxed pl-3.5">
                    Classroom management, grading, and student communications.
                  </p>
               </div>
               <div className="space-y-2">
                  <h4 className="font-bold text-sm text-on_surface flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Department Head
                  </h4>
                  <p className="text-xs text-on_surface_variant leading-relaxed pl-3.5">
                    Curriculum oversight and department performance analytics.
                  </p>
               </div>
            </CardBody>
          </KnowledgeCard>

          <KnowledgeCard className="bg-signature-gradient text-on_primary border-none shadow-ambient">
            <CardBody className="p-8">
               <h3 className="text-lg font-manrope font-bold mb-2">Performance Reviews</h3>
               <p className="text-sm text-on_primary_container mb-6 opacity-90 leading-relaxed">
                 Mid-semester faculty appraisals are now open. Ensure all performance data is synced before generating the quarterly report.
               </p>
               <button className="w-full bg-surface text-primary py-3 rounded-full font-bold text-sm shadow-sm hover:bg-surface_bright transition-colors">
                 Initiate Reviews
               </button>
            </CardBody>
          </KnowledgeCard>
        </div>
      </div>

      {/* Recruit Faculty Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface_container_lowest w-full max-w-md rounded-3xl shadow-ambient border border-outline_variant/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-outline_variant/10">
              <h2 className="text-xl font-bold text-on_surface font-manrope">Recruit New Faculty</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-on_surface_variant hover:text-on_surface p-2 rounded-full hover:bg-surface_container_high transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleRecruit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newFaculty.name}
                  onChange={e => setNewFaculty({...newFaculty, name: e.target.value})}
                  className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors"
                  placeholder="e.g. Dr. Alan Turing" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Official Email</label>
                <input 
                  type="email" 
                  required
                  value={newFaculty.email}
                  onChange={e => setNewFaculty({...newFaculty, email: e.target.value})}
                  className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors"
                  placeholder="name@academy.edu" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">User ID (Login)</label>
                  <input required type="text" value={newFaculty.userId} onChange={(e) => setNewFaculty({ ...newFaculty, userId: e.target.value })} className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors" placeholder="TCH-1001" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Password (Login)</label>
                  <input required type="text" value={newFaculty.password} onChange={(e) => setNewFaculty({ ...newFaculty, password: e.target.value })} className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors" placeholder="teacher123" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Assigned Role & Department</label>
                <input 
                  type="text" 
                  value={newFaculty.role}
                  onChange={e => setNewFaculty({...newFaculty, role: e.target.value})}
                  className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors"
                  placeholder="e.g. Senior Professor of AI" 
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full btn-premium py-3.5 text-sm">
                  Send Invitation Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="pt-8 border-t border-outline_variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-outline text-[10px] font-bold uppercase tracking-widest">
         <span>© 2024 Azure Academy • Intellectual Elegance System</span>
         <div className="flex gap-6">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Faculty Handbook</button>
            <button className="hover:text-primary transition-colors">System Health</button>
         </div>
      </footer>
    </div>
  );
}

// Icon helper
function BadgeCheck({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
