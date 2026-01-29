'use client';
import ProfileCard from '../common/ProfileCard';
import Background from '../common/Background';
import BlurText from "../common/BlurText";
import Experience from '../sections/Experience';
import WhatsAppButton from '../WhatsAppButton';

interface HomeProps {
  isDark: boolean;
}

export default function Home({ isDark }: HomeProps) {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section with Background */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}>
          <Background
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Main Content */}
        <div
          className="hero-content"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '4rem',
          }}
        >
          <ProfileCard
            imageSrc="/mypic.jpg"
            altText="M.Vineeth Bharadwaj"
            captionText="Software Engineer"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="tilted-card-demo-text text-white">
                M.Vineeth Bharadwaj
              </div>
            }
          />

          <div style={{ maxWidth: 500, width: '100%' }}>
            <BlurText
              text={`A passionate and creative developer crafting thoughtful, interactive web experiences.`}
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-4xl font-bold text-center whitespace-pre-line"
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <Experience isDark={isDark} />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

