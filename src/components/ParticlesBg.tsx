import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
// import type { Engine } from 'tsparticles-engine'; // Removed mismatched type

export const ParticlesBg: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // particles loaded
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: { color: { value: '#0000' } },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
          color: { value: '#2dd4bf' },
          links: { color: '#2dd4bf', distance: 150, enable: true, opacity: 0.2, width: 1 },
          collisions: { enable: true },
          move: { enable: true, speed: 1, direction: 'none', outModes: { default: 'bounce' } },
          number: { value: 50, density: { enable: true, area: 800 } },
          opacity: { value: 0.3 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBg; 