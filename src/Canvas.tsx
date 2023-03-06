import React, {useRef, useEffect, useState} from 'react';

export const Canvas = ({...props}) => {
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState<string>('5')

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = lineWidth;
  }, [lineWidth])

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;

    ctx.lineWidth = lineWidth;
    let isPainting = false;

    function onMove(event) {
      if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
      }
      ctx.moveTo(event.offsetX, event.offsetY);
    }
    function startPainting() {
      isPainting = true;
    }
    function cancelPainting() {
      isPainting = false;
      ctx.beginPath();
    }
    function onLineWidthChange(event) {
      console.log(event.target.value);
      ctx.lineWidth = event.target.value;
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", cancelPainting);
    canvas.addEventListener("mouseleave", cancelPainting);
  }, []);

  const onChange = (event) => {
    setLineWidth(event.target.value)
  }

  return <><canvas ref={canvasRef} {...props} /><input type="range" min="1" max="10" step='0.1' value={lineWidth}  onChange={onChange}/></>
};
