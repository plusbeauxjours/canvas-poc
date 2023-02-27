import React, {useRef, useEffect} from 'react';

export const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeRect(75, 140, 150, 110);
    canvas.width = 800;
    canvas.height = 800;

    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(150, 150);
    ctx.lineTo(50, 150);
    ctx.lineTo(50, 50);
    ctx.strokeStyle = 'cyan';
    ctx.fillStyle = 'tomato';
    ctx.fill();
    ctx.stroke();

    // ... draw initial canvas here ...
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};
