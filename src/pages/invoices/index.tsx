import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReceiptText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Invoices() {
  const [invoices] = useState([]);

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Button asChild>
          <Link to="/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Link>
        </Button>
      </div>

      {invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg bg-muted/50">
          <ReceiptText className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No invoices yet</h2>
          <p className="text-muted-foreground mb-4">Create your first invoice to get started</p>
          <Button asChild>
            <Link to="/invoices/new">
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {/* Invoice list will be implemented here */}
        </div>
      )}
    </div>
  );
}