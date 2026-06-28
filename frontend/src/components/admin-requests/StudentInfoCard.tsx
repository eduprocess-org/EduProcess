import { Mail, User, GraduationCap, BookOpen } from "lucide-react";
import { InfoField } from "../common/atoms/InfoField";

interface StudentInfoCardProps {
  fullName: string;
  email: string;
  career?: string | null;
  semester?: string | null;
  reason?: string | null;
}

export function StudentInfoCard({ fullName, email, career, semester, reason }: StudentInfoCardProps) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#94A3B8]">Student</p>
      <InfoField icon={<User size={13} className="text-[#1A52A8]" />} label="Full name" value={fullName} />
      <InfoField icon={<Mail size={13} className="text-[#1A52A8]" />} label="Institutional email" value={email} />
      {career && <InfoField icon={<GraduationCap size={13} className="text-[#1A52A8]" />} label="Program" value={career} />}
      {semester && <InfoField icon={<BookOpen size={13} className="text-[#1A52A8]" />} label="Semester" value={semester} />}
      {reason && (
        <div className="rounded-xl border border-dashed border-[#E2EAF4] bg-[#F1F5FB] p-3.5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Reason</p>
          <p className="text-sm leading-relaxed text-[#334155]">{reason}</p>
        </div>
      )}
    </div>
  );
}