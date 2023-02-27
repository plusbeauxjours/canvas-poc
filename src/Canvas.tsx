import React, {useRef, useEffect} from 'react';

export const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeRect(75, 140, 150, 110);
    canvas.width = 800;
    canvas.height = 800;

    // ctx.fillRect(0, 0, 400, 400);
    ctx.rect(0, 0, 100, 100);
    ctx.rect(100, 100, 100, 100);
    ctx.rect(200, 200, 100, 100);
    ctx.rect(300, 300, 100, 100);
    ctx.fillStyle = 'tomato';
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'cyan';
    ctx.rect(400, 400, 100, 100);
    ctx.fill();

    // ... draw initial canvas here ...
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};
