"use client";

import { useEffect, useState } from "react";
import { KnowledgeCard, CardBody } from "@/components/KnowledgeCard";
import { Plus, Edit2, Trash2, Users, BookOpen, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function AdminCourseManagement() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/institutional")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div className="p-8 text-center animate-pulse">Loading Catalog...</div>;

  const catalog = data.courseCatalog || [];

  return (
    <div className="space-y-8 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Academy Catalog</h1>
          <p className="text-on_surface_variant">Manage your recorded courses, modules, and learning paths.</p>
        </div>
        <button className="bg-primary text-on_primary px-6 py-2.5 rounded-full font-bold shadow-ambient flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm">
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full bg-surface_container_lowest border border-outline_variant/20 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50"
          />
        </div>
        <button className="bg-surface_container_lowest border border-outline_variant/20 px-4 rounded-xl flex items-center gap-2 text-sm font-bold text-on_surface_variant hover:bg-surface_container_high">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {catalog.map((course: any) => (
          <KnowledgeCard key={course.id} className="group hover:border-primary/20 transition-all">
            <CardBody className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 aspect-video bg-surface_container_highest shrink-0 relative overflow-hidden md:rounded-l-2xl">
                   {/* Thumbnail placeholder */}
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-outline uppercase tracking-widest">Thumbnail</div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold font-manrope text-on_surface mb-1">{course.title}</h3>
                        <p className="text-sm text-on_surface_variant line-clamp-1">{course.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/courses/${course.id}`}>
                          <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors" title="Edit Content">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </Link>
                        <button className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors" title="Delete Course">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>

                   <div className="flex items-center gap-8 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-surface_container_high text-primary">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Modules</p>
                           <p className="text-sm font-bold">{course.modules.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-surface_container_high text-secondary">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Active Students</p>
                           <p className="text-sm font-bold">1,204</p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-end items-end">
                         <span className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Status</span>
                         <span className="text-xs font-bold text-success flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Published
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            </CardBody>
          </KnowledgeCard>
        ))}
      </div>
    </div>
  );
}
