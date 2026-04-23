import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { PlayCircle } from "lucide-react";
import { db } from "@/lib/db";

export default async function RecordedClassesPage() {
  const data = await db.user.getStudentData();
  const mainVideo = data.recordings[0];
  const relatedVideos = data.recordings.slice(1);

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-4xl font-manrope font-bold tracking-tight mb-6">Recorded Classes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Player Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-ambient relative flex items-center justify-center">
            {/* Mock Youtube Embed */}
            <PlayCircle className="w-20 h-20 text-white/50 hover:text-white transition-colors cursor-pointer" />
            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-md text-white text-xs font-bold font-inter">
              {mainVideo?.title}
            </div>
          </div>
          
          <KnowledgeCard>
            <CardBody className="p-6">
              <h2 className="text-2xl font-manrope font-bold mb-2">{mainVideo?.title}</h2>
              <div className="flex gap-4 text-sm text-on_surface_variant mb-4">
                <span>Instructor: {mainVideo?.instructor}</span>
                <span>Recorded: {mainVideo?.date}</span>
              </div>
              <p className="text-on_surface">{mainVideo?.description}</p>
            </CardBody>
          </KnowledgeCard>
        </div>

        {/* Sidebar Playlist */}
        <div className="space-y-6">
          <KnowledgeCard className="bg-surface_container_low border-none">
            <CardHeader><CardTitle>Course Playlist</CardTitle></CardHeader>
            <CardBody className="space-y-4">
              {data.recordings.map((rec) => {
                const isPlaying = rec.id === mainVideo?.id;
                return (
                  <div key={rec.id} className={`flex gap-3 group cursor-pointer p-2 rounded-xl transition-colors ${isPlaying ? 'bg-primary/10 border border-primary/20' : 'hover:bg-surface_container_high'}`}>
                    <div className="w-32 h-20 bg-surface_container_highest rounded-lg overflow-hidden relative flex-shrink-0">
                      <PlayCircle className={`w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors ${isPlaying ? 'text-primary' : 'text-on_surface_variant group-hover:text-primary'}`} />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{rec.duration}</span>
                    </div>
                    <div className="py-1 flex-1">
                      <span className="text-xs font-bold text-primary mb-1 block uppercase tracking-wider">Chapter {rec.chapter}</span>
                      <h5 className={`font-bold text-sm leading-tight transition-colors line-clamp-2 ${isPlaying ? 'text-primary' : 'text-on_surface group-hover:text-primary'}`}>
                        {rec.title}
                      </h5>
                      {isPlaying && <span className="text-xs text-primary font-semibold mt-1 block">Now Playing...</span>}
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </KnowledgeCard>
        </div>
      </div>
    </div>
  );
}
