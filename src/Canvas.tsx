import React, {useRef, useEffect} from 'react';

export const CanvasA = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    ctx.fillRect(200, 200, 50, 200);
    ctx.fillRect(400, 200, 50, 200);
    ctx.lineWidth = 2;
    ctx.strokeRect(300, 300, 50, 100);
    ctx.fillRect(200, 200, 200, 20);
    ctx.moveTo(200, 200);
    ctx.lineTo(325, 100);
    ctx.stroke();
    ctx.lineTo(450, 200);
    ctx.fill();

    // ... draw initial canvas here ...
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export const CanvasB = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    ctx.fillRect(210, 200, 15, 100);
    ctx.fillRect(350, 200, 15, 100);
    ctx.fillRect(260, 200, 60, 200);
    ctx.arc(290, 160, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(275, 150, 5, Math.PI, 2 * Math.PI);
    ctx.arc(305, 150, 5, Math.PI, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    // ... draw initial canvas here ...
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};
