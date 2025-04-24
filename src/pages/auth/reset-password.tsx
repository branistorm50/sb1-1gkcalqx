import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-success`,
      });

      if (error) {
        throw error;
      }

      setIsSent(true);
      toast.success("Email de réinitialisation envoyé");
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Réinitialiser le mot de passe</h2>
        <p className="text-sm text-muted-foreground">
          {isSent
            ? "Vérifiez votre email pour réinitialiser votre mot de passe"
            : "Entrez votre email pour recevoir un lien de réinitialisation"}
        </p>
      </div>
      
      {!isSent ? (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm">
              Un email a été envoyé à <strong>{email}</strong> avec les 
              instructions pour réinitialiser votre mot de passe.
            </p>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSent(false)}
          >
            Renvoyer l'email
          </Button>
        </div>
      )}
      
      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}