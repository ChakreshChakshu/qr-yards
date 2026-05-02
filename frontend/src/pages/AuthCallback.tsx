import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const errorDescription = hashParams.get("error_description");

    if (errorDescription) {
      toast.error(decodeURIComponent(errorDescription));
      window.history.replaceState(null, "", "/auth?mode=login");
      navigate("/auth?mode=login", { replace: true });
      return;
    }

    if (!loading) {
      navigate(user ? "/qr-generator" : "/auth?mode=login", { replace: true });
    }
  }, [loading, navigate, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
        <h1 className="text-lg font-semibold text-foreground">Completing sign-in</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Waiting for Supabase to finish the Google OAuth callback.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
