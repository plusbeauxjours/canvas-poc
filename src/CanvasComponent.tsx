import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {colors} from './constants';

export const CanvasComponent = ({...props}) => {
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState<string>('5');
  const [lineColor, setLineColor] = useState<string>(colors[0]);

  let isPainting = false;
  let isFilling = false;

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

    const modeBtn = document.getElementById('mode-btn');
    const destroyBtn = document.getElementById('destroy-btn');
    const eraserBtn = document.getElementById('eraser-btn');
    const fileInput = document.getElementById('file') as HTMLInputElement;

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 800;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

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

    function onDestroyClick() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    function onEraserClick() {
      ctx.strokeStyle = 'white';
    }

    function onModeClick() {
      console.log('isFilling', isFilling);
      if (isFilling) {
        isFilling = false;
        modeBtn.innerText = 'Fill';
      } else {
        isFilling = true;
        modeBtn.innerText = 'Draw';
      }
    }

    function onCanvasClick() {
      if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }

    function onFileChange(event) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.src = url;
      image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
      };
    }

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', cancelPainting);
    canvas.addEventListener('mouseleave', cancelPainting);
    canvas.addEventListener('click', onCanvasClick);

    modeBtn.addEventListener('click', onModeClick);
    destroyBtn.addEventListener('click', onDestroyClick);
    eraserBtn.addEventListener('click', onEraserClick);
    fileInput.addEventListener('change', onFileChange);
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
      <input type="file" accept="image/*" id="file" />
      <Input type="color" value={lineColor} readOnly />
      {colors.map((color, index) => (
        <ColorBox
          key={index}
          style={{backgroundColor: color}}
          onClick={() => onClickLineColor(color)}
        />
      ))}
      <Btn id="mode-btn">Fill</Btn>
      <Btn id="destroy-btn">Destroy</Btn>
      <Btn id="eraser-btn">Erase</Btn>
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

const Btn = styled.button``;
