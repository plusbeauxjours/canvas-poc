import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {colors} from './constants';

export const CanvasComponent = ({...props}) => {
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState<string>('5');
  const [lineColor, setLineColor] = useState<string>(colors[0]);

  let isPainting = false;

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

    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

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
      <Canvas ref={canvasRef} {...props} />
      <Input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={lineWidth}
        onChange={onChangeLineWidth}
      />
      <Input type="color" value={lineColor} readOnly />
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

const Canvas = styled.canvas``;

const Input = styled.input``;

const ColorBox = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
