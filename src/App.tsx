import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import AuthLayout from '@/layouts/auth-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import ResetPassword from '@/pages/auth/reset-password';
import Dashboard from '@/pages/dashboard';
import ProfileSettings from '@/pages/settings/profile';
import Clients from '@/pages/clients';
import ClientDetails from '@/pages/clients/[id]';
import NewClient from '@/pages/clients/new';
import Quotes from '@/pages/quotes';
import QuoteDetails from '@/pages/quotes/[id]';
import NewQuote from '@/pages/quotes/new';
import Invoices from '@/pages/invoices';
import InvoiceDetails from '@/pages/invoices/[id]';
import NewInvoice from '@/pages/invoices/new';
import Services from '@/pages/services';
import ServiceDetails from '@/pages/services/[id]';
import NewService from '@/pages/services/new';
import { RequireAuth } from '@/components/auth/require-auth';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="artisan-theme">
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected routes */}
            <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings/profile" element={<ProfileSettings />} />
              
              {/* Clients routes */}
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/new" element={<NewClient />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              
              {/* Quotes routes */}
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/quotes/new" element={<NewQuote />} />
              <Route path="/quotes/:id" element={<QuoteDetails />} />
              
              {/* Invoices routes */}
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/new" element={<NewInvoice />} />
              <Route path="/invoices/:id" element={<InvoiceDetails />} />
              
              {/* Services routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/new" element={<NewService />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
            </Route>
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;