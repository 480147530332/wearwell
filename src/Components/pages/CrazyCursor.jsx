
import React, { useEffect, useState } from 'react';

const CrazyCursor = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };

      setTrails((prev) => [...prev, newDot]);


      setTimeout(() => {
        setTrails((prev) => prev.filter((dot) => dot.id !== newDot.id));
      }, 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ pointerEvents: 'none' }}>
      {trails.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: 'fixed',
            left: dot.x,
            top: dot.y,
            width: '12px',
            height: '12px',
            background: 'blue',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'fadeOut 0.4s ease-out forwards',
          }}
        />
      ))}
    </div>
  );
};


export default CrazyCursor;
