"use client";

import { useState } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { MessageSquare, Send, Clock, CheckCircle2, Tag } from "lucide-react";

type Doubt = {
  id: number;
  subject: string;
  question: string;
  status: "Pending" | "In Review" | "Resolved";
  answer?: string;
  date: string;
};

export default function StudentQAPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: 1,
      subject: "Quantum Computing",
      question: "In the context of Shor's algorithm, how does the quantum Fourier transform isolate the period of the state?",
      status: "Resolved",
      answer: "The QFT exploits constructive interference. By applying the QFT to a superposition of quantum states, the amplitudes of states containing the correct periodicity are reinforced, while others cancel out via destructive interference.",
      date: "Oct 22, 2024"
    },
    {
      id: 2,
      subject: "Data Structures",
      question: "Why is a Red-Black tree preferred over an AVL tree for the C++ STL map implementation?",
      status: "In Review",
      date: "Oct 24, 2024"
    }
  ]);

  const [newSubject, setNewSubject] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newQuestion.trim()) return;

    setDoubts([
      {
        id: Date.now(),
        subject: newSubject,
        question: newQuestion,
        status: "Pending",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      },
      ...doubts
    ]);

    setNewSubject("");
    setNewQuestion("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-outline" />;
      case "In Review":
        return <Clock className="w-4 h-4 text-secondary" />;
      case "Resolved":
        return <CheckCircle2 className="w-4 h-4 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Doubt Resolution Center</h1>
        <p className="text-on_surface_variant max-w-2xl">
          Submit technical and operational queries directly to your instructors. High-priority conceptual questions are expedited to your assigned department head.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Ask Question Interface */}
        <section>
          <KnowledgeCard className="h-full border-primary/20">
            <CardHeader className="pb-4">
               <CardTitle className="flex items-center gap-2">
                 <MessageSquare className="w-5 h-5 text-primary" /> Initiate Inquiry
               </CardTitle>
            </CardHeader>
            <CardBody>
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Subject / Tag</label>
                    <div className="relative">
                       <Tag className="w-4 h-4 absolute left-4 top-3.5 text-on_surface_variant" />
                       <input 
                         type="text" 
                         value={newSubject}
                         onChange={(e) => setNewSubject(e.target.value)}
                         placeholder="e.g. Advanced Calculus, Node.js" 
                         className="w-full bg-surface_container_low border border-outline_variant/30 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Detailed Question</label>
                    <textarea 
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Describe your doubt comprehensively..." 
                      rows={6}
                      className="w-full bg-surface_container_low border border-outline_variant/30 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                 </div>
                 
                 <div className="flex justify-end pt-2">
                    <button type="submit" disabled={!newSubject.trim() || !newQuestion.trim()} className="btn-premium py-3 text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                       <Send className="w-4 h-4" /> Transmit Query
                    </button>
                 </div>
               </form>
            </CardBody>
          </KnowledgeCard>
        </section>

        {/* History Tracker */}
        <section className="space-y-6">
           <h2 className="text-xl font-bold font-manrope">History & Status</h2>
           <div className="space-y-4">
              {doubts.map(doubt => (
                <div key={doubt.id} className="p-5 border border-outline_variant/20 bg-surface_container_lowest rounded-2xl shadow-sm hover:shadow-ambient transition-shadow group">
                   <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-sm">
                         {doubt.subject}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                         {getStatusIcon(doubt.status)}
                         <span className={
                           doubt.status === 'Resolved' ? 'text-primary' : 
                           doubt.status === 'In Review' ? 'text-secondary' : 'text-outline_variant'
                         }>
                           {doubt.status}
                         </span>
                      </div>
                   </div>
                   
                   <p className="text-sm text-on_surface font-medium leading-relaxed mb-3">
                      "{doubt.question}"
                   </p>
                   
                   {doubt.answer && (
                     <div className="mt-4 pt-4 border-t border-outline_variant/20">
                        <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Instructor Response</p>
                        <p className="text-sm text-on_surface_variant leading-relaxed">
                           {doubt.answer}
                        </p>
                     </div>
                   )}
                   
                   {!doubt.answer && (
                     <p className="text-[10px] text-outline text-right mt-2">{doubt.date}</p>
                   )}
                </div>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
}
