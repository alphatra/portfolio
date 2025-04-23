import * as React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Send } from 'lucide-react';

export function ContactCard() {
  const emailAddress = 'your.email@example.com'; // <-- Replace with your actual email
  const contactPageUrl = '/contact'; // <-- Optional: Link to a contact page/form

  return (
    <div className={cn('minimal-block flex flex-col items-start justify-between p-6 h-full')}>
      <div>
        <Mail className="w-6 h-6 mb-3 text-foreground/80" />
        <h3 className="text-lg font-semibold mb-1 text-foreground">Get In Touch</h3>
        <p className="text-sm text-foreground/60 mb-3">
          Have a question or want to collaborate? Send me a message.
        </p>
        <a href={`mailto:${emailAddress}`} className="text-sm accent-underline inline-block">
          {emailAddress}
        </a>
      </div>
      {contactPageUrl && (
        <a
          href={contactPageUrl}
          className="text-sm accent-underline self-end mt-3 inline-flex items-center gap-1"
        >
          <Send className="w-4 h-4" /> Contact Form →
        </a>
      )}
    </div>
  );
}

export default ContactCard; 