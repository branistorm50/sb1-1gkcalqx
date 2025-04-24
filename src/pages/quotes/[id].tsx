import { useParams } from 'react-router-dom';

export default function QuoteDetails() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Quote Details</h1>
      <p className="text-muted-foreground">Quote ID: {id}</p>
    </div>
  );
}