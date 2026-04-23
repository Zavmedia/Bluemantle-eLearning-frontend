"use client";

import { useState, useMemo } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { DataTable } from "@/components/DataTable";
import { SwitchButton3D } from "@/components/SwitchButton3D";
import { Users, UserPlus, Search, Filter, MoreVertical, BadgeCheck, X, Activity, AlertTriangle } from "lucide-react";
import { PremiumSearch } from "@/components/PremiumSearch";

export default function StudentManagement() {
  const [students, setStudents] = useState([
    { name: "Elena Rodriguez", email: "elena.rodriguez@academy.edu", id: "STU-9284", cohort: "Advanced AI", status: "Active" },
    { name: "Julian Chen", email: "j.chen@academy.edu", id: "STU-8821", cohort: "Economics", status: "Active" },
    { name: "Markus Vance", email: "m.vance@academy.edu", id: "STU-7732", cohort: "Digital Arts", status: "Pending" },
    { name: "Sarah Jenkins", email: "sarah.j@academy.edu", id: "STU-6610", cohort: "Batch A", status: "Active" },
    { name: "David Miller", email: "d.miller@academy.edu", id: "STU-5541", cohort: "Batch B", status: "Active" },
    { name: "Elena Kostic", email: "e.kostic@academy.edu", id: "STU-4412", cohort: "Batch C", status: "Blocked" },
  ]);

  // Master Batch List with max capacity constants
  const [batches] = useState([
    { id: "b1", name: "Batch A", teacher: "Sarah Chen", maxCapacity: 100 },
    { id: "b2", name: "Batch B", teacher: "Julian Mayer", maxCapacity: 100 },
    { id: "b3", name: "Batch C", teacher: "Elena Kostic", maxCapacity: 100 },
    { id: "b4", name: "Advanced AI", teacher: "Dr. Vance", maxCapacity: 100 },
    { id: "b5", name: "Economics", teacher: "Prof. Smith", maxCapacity: 100 },
    { id: "b6", name: "Digital Arts", teacher: "Ms. Jenkins", maxCapacity: 100 }
  ]);

  // Calculate current enrollment per batch dynamically
  const batchStats = useMemo(() => {
    const stats: Record<string, number> = {};
    batches.forEach(b => stats[b.name] = 0);
    // Let's artificially inflate some batches for mock presentation testing
    stats["Batch A"] = 98; // almost full
    stats["Batch B"] = 100; // entirely full

    // Add real students in UI to these mock bases so the count is dynamic but high
    students.forEach(s => {
      if (stats[s.cohort] !== undefined) {
        if (s.cohort !== "Batch A" && s.cohort !== "Batch B") {
          stats[s.cohort] += 1;
        }
      }
    });
    return stats;
  }, [students, batches]);

  // Modals Data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", cohort: "", status: "Active" });

  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [studentToSwitch, setStudentToSwitch] = useState<any>(null);
  const [newBatchSelection, setNewBatchSelection] = useState("");

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.cohort) return alert("Must assign a valid cohort.");

    // Safety check against capacity
    if (batchStats[newStudent.cohort] >= 100) {
      return alert("Strict Blockage: This batch is at 100/100 capacity. Assignment blocked.");
    }

    const id = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    setStudents([{ ...newStudent, id }, ...students]);
    setIsModalOpen(false);
    setNewStudent({ name: "", email: "", cohort: "", status: "Active" });
  };

  const handleSwitchBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentToSwitch || !newBatchSelection) return;

    if (batchStats[newBatchSelection] >= 100) {
      return alert("Strict Blockage: The target batch is full.");
    }

    setStudents(students.map(s => s.id === studentToSwitch.id ? { ...s, cohort: newBatchSelection } : s));
    setIsSwitchModalOpen(false);
    setStudentToSwitch(null);
    setNewBatchSelection("");
  };

  const openSwitchModal = (student: any) => {
    setStudentToSwitch(student);
    setNewBatchSelection(student.cohort);
    setIsSwitchModalOpen(true);
  };

  const columns = [
    {
      key: "name",
      header: "Student",
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface_container_high flex items-center justify-center font-bold text-xs text-primary">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-on_surface">{val}</p>
            <p className="text-[10px] text-outline uppercase tracking-wider">{row.id}</p>
          </div>
        </div>
      )
    },
    { key: "email", header: "Email Address" },
    { key: "cohort", header: "Cohort / Department" },
    {
      key: "status",
      header: "Status",
      render: (val: string) => (
        <span className={cn(
          "text-[10px] font-bold uppercase px-2 py-1 rounded-sm",
          val === 'Active' ? 'bg-primary/10 text-primary' :
            val === 'Pending' ? 'bg-secondary/10 text-secondary' :
              'bg-error/10 text-error'
        )}>
          {val}
        </span>
      )
    },
    {
      key: "actions",
      header: "",
      render: (_: any, row: any) => (
        <div className="relative group">
          <button className="p-2 hover:bg-surface_container_highest rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 text-outline" />
          </button>

          <div className="absolute right-0 top-10 mt-2 w-48 bg-surface_container_lowest border border-outline_variant/30 rounded-xl shadow-ambient opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <button
              onClick={() => openSwitchModal(row)}
              className="w-full text-left px-4 py-3 text-sm text-on_surface hover:bg-surface_container_high transition-colors font-semibold"
            >
              Switch Batch
            </button>
            <button className="w-full text-left px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors font-semibold border-t border-outline_variant/20">
              Suspend Account
            </button>
          </div>
        </div>
      )
    }
  ];

  const getCapacityColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio >= 1) return 'text-error';
    if (ratio >= 0.8) return 'text-warning';
    return 'text-primary';
  };

  const getCapacityBg = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio >= 1) return 'bg-error text-error';
    if (ratio >= 0.8) return 'bg-warning text-warning';
    return 'bg-primary text-primary';
  };

  return (
    <div className="space-y-8 pb-16 relative">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Student Body</h1>
          <p className="text-on_surface_variant">Manage enrollments, status, and academic standing for Azure Academy.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-premium"
        >
          <UserPlus className="w-4 h-4" /> Add Student
        </button>
      </header>

      {/* Stats Quick View */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: students.length.toLocaleString(), icon: Users },
          { label: "Active Learners", value: students.filter(s => s.status === 'Active').length.toLocaleString(), icon: BadgeCheck },
          { label: "Pending Approvals", value: students.filter(s => s.status === 'Pending').length.toLocaleString(), icon: Filter },
          { label: "Batch Transfers", value: "3", icon: Activity },
        ].map((stat) => (
          <KnowledgeCard key={stat.label} className="p-6">
            <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-primary">
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

      {/* Filters & Table */}
      <KnowledgeCard>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center border-b border-outline_variant/10 pb-6 mb-0">
          <CardTitle>Enrollment Directory</CardTitle>
          <div className="mt-4 sm:mt-0">
            <PremiumSearch placeholder="Search student or ID..." />
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <DataTable columns={columns} data={students} />
          <div className="p-6 flex justify-between items-center border-t border-outline_variant/10">
             <p className="text-xs text-on_surface_variant">Displaying 1-{students.length} of {students.length}</p>
             <div className="flex gap-3 items-center">
                <SwitchButton3D>Prev</SwitchButton3D>
                <span className="font-bold text-on_surface px-2">1</span>
                <SwitchButton3D>Next</SwitchButton3D>
             </div>
          </div>
        </CardBody>
      </KnowledgeCard>


      {/* MODAL 1: Add Student */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface_container_lowest w-full max-w-lg rounded-2xl shadow-ambient border border-outline_variant/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-outline_variant/10">
              <h2 className="text-xl font-bold text-on_surface font-manrope">Add New Student</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on_surface_variant hover:text-on_surface hover:bg-surface_container_high p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Full Name</label>
                <input required type="text" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors" placeholder="e.g. John Doe" />
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Email Address</label>
                <input required type="email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors" placeholder="john@academy.edu" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Assign Cohort / Batch</label>
                  <select
                    required
                    value={newStudent.cohort}
                    onChange={(e) => setNewStudent({ ...newStudent, cohort: e.target.value })}
                    className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors appearance-none"
                  >
                    <option value="" disabled>Select Batch...</option>
                    {batches.map(b => (
                      <option key={b.id} value={b.name} disabled={batchStats[b.name] >= b.maxCapacity}>
                        {b.name} {batchStats[b.name] >= b.maxCapacity ? '(FULL)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Status</label>
                  <select value={newStudent.status} onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })} className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors appearance-none">
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Capacity Visualizer below select */}
              {newStudent.cohort && (
                <div className={`mt-2 p-3 rounded-lg border ${batchStats[newStudent.cohort] >= 100 ? 'border-error/30 bg-error/5' : 'border-outline_variant/20 bg-surface_container_highest'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-on_surface">Batch Capacity Target</span>
                    <span className={`text-xs font-bold ${getCapacityColor(batchStats[newStudent.cohort], 100)}`}>
                      {batchStats[newStudent.cohort]} / 100
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-outline_variant/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-opacity-80 rounded-full transition-all duration-500 ${getCapacityBg(batchStats[newStudent.cohort], 100)}`}
                      style={{ width: `${Math.min(100, Math.max(0, (batchStats[newStudent.cohort] / 100) * 100))}%` }}
                    />
                  </div>
                  {batchStats[newStudent.cohort] >= 100 && (
                    <div className="flex gap-2 items-center mt-2 text-error">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-[10px] font-bold">This batch is completely full. System override required.</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 justify-end mt-8 border-t border-outline_variant/10 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-full font-bold text-sm text-on_surface_variant hover:bg-surface_container_high transition-colors">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={newStudent.cohort ? batchStats[newStudent.cohort] >= 100 : false}
                  className="btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Switch Batch */}
      {isSwitchModalOpen && studentToSwitch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface_container_lowest w-full max-w-sm rounded-2xl shadow-ambient border border-outline_variant/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-outline_variant/10">
              <h2 className="text-xl font-bold text-on_surface font-manrope">Switch Batch</h2>
              <button onClick={() => setIsSwitchModalOpen(false)} className="text-on_surface_variant hover:text-on_surface hover:bg-surface_container_high p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSwitchBatch} className="p-6 space-y-4">
              <div>
                <p className="text-xs text-on_surface_variant">Re-assigning</p>
                <p className="font-bold text-on_surface text-lg">{studentToSwitch.name}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Select Target Batch</label>
                <select
                  required
                  value={newBatchSelection}
                  onChange={(e) => setNewBatchSelection(e.target.value)}
                  className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors appearance-none"
                >
                  {batches.filter(b => b.name !== studentToSwitch.cohort).map(b => (
                    <option key={b.id} value={b.name} disabled={batchStats[b.name] >= b.maxCapacity}>
                      {b.name} ({batchStats[b.name]}/{b.maxCapacity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic target visualizer */}
              {newBatchSelection && newBatchSelection !== studentToSwitch.cohort && (
                <div className={`mt-2 p-3 rounded-lg border ${batchStats[newBatchSelection] >= 100 ? 'border-error/30 bg-error/5' : 'border-outline_variant/20 bg-surface_container_highest'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-on_surface">Target Capacity</span>
                    <span className={`text-xs font-bold ${getCapacityColor(batchStats[newBatchSelection], 100)}`}>
                      {batchStats[newBatchSelection]} / 100
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 mt-4 border-t border-outline_variant/10">
                <button type="submit" disabled={batchStats[newBatchSelection] >= 100} className="w-full bg-primary text-on_primary px-4 py-2.5 rounded-full font-bold shadow-sm disabled:opacity-50 text-sm">
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
