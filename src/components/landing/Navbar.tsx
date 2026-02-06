import { useState, useEffect } from "react";
import { QrCode, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-2">
          <QrCode className="h-8 w-8 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            QRYards
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm" className="gradient-primary text-primary-foreground">
            Get Started
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
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
            <Button variant="outline" size="sm" className="flex-1">
              Log in
            </Button>
            <Button size="sm" className="flex-1 gradient-primary text-primary-foreground">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;