import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {colors} from './constants';

export const Canvas = ({...props}) => {
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState<string>('5');
  const [lineColor, setLineColor] = useState<string>('#000');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = lineWidth;
  }, [lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
  }, [lineColor]);

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

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', cancelPainting);
    canvas.addEventListener('mouseleave', cancelPainting);
  }, []);

  const onChangeLineWidth = (event) => {
    setLineWidth(event.target.value);
  };

  const onClickLineColor = (color) => {
    setLineColor(color);
  };

  return (
    <>
      <canvas ref={canvasRef} {...props} />
      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={lineWidth}
        onChange={onChangeLineWidth}
      />
      <input type="color" value={lineColor} />
      {colors.map((color, index) => (
        <ColorBox
          key={index}
          style={{backgroundColor: color}}
          onClick={() => onClickLineColor(color)}
        />
      ))}
    </>
  );
};

const ColorBox = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
