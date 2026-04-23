import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { Users, Calendar, TrendingUp, Clock, BookOpen, Upload, Bell, ArrowRight } from "lucide-react";

export default function TeacherDashboard() {
  const todayLectures = [
    { time: "09:00 AM", title: "Advanced Microeconomics II: Market Structures", location: "Hall 4-B", students: "42 Students enrolled" },
    { time: "01:30 PM", title: "Behavioral Analytics in Higher Education", location: "Virtual Lab 2", students: "28 Students enrolled" },
    { time: "04:00 PM", title: "Dissertation Methodology Seminar", location: "Boardroom A", students: "12 Candidates" },
  ];

  const upcomingSessions = [
    { date: "Tomorrow • 10:00 AM", title: "Macro-Economic Models", location: "Auditorium C" },
    { date: "Wed, 26 Oct • 02:00 PM", title: "Industrial Organization", location: "Lecture Theatre 1" },
    { date: "Thu, 27 Oct • 09:00 AM", title: "Econometrics Workshop", location: "Computer Lab 4" },
  ];

  return (
    <div className="space-y-8 pb-16">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Academic Atelier</h1>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
             <p className="text-on_surface_variant font-medium">Prof. Adrian Vance • Senior Fellow</p>
          </div>
        </div>
        <button className="p-3 bg-surface_container_low rounded-full relative hover:bg-surface_container_high transition-colors">
          <Bell className="w-5 h-5 text-on_surface_variant" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
        </button>
      </header>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KnowledgeCard className="p-6">
           <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Students</p>
                 <h3 className="text-2xl font-bold font-manrope">1,284</h3>
              </div>
           </div>
        </KnowledgeCard>

        <KnowledgeCard className="p-6">
           <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-secondary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Classes This Week</p>
                 <h3 className="text-2xl font-bold font-manrope">24</h3>
              </div>
           </div>
        </KnowledgeCard>

        <KnowledgeCard className="p-6">
           <div className="flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-surface_container_high text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Weekly Attendance</p>
                 <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold font-manrope">94.2%</h3>
                    <span className="text-[10px] font-bold text-primary">+2.1%</span>
                 </div>
              </div>
           </div>
        </KnowledgeCard>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Lectures */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-manrope text-on_surface">Today&apos;s Lectures</h2>
              <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">View Schedule <ArrowRight className="w-4 h-4" /></button>
           </div>
           <div className="space-y-4">
              {todayLectures.map((lecture, i) => (
                <div key={i} className="flex gap-6 p-6 bg-surface_container_low border border-outline_variant/10 rounded-3xl hover:border-primary/20 transition-all group cursor-pointer shadow-ambient">
                   <div className="text-center min-w-[60px]">
                      <p className="text-lg font-bold font-manrope text-on_surface leading-none">{lecture.time.split(' ')[0]}</p>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-1">{lecture.time.split(' ')[1]}</p>
                   </div>
                   <div className="flex-1 border-l border-outline_variant/20 pl-6">
                      <h3 className="font-bold text-on_surface group-hover:text-primary transition-colors">{lecture.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                         <span className="text-xs text-on_surface_variant flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5" /> {lecture.location}
                         </span>
                         <span className="text-xs text-on_surface_variant flex items-center gap-1.5 font-medium">
                            <Users className="w-3.5 h-3.5" /> {lecture.students}
                         </span>
                      </div>
                   </div>
                   <div className="flex items-center">
                      <button className="bg-surface_container_high p-2 rounded-xl group-hover:bg-primary group-hover:text-on_primary transition-all">
                         <ArrowRight className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <KnowledgeCard className="bg-signature-gradient text-on_primary border-none shadow-ambient p-8">
              <div className="w-12 h-12 rounded-2xl bg-on_primary/10 flex items-center justify-center mb-6">
                 <Upload className="w-6 h-6 text-on_primary" />
              </div>
              <h3 className="font-manrope font-bold text-lg mb-2">Upload Course Materials</h3>
              <p className="text-sm text-on_primary_container opacity-90 leading-relaxed mb-6">
                 Update your lectures with the latest research papers and data sets for Batch 2024.
              </p>
              <button className="w-full bg-surface text-primary py-3 rounded-full font-bold text-sm hover:scale-[1.02] transition-transform">
                 Upload New Resource
              </button>
           </KnowledgeCard>

           <KnowledgeCard>
              <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" /> Upcoming Sessions
                 </CardTitle>
              </CardHeader>
              <CardBody className="space-y-6">
                 {upcomingSessions.map((session, i) => (
                   <div key={i} className="relative pl-4 border-l-2 border-outline_variant/30 hover:border-secondary transition-colors cursor-default py-1">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">{session.date}</p>
                      <h4 className="font-bold text-sm text-on_surface mt-1">{session.title}</h4>
                      <p className="text-xs text-on_surface_variant">{session.location}</p>
                   </div>
                 ))}
              </CardBody>
           </KnowledgeCard>

           <KnowledgeCard className="bg-surface_container_low">
              <CardHeader>
                 <CardTitle className="text-base">Faculty Notices</CardTitle>
              </CardHeader>
              <CardBody className="space-y-4">
                 <div className="p-4 rounded-xl bg-surface_container_lowest border border-outline_variant/10">
                    <h5 className="text-sm font-bold text-error">End-Term Submissions</h5>
                    <p className="text-xs text-on_surface_variant mt-1">Deadline for Batch 2023 grading is Friday.</p>
                 </div>
                 <div className="p-4 rounded-xl bg-surface_container_lowest border border-outline_variant/10">
                    <h5 className="text-sm font-bold text-on_surface">Library Maintenance</h5>
                    <p className="text-xs text-on_surface_variant mt-1">Digital archive will be offline tonight at 12AM.</p>
                 </div>
              </CardBody>
           </KnowledgeCard>
        </div>
      </div>
    </div>
  );
}
