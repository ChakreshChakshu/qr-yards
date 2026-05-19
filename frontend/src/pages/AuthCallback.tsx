import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const searchParams = new URLSearchParams(window.location.search);
    const errorDescription = hashParams.get("error_description") ?? searchParams.get("error_description");
    const code = searchParams.get("code");

    if (errorDescription) {
      toast.error(decodeURIComponent(errorDescription));
      window.history.replaceState(null, "", "/auth?mode=login");
      navigate("/auth?mode=login", { replace: true });
      return;
    }

    if (!supabase) {
      navigate("/auth?mode=login", { replace: true });
      return;
    }

    const finishOAuth = async () => {
      if (code && !user) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          toast.error(error.message);
          window.history.replaceState(null, "", "/auth?mode=login");
          navigate("/auth?mode=login", { replace: true });
          return;
        }
      }

      if (!loading) {
        navigate(user ? "/qr-generator" : "/auth?mode=login", { replace: true });
      }
    };

    void finishOAuth();
  }, [loading, navigate, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
        <h1 className="text-lg font-semibold text-foreground">Completing sign-in</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Waiting for Supabase to finish the OAuth callback.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
