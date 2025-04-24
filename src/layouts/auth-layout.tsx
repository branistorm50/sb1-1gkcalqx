import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Hammer } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
              <Hammer className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">ArtisanPro</h1>
            <p className="text-sm text-muted-foreground">
              Gestion complète pour artisans
            </p>
          </div>
          
          <Outlet />
        </div>
      </div>
      
      <p className="mt-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} ArtisanPro. Tous droits réservés.
      </p>
    </div>
  );
}