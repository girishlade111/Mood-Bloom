import { Github, Instagram, Linkedin, Codepen, Mail } from 'lucide-react';

const socialLinks = [
    {
      href: 'https://www.instagram.com/girish_lade_/',
      icon: Instagram,
      label: 'Instagram',
    },
    {
      href: 'https://www.linkedin.com/in/girish-lade-075bba201/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/girishlade111',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: 'https://codepen.io/Girish-Lade-the-looper',
      icon: Codepen,
      label: 'Codepen',
    },
    {
      href: 'mailto:girishlade111@gmail.com',
      icon: Mail,
      label: 'Email',
    },
  ];
  
  export function Footer() {
    return (
      <footer className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Connect with me</p>
            <div className="flex items-center gap-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-accent transition-colors"
                >
                    <Icon className="h-6 w-6" />
                </a>
                ))}
            </div>
            <p className="text-xs text-muted-foreground/50 mt-4">
              © {new Date().getFullYear()} Girish Lade. All rights reserved.
            </p>
        </div>
      </footer>
    );
  }
  