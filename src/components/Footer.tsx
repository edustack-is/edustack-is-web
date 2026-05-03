import {ExternalLink} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built for educational purposes. © 2026 Petr Vích.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/petrvich/edu-stack-is-sandbox"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
