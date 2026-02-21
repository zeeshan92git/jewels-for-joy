import AdminSidebar from '@/components/luxury/AdminSidebar';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-stone-50 flex-col md:flex-row">
      <AdminSidebar />
      
      {/* pb-24: Padding bottom for mobile to prevent content being hidden by bottom nav
          md:pb-0: Reset padding on desktop 
      */}
      <main className="flex-1 p-6 md:p-12 pb-24 md:pb-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}