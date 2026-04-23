import { KnowledgeCard, CardBody } from "@/components/KnowledgeCard";
import { DataTable } from "@/components/DataTable";
import { db } from "@/lib/db";

export default async function AttendancePage() {
  const data = await db.user.getStudentData();
  const att = data.attendance;

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-4xl font-manrope font-bold tracking-tight mb-6">Attendance Record</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KnowledgeCard className="bg-surface_container_high shadow-none border-none text-center p-6">
          <p className="text-sm font-bold text-outline uppercase tracking-wider mb-2">Total Classes</p>
          <span className="text-4xl font-manrope font-bold text-on_surface">{att.totalClasses}</span>
        </KnowledgeCard>
        <KnowledgeCard className="bg-surface_container_high shadow-none border-none text-center p-6">
          <p className="text-sm font-bold text-outline uppercase tracking-wider mb-2">Attended</p>
          <span className="text-4xl font-manrope font-bold text-primary">{att.attended}</span>
        </KnowledgeCard>
        <KnowledgeCard className="bg-surface_container_high shadow-none border-none text-center p-6">
          <p className="text-sm font-bold text-outline uppercase tracking-wider mb-2">Attendance Rate</p>
          <span className="text-4xl font-manrope font-bold text-secondary">{att.rate}</span>
        </KnowledgeCard>
      </div>

      <KnowledgeCard>
        <CardBody className="p-0 overflow-hidden">
          <DataTable 
            columns={[
              { key: "date", header: "Date" },
              { key: "class", header: "Class" },
              { key: "teacher", header: "Teacher" },
              { key: "status", header: "Status", render: (val) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  val === 'Present' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
                }`}>
                  {val}
                </span>
              )},
            ]} 
            data={att.records} 
          />
        </CardBody>
      </KnowledgeCard>
    </div>
  );
}
