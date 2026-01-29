import type { SpringOptions } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = true,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude * (isMobile ? 0.6 : 1);
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude * (isMobile ? 0.6 : 1);

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{
        height: isMobile ? '110px' : containerHeight,
        width: isMobile ? '98vw' : containerWidth,
        maxWidth: isMobile ? '340px' : undefined,
        margin: isMobile ? '0 auto 1.5rem auto' : undefined,
        boxShadow: isMobile
          ? '0 2px 12px rgba(0,0,0,0.18)'
          : '0 4px 24px rgba(0,0,0,0.18)',
        borderRadius: '15px',
        background: isMobile ? 'rgba(30,30,30,0.85)' : 'transparent',
        border: isMobile ? '1.5px solid #fff2' : 'none',
        padding: isMobile ? '0.2rem' : '0',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          scale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover rounded-[15px] will-change-transform"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '15px',
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div
            className="absolute top-0 left-0 w-full flex justify-center z-[2]"
            style={{
              transform: 'translateZ(30px)',
              padding: isMobile ? '0.12rem 0.5rem' : '0.7rem 1rem',
              background: isMobile ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0.22)',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
            }}
          >
            <div
              className="text-white font-semibold"
              style={{
                fontSize: isMobile ? '0.78rem' : '1.18rem',
                lineHeight: isMobile ? '1rem' : '1.5rem',
                fontWeight: 600,
                textAlign: 'center',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                letterSpacing: isMobile ? '0.01em' : undefined,
              }}
            >
              {overlayContent}
            </div>
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 rounded-sm bg-white px-2.5 py-1 text-xs text-gray-800 z-[3]"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
            fontSize: isMobile ? '0.85rem' : undefined,
          }}
        >
          {captionText}
        </motion.div>
      )}
    </div>
  );
}

