import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function NewService() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const serviceData = {
        name: formData.get('name'),
        description: formData.get('description'),
        technical_details: formData.get('technical_details'),
        category_id: formData.get('category_id'),
        unit: formData.get('unit'),
        price: parseFloat(formData.get('price') as string),
        tax_rate: parseFloat(formData.get('tax_rate') as string),
        is_custom: true,
      };

      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) throw error;

      toast.success('Service created successfully');
      navigate('/services');
    } catch (error) {
      toast.error('Failed to create service');
      console.error('Error creating service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">New Service</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Enter service name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter service description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technical_details">Technical Details</Label>
            <Textarea
              id="technical_details"
              name="technical_details"
              placeholder="Enter technical details"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            <select
              id="category_id"
              name="category_id"
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                name="unit"
                required
                placeholder="hour, day, piece..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax_rate">Tax Rate (%)</Label>
              <Input
                id="tax_rate"
                name="tax_rate"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue="20.00"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/services')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Service'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}