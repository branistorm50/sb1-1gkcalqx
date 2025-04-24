import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function NewClient() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientType, setClientType] = useState<'individual' | 'company'>('individual');
  const [sameAddress, setSameAddress] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const formData = new FormData(e.currentTarget);
      const clientData = {
        user_id: user.id,
        type: clientType,
        name: formData.get('name'),
        contact_name: formData.get('contact_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal_code: formData.get('postal_code'),
        country: formData.get('country'),
        siret: clientType === 'company' ? formData.get('siret') : null,
        vat_number: clientType === 'company' ? formData.get('vat_number') : null,
        notes: formData.get('notes'),
        billing_address: sameAddress ? formData.get('address') : formData.get('billing_address'),
        billing_city: sameAddress ? formData.get('city') : formData.get('billing_city'),
        billing_postal_code: sameAddress ? formData.get('postal_code') : formData.get('billing_postal_code'),
        billing_country: sameAddress ? formData.get('country') : formData.get('billing_country'),
        same_address: sameAddress,
      };

      const { error } = await supabase
        .from('clients')
        .insert([clientData]);

      if (error) throw error;

      toast.success('Client created successfully');
      navigate('/clients');
    } catch (error) {
      toast.error('Failed to create client');
      console.error('Error creating client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">New Client</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Client Type</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={clientType === 'individual' ? 'default' : 'outline'}
                onClick={() => setClientType('individual')}
              >
                Individual
              </Button>
              <Button
                type="button"
                variant={clientType === 'company' ? 'default' : 'outline'}
                onClick={() => setClientType('company')}
              >
                Company
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              {clientType === 'company' ? 'Company Name' : 'Full Name'}
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder={clientType === 'company' ? 'Enter company name' : 'Enter full name'}
            />
          </div>

          {clientType === 'company' && (
            <div className="space-y-2">
              <Label htmlFor="contact_name">Contact Person</Label>
              <Input
                id="contact_name"
                name="contact_name"
                placeholder="Enter contact person name"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {clientType === 'company' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siret">SIRET</Label>
                <Input
                  id="siret"
                  name="siret"
                  placeholder="Enter SIRET number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat_number">VAT Number</Label>
                <Input
                  id="vat_number"
                  name="vat_number"
                  placeholder="Enter VAT number"
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold">Address</h3>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  placeholder="Enter postal code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Enter country"
                defaultValue="France"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="same_address"
                checked={sameAddress}
                onChange={(e) => setSameAddress(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="same_address">
                Billing address is the same as physical address
              </Label>
            </div>
          </div>

          {!sameAddress && (
            <div className="space-y-4">
              <h3 className="font-semibold">Billing Address</h3>
              <div className="space-y-2">
                <Label htmlFor="billing_address">Street Address</Label>
                <Input
                  id="billing_address"
                  name="billing_address"
                  placeholder="Enter billing street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billing_postal_code">Postal Code</Label>
                  <Input
                    id="billing_postal_code"
                    name="billing_postal_code"
                    placeholder="Enter billing postal code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_city">City</Label>
                  <Input
                    id="billing_city"
                    name="billing_city"
                    placeholder="Enter billing city"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing_country">Country</Label>
                <Input
                  id="billing_country"
                  name="billing_country"
                  placeholder="Enter billing country"
                  defaultValue="France"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Enter any additional notes"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/clients')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Client'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}