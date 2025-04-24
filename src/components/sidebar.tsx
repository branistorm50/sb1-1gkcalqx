import {
  CircleDollarSign,
  FileText,
  Hammer,
  Home,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex h-14 items-center border-b px-4">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Hammer className="h-5 w-5 text-primary" />
          <span>ArtisanPro</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive
                  ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Tableau de bord
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive
                  ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <Users className="h-4 w-4" />
            Clients
          </NavLink>
          <NavLink
            to="/quotes"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive
                  ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <FileText className="h-4 w-4" />
            Devis
          </NavLink>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive
                  ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <ReceiptText className="h-4 w-4" />
            Factures
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive
                  ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <Home className="h-4 w-4" />
            Prestations
          </NavLink>
          <NavLink
            to="/settings/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive
                  ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <Settings className="h-4 w-4" />
            Paramètres
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg border bg-card p-3">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-primary" />
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Abonnement PRO</p>
              <p className="text-xs text-muted-foreground">
                Prochaine échéance: 15/06/2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}