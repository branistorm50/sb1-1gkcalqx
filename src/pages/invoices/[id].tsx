import { useParams } from 'react-router-dom';

export default function InvoiceDetails() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Invoice Details</h1>
      <p className="text-muted-foreground">Invoice ID: {id}</p>
    </div>
  );
}