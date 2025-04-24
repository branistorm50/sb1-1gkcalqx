import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Building2, Mail, MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: client, isLoading } = useQuery({
    queryKey: ['clients', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/clients')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Clients
      </Button>

      <div className="grid gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">
              {client.type === 'company' ? 'Enterprise' : 'Individual'}
            </p>
          </div>
          <Button onClick={() => navigate(`/clients/${id}/edit`)}>
            Edit Client
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="p-6 bg-card border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {client.type === 'company' && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p>{client.contact_name || 'Not specified'}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{client.email || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{client.phone || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            {client.type === 'company' && (
              <div className="p-6 bg-card border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Company Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SIRET</p>
                    <p>{client.siret || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">VAT Number</p>
                    <p>{client.vat_number || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-card border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Physical Address</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p>{client.address}</p>
                    <p>{client.postal_code} {client.city}</p>
                    <p>{client.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {!client.same_address && (
              <div className="p-6 bg-card border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p>{client.billing_address}</p>
                      <p>{client.billing_postal_code} {client.billing_city}</p>
                      <p>{client.billing_country}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {client.notes && (
              <div className="p-6 bg-card border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Notes</h2>
                <p className="whitespace-pre-wrap">{client.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}