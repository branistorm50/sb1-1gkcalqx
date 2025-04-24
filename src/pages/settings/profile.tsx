import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Building2, Save, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/lib/supabase";
import { debounce } from "@/lib/utils";

type ProfileFormValues = Omit<Tables<'profiles'>, 'id' | 'updated_at'>;

export default function ProfileSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [savedStatus, setSavedStatus] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isDirty } } = useForm<ProfileFormValues>({
    defaultValues: {
      username: "",
      full_name: "",
      company_name: "",
      address: "",
      postal_code: "",
      city: "",
      country: "",
      phone: "",
      website: "",
      siret: "",
      vat_number: "",
      logo_url: "",
      primary_color: "#3B82F6",
      secondary_color: "#F59E0B",
      iban: "",
      bic: "",
      quote_prefix: "DEV-",
      invoice_prefix: "FAC-",
      terms_and_conditions: "",
    }
  });

  // Watch form values for autosave
  const watchedValues = watch();

  // Auto-save when form values change
  useEffect(() => {
    const debouncedSave = debounce(async () => {
      if (isDirty && userId) {
        saveData(watchedValues);
      }
    }, 2000);

    if (isDirty) {
      debouncedSave();
    }

    return () => {
      // Cancel debounce on cleanup
    };
  }, [watchedValues, isDirty, userId]);

  useEffect(() => {
    async function fetchProfileData() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        
        // Check if profile exists
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          toast.error("Erreur lors du chargement du profil");
          return;
        }
        
        if (profile) {
          reset(profile);
        } else {
          // Create a new profile
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id,
                quote_prefix: 'DEV-',
                invoice_prefix: 'FAC-'
              }
            ]);
            
          if (insertError) {
            toast.error("Erreur lors de la création du profil");
          }
        }
      }
    }
    
    fetchProfileData();
  }, [reset]);

  const saveData = async (data: ProfileFormValues) => {
    if (!userId) return;
    
    setIsSaving(true);
    setSavedStatus("");
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      setSavedStatus("saved");
      setTimeout(() => setSavedStatus(""), 2000);
    } catch (error: any) {
      toast.error("Erreur lors de la sauvegarde: " + error.message);
      setSavedStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    saveData(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paramètres du profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et préférences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {savedStatus === "saved" && (
            <p className="text-sm text-accent autosave-success">Enregistré</p>
          )}
          <Button 
            onClick={handleSubmit(onSubmit)} 
            disabled={isSaving || !isDirty}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Entreprise
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personnel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Nom de l'entreprise</Label>
                <Input 
                  id="company_name" 
                  {...register("company_name")} 
                  placeholder="Votre entreprise" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input 
                  id="address" 
                  {...register("address")} 
                  placeholder="123 Rue Example" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Code postal</Label>
                  <Input 
                    id="postal_code" 
                    {...register("postal_code")} 
                    placeholder="75001" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input 
                    id="city" 
                    {...register("city")} 
                    placeholder="Paris" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input 
                  id="country" 
                  {...register("country")} 
                  placeholder="France" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  {...register("phone")} 
                  placeholder="+33 6 12 34 56 78" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input 
                  id="website" 
                  {...register("website")} 
                  placeholder="https://votresite.com" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siret">SIRET</Label>
                <Input 
                  id="siret" 
                  {...register("siret")} 
                  placeholder="12345678901234" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vat_number">Numéro TVA</Label>
                <Input 
                  id="vat_number" 
                  {...register("vat_number")} 
                  placeholder="FR12345678901" 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Logo de l'entreprise</Label>
            <div className="flex items-center gap-4">
              {watchedValues.logo_url ? (
                <div className="relative h-24 w-24 rounded-md border overflow-hidden">
                  <img 
                    src={watchedValues.logo_url} 
                    alt="Logo" 
                    className="h-full w-full object-contain" 
                  />
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-md border bg-muted">
                  <Building2 className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              <div className="space-y-2">
                <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Télécharger un logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  Formats recommandés: PNG, SVG. Taille max: 2MB
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations bancaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input 
                  id="iban" 
                  {...register("iban")} 
                  placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bic">BIC</Label>
                <Input 
                  id="bic" 
                  {...register("bic")} 
                  placeholder="XXXXXXPPXXX" 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Préférences des documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote_prefix">Préfixe des devis</Label>
                <Input 
                  id="quote_prefix" 
                  {...register("quote_prefix")} 
                  placeholder="DEV-" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice_prefix">Préfixe des factures</Label>
                <Input 
                  id="invoice_prefix" 
                  {...register("invoice_prefix")} 
                  placeholder="FAC-" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="terms_and_conditions">Conditions générales</Label>
              <Textarea 
                id="terms_and_conditions" 
                {...register("terms_and_conditions")} 
                placeholder="Vos conditions générales qui apparaîtront sur les devis et factures..."
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary_color">Couleur principale</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    id="primary_color"
                    {...register("primary_color")}
                    className="w-10 h-10 p-1 rounded cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={watchedValues.primary_color}
                    onChange={(e) => setValue('primary_color', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary_color">Couleur secondaire</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    id="secondary_color"
                    {...register("secondary_color")}
                    className="w-10 h-10 p-1 rounded cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={watchedValues.secondary_color}
                    onChange={(e) => setValue('secondary_color', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nom complet</Label>
                <Input 
                  id="full_name" 
                  {...register("full_name")} 
                  placeholder="Jean Dupont" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input 
                  id="username" 
                  {...register("username")} 
                  placeholder="jean.dupont" 
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}