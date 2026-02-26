import { useState, useEffect } from "react";
import { QrCode, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "QR Types", href: "#types" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-sidebar/95 backdrop-blur-sm border-b border-sidebar-border/10 shadow-sm",
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 shadow-lg">
        <Link to="/" className="flex items-center gap-2">
          <QrCode className="h-8 w-8 text-sidebar-primary" />
          <span className="font-display text-xl font-bold text-sidebar-foreground">
            QRYards
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Link to="/auth?mode=login">
            <Button variant="ghost" size="sm" className="text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-foreground">
              Log in
            </Button>
          </Link>
          <Link to="/auth?mode=register">
            <Button size="sm" className="bg-primary text-primary-foreground hover:brightness-110 shadow-md">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden bg-background border-t px-4 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/auth?mode=login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full btn-3d">
                Log in
              </Button>
            </Link>
            <Link to="/auth?mode=register" className="flex-1">
              <Button size="sm" className="w-full btn-3d-primary text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;