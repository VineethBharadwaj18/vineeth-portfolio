'use client';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '7997491801';
  const message = 'Hi! I am interested in your work. Let\'s connect!';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-40 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      title="Chat with us on WhatsApp"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C7.16 0 0 7.16 0 16c0 2.84.72 5.56 2.08 7.92L0 32l8.32-2.08C10.44 31.28 13.16 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm0 29.44c-2.56 0-5.08-.64-7.28-1.84l-.52-.32-5.4 1.36 1.36-5.4-.32-.52C2.2 21.08 1.56 18.56 1.56 16c0-7.6 6.28-13.88 13.88-13.88 7.6 0 13.88 6.28 13.88 13.88-1.56 7.6-7.84 13.88-13.88 13.88zm7.6-10.4c-.4-.2-2.4-1.2-2.8-1.32-.4-.12-.68-.2-.96.2-.28.4-1.08 1.32-1.32 1.6-.24.28-.48.32-.88.12-.4-.2-1.68-.64-3.2-2-1.2-1.08-2-2.4-2.24-2.8-.24-.4-.04-.6.16-.8.16-.16.4-.4.6-.64.2-.24.28-.4.4-.68.12-.28.04-.52-.04-.72-.08-.2-.96-2.32-1.32-3.16-.36-.8-.72-.68-.96-.68-.24 0-.52-.04-.8-.04-.28 0-.72.12-1.12.52-.4.4-1.52 1.48-1.52 3.6 0 2.12.96 4.16 1.12 4.44.16.28 2.24 3.44 5.44 4.84.76.32 1.36.52 1.84.68.76.24 1.44.2 2-.12.6-.36 1.92-1.24 2.2-2.44.28-1.2.28-2.24.2-2.44-.08-.2-.36-.32-.76-.52z"
          fill="white"
        />
      </svg>
    </motion.button>
  );
}

