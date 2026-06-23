import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94779639969"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 group"
      aria-label="Chat with WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
      <span className="absolute right-full mr-3 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Whatsapp
      </span>
    </a>
  );
}
