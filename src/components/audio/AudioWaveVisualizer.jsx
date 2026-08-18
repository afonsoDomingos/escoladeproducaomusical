import React, { useEffect, useState } from 'react';

export const AudioWaveVisualizer = ({ isPlaying = true, height = 48, barCount = 42, color = "#000000" }) => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    // Generate initial wave curve
    const initialBars = Array.from({ length: barCount }, (_, i) => {
      const progress = i / barCount;
      const waveShape = Math.sin(progress * Math.PI) * 0.7 + 0.3;
      return {
        height: Math.floor(waveShape * 80 + Math.random() * 20),
        delay: (i * 0.04).toFixed(2)
      };
    });
    setBars(initialBars);
  }, [barCount]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: `${height}px`,
        gap: '2px',
        width: '100%',
        padding: '4px 0',
        overflow: 'hidden'
      }}
    >
      {bars.map((bar, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: isPlaying ? `${bar.height}%` : '20%',
            backgroundColor: color,
            borderRadius: '2px',
            opacity: 0.85,
            transition: 'height 0.15s ease',
            animation: isPlaying ? `wavePulse 1.4s infinite ease-in-out` : 'none',
            animationDelay: `${bar.delay}s`
          }}
        />
      ))}
    </div>
  );
};
