import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, QrCode } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import QRGeneratorWidget from "@/components/qr-generator/QRGeneratorWidget";

const QRGeneratorPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSignOut = async () => {
        if (!supabase) {
            toast.error("Supabase is not configured.");
            return;
        }

        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Signed out.");
        navigate("/auth?mode=login", { replace: true });
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-linear-to-b from-sidebar to-secondary/20">
            {/* Dot grid background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[20px_20px] opacity-10 pointer-events-none" />

            {/* ── Sticky header ── */}
            <header className="shrink-0 border-b border-white/10 bg-sidebar/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-13 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                            <QrCode className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-white tracking-tight">Create QR in 3 simple steps</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="hidden max-w-48 truncate text-sm text-white/70 md:block">
                            {user?.email}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            className="text-white/80 hover:bg-white/10 hover:text-white"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Widget fills the rest ── */}
            <div className="flex-1 min-h-0 container mx-auto px-4 pb-4">
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <QRGeneratorWidget />
                </motion.div>
            </div>
        </div>
    );
};

export default QRGeneratorPage;
