import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function Clients() {
  const navigate = useNavigate();
  
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <Button asChild>
          <Link to="/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            New Client
          </Link>
        </Button>
      </div>

      {!clients?.length ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg bg-muted/50">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No clients yet</h2>
          <p className="text-muted-foreground mb-4">Add your first client to get started</p>
          <Button asChild>
            <Link to="/clients/new">
              <Plus className="mr-2 h-4 w-4" />
              New Client
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-4 bg-card border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/clients/${client.id}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {client.type === 'company' ? client.contact_name : client.email}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{client.city}</p>
                  <p>{client.type === 'company' ? 'Enterprise' : 'Individual'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}