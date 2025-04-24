import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: service, isLoading } = useQuery({
    queryKey: ['services', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*, category:categories(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/services')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{service.name}</h1>
          <p className="text-muted-foreground">{service.category?.name}</p>
        </div>
        <Button onClick={() => navigate(`/services/${id}/edit`)}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit Service
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="p-6 bg-card border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Description</dt>
              <dd className="mt-1">{service.description || 'No description provided'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Technical Details</dt>
              <dd className="mt-1">{service.technical_details || 'No technical details provided'}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Price</dt>
                <dd className="mt-1 font-semibold">{service.price} €</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Unit</dt>
                <dd className="mt-1">{service.unit}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Tax Rate</dt>
                <dd className="mt-1">{service.tax_rate}%</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}