"use client";

import { useState } from "react";
import { KnowledgeCard, CardHeader, CardTitle, CardBody } from "@/components/KnowledgeCard";
import { UserCircle, Mail, Linkedin, Upload, CheckCircle2 } from "lucide-react";

export default function TeacherProfilePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState({
    name: "Prof. Adrian Vance",
    email: "a.vance@academy.edu",
    linkedin: "linkedin.com/in/adrian-vance",
    description: "Senior Fellow specializing in Macroeconomic Models and Advanced Technical Analysis. Committed to institutional excellence.",
    profilePicture: null as File | null,
    previewUrl: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile({
        ...profile,
        profilePicture: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    // Simulate API call to save profile details
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Profile Settings</h1>
        <p className="text-on_surface_variant">
          Update your public profile, contact details, and professional credentials.
        </p>
      </header>

      <form onSubmit={handleSave}>
        <KnowledgeCard className="overflow-hidden">
          <CardHeader className="bg-surface_container_low border-b border-outline_variant/10">
             <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardBody className="p-8 space-y-8">
            
            {/* Profile Picture Section */}
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
               <div className="relative group">
                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface_container_highest shadow-ambient bg-surface_container_high flex items-center justify-center">
                   {profile.previewUrl ? (
                     <img src={profile.previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                   ) : (
                     <UserCircle className="w-16 h-16 text-outline" />
                   )}
                 </div>
                 <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <Upload className="w-6 h-6" />
                   <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                 </label>
               </div>
               <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="font-bold text-on_surface">Profile Picture</h3>
                  <p className="text-sm text-on_surface_variant">
                    Upload a professional headshot. Recommended size is 256x256px.
                  </p>
                  <p className="text-xs text-outline mt-2">Max file size: 2MB. Supported formats: JPG, PNG.</p>
               </div>
            </div>

            <hr className="border-outline_variant/10" />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                    Full Name & Title
                  </label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors"
                  />
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Gmail / Contact Email
                  </label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors"
                  />
               </div>

               <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Linkedin className="w-3 h-3" /> LinkedIn Profile
                  </label>
                  <input 
                    type="text" 
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors"
                  />
               </div>

               <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                    Professional Bio / Description
                  </label>
                  <textarea 
                    rows={4}
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    className="w-full bg-surface_container_highest border border-outline_variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-on_surface transition-colors resize-none"
                    placeholder="Briefly describe your expertise, background, and teaching philosophy..."
                  />
               </div>
            </div>

            <div className="pt-6 border-t border-outline_variant/10 flex items-center justify-between">
               <div className="h-8 flex items-center">
                 {success && (
                   <span className="flex items-center gap-2 text-primary text-sm font-bold animate-in fade-in slide-in-from-left-4">
                     <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully
                   </span>
                 )}
               </div>
               
               <button 
                 type="submit" 
                 disabled={loading}
                 className="btn-premium py-3 px-8 text-sm"
               >
                 {loading ? "Saving..." : "Save Changes"}
               </button>
            </div>
            
          </CardBody>
        </KnowledgeCard>
      </form>
    </div>
  );
}
