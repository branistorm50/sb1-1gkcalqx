import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function Services() {
  const navigate = useNavigate();
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  
  const { data: trades, isLoading: tradesLoading } = useQuery({
    queryKey: ['trades'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trades')
        .select('*, categories(*, services(*))')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (tradesLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Prestations</h1>
        <Button onClick={() => navigate('/services/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle prestation
        </Button>
      </div>

      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {/* Navigation des corps d'état */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg mb-4">Corps d'état</h2>
          <div className="space-y-1">
            {trades?.map((trade) => (
              <button
                key={trade.id}
                onClick={() => setSelectedTrade(trade.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedTrade === trade.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {trade.name}
              </button>
            ))}
          </div>
        </div>

        {/* Affichage des prestations */}
        <div className="space-y-6">
          {selectedTrade ? (
            trades
              ?.find((t) => t.id === selectedTrade)
              ?.categories?.map((category) => (
                <div key={category.id} className="space-y-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <div className="grid gap-4">
                    {category.services?.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 bg-card border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => navigate(`/services/${service.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{service.price} €</p>
                            <p className="text-sm text-muted-foreground">
                              par {service.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Sélectionnez un corps d'état pour voir les prestations
            </div>
          )}
        </div>
      </div>
    </div>
  );
}