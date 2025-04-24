import {
  ArrowUpRight,
  Ban,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  FileText,
  ReceiptText,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    pendingQuotes: 0,
    acceptedQuotes: 0,
    unpaidInvoices: 0,
    totalRevenue: 0,
    clientCount: 0,
  });

  const [revenueData, setRevenueData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Chiffre d'affaires",
        data: [] as number[],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary) / 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    async function fetchDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Quotes
      const { data: pendingQuotes } = await supabase
        .from("quotes")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "sent")
        .throwOnError();

      const { data: acceptedQuotes } = await supabase
        .from("quotes")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "accepted")
        .throwOnError();

      // Invoices
      const { data: unpaidInvoices } = await supabase
        .from("invoices")
        .select("id")
        .eq("user_id", user.id)
        .in("status", ["sent", "overdue"])
        .throwOnError();

      const { data: paidInvoices } = await supabase
        .from("invoices")
        .select("total")
        .eq("user_id", user.id)
        .eq("status", "paid")
        .throwOnError();

      // Clients
      const { data: clients } = await supabase
        .from("clients")
        .select("id")
        .eq("user_id", user.id)
        .throwOnError();

      const totalRevenue = paidInvoices?.reduce((sum, invoice) => sum + invoice.total, 0) || 0;

      setStats({
        pendingQuotes: pendingQuotes?.length || 0,
        acceptedQuotes: acceptedQuotes?.length || 0,
        unpaidInvoices: unpaidInvoices?.length || 0,
        totalRevenue,
        clientCount: clients?.length || 0,
      });

      // Generate mock revenue data for demo purposes
      const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      const currentMonth = new Date().getMonth();
      
      const labels = months.slice(0, currentMonth + 1);
      const mockData = Array(currentMonth + 1).fill(0).map(() => Math.floor(Math.random() * 10000) + 5000);
      
      setRevenueData({
        labels,
        datasets: [
          {
            label: "Chiffre d'affaires (€)",
            data: mockData,
            borderColor: "hsl(var(--primary))",
            backgroundColor: "hsla(var(--primary) / 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    }

    fetchDashboardData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Aperçu de votre activité et de vos statistiques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Devis en cours</p>
              <p className="text-2xl font-bold">{stats.pendingQuotes}</p>
            </div>
            <div className="bg-primary/10 p-2.5 rounded-full text-primary">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <div className="flex items-center text-accent">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span>En attente de réponse</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Devis acceptés</p>
              <p className="text-2xl font-bold">{stats.acceptedQuotes}</p>
            </div>
            <div className="bg-accent/10 p-2.5 rounded-full text-accent">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <div className="flex items-center text-accent">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              <span>Prêts pour facturation</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Factures impayées</p>
              <p className="text-2xl font-bold">{stats.unpaidInvoices}</p>
            </div>
            <div className="bg-destructive/10 p-2.5 rounded-full text-destructive">
              <ReceiptText className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <div className="flex items-center text-destructive">
              <Timer className="mr-1 h-3.5 w-3.5" />
              <span>À suivre</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Clients</p>
              <p className="text-2xl font-bold">{stats.clientCount}</p>
            </div>
            <div className="bg-secondary/10 p-2.5 rounded-full text-secondary-foreground">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              <span>Base client active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Chiffre d'affaires</h3>
            <div className="flex items-center text-xs font-medium text-muted-foreground">
              <span>Cette année</span>
            </div>
          </div>
          <div className="h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Aperçu financier</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-3">
                    <CircleDollarSign className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Chiffre d'affaires</span>
                </div>
                <span className="font-bold">{formatCurrency(stats.totalRevenue)}</span>
              </div>
              <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-secondary/10 text-secondary-foreground mr-3">
                    <Ban className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Impayés</span>
                </div>
                <span className="font-bold">{formatCurrency(stats.unpaidInvoices * 1500)}</span>
              </div>
              <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                <div className="bg-secondary h-full rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-accent/10 text-accent mr-3">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Marge</span>
                </div>
                <span className="font-bold">{formatCurrency(stats.totalRevenue * 0.35)}</span>
              </div>
              <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                <div className="bg-accent h-full rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}