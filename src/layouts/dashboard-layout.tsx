import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Sidebar className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 border-r" />
      <div className="flex-1 flex flex-col md:pl-64">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}