'use client';

import EditorTool from '@/components/editor/EditorTool';
import SharePixelArt from '@/components/editor/SharePixelArt';
import { useDisclosure } from '@nextui-org/react';

import { useEffect, useRef, useState } from 'react';
import { CirclePicker } from 'react-color';
import { GoPencil } from 'react-icons/go';
import { IoCloudDownloadOutline, IoShare } from 'react-icons/io5';
import { LuPaintBucket } from 'react-icons/lu';
import { RiEraserLine } from 'react-icons/ri';

enum Tools {
  PENCIL,
  ERASER,
  BUCKET,
}

const Editor: React.FC = () => {
  const pixel_size = 10;
  const canvas_pixel_width = 50;
  const canvas_pixel_height = 50;
  const canvas_width = pixel_size * canvas_pixel_width;
  const canvas_height = pixel_size * canvas_pixel_height;
  const default_canvas_color = '#000000';

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentTool, setCurrentTool] = useState<Tools>(Tools.PENCIL);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>('#ffffff');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [base64, setBase64] = useState<string>('');

  const [pixelGrid, setPixelGrid] = useState<string[][]>(() => {
    const pixel_array: string[][] = [];

    for (let i = 0; i < canvas_pixel_width; i++) {
      pixel_array.push(
        new Array(canvas_pixel_height).fill(default_canvas_color)
      );
    }
    return pixel_array;
  });

  function getPixelCoordinateFromEvent(
    e: MouseEvent,
    canvas: HTMLCanvasElement
  ) {
    const box = canvas.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const pixel_x = Math.ceil((mouseX - box.left) / pixel_size) - 1;
    const pixel_y = Math.ceil((mouseY - box.top) / pixel_size) - 1;
    return { pixel_x, pixel_y };
  }

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas_width, canvas_height);
      ctx.fillStyle = 'white';

      for (let i = 0; i < pixelGrid.length; i++) {
        for (let j = 0; j < pixelGrid[i].length; j++) {
          ctx.fillStyle = pixelGrid[i][j];
          ctx.fillRect(i * pixel_size, j * pixel_size, pixel_size, pixel_size);
        }
      }
    }
  }, [pixelGrid, ctx, canvas_width, canvas_height]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.onmousemove = (e) => {
      const { pixel_x, pixel_y } = getPixelCoordinateFromEvent(e, canvas);

      if (pixel_x > -1 && pixel_y > -1) {
        if (isMouseDown && currentTool === Tools.PENCIL) {
          const copy = [...pixelGrid];
          copy[pixel_x][pixel_y] = currentColor;
          setPixelGrid(copy);
        }
        if (isMouseDown && currentTool === Tools.ERASER) {
          const copy = [...pixelGrid];
          copy[pixel_x][pixel_y] = default_canvas_color;
          setPixelGrid(copy);
        }
      }

      canvas.onclick = (e) => {
        const { pixel_x, pixel_y } = getPixelCoordinateFromEvent(e, canvas);

        if (currentTool === Tools.BUCKET) {
          const target_color = pixelGrid[pixel_y][pixel_x];
          const queue = [[pixel_y, pixel_x]];

          const new_grid = [...pixelGrid];

          while (queue.length > 0) {
            if (!val) continue;
            const [y, x] = val;
            if (y < 0 || x < 0 || y >= pixel_size || x >= pixel_size) continue;
            if (new_grid[y][x] !== target_color) continue;

            new_grid[y][x] = currentColor;
            queue.push([y + 1, x]);
            queue.push([y - 1, x]);
            queue.push([y, x + 1]);
            queue.push([y, x - 1]);
          }

          setPixelGrid(new_grid);
        }
      };
    };

    return () => {
      canvas.onmousemove = null;
    };
  }, [isMouseDown, currentTool, pixelGrid, currentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx && setCtx(ctx);

      canvas.width = canvas_width;
      canvas.height = canvas_height;

      canvas.onmousedown = () => {
        setIsMouseDown(true);
      };

      canvas.onmouseup = () => {
        setIsMouseDown(false);
      };
    }
  }, [canvas_height, canvas_width]);

  return (
    <div className="w-full h-screen flex">
      <div className="h-full bg-gray-900 p-2 space-y-2">
        <EditorTool
          onClick={() => {
            setCurrentTool(Tools.PENCIL);
          }}
          tool_icon={<GoPencil />}
        />
        <EditorTool
          onClick={() => {
            setCurrentTool(Tools.ERASER);
          }}
          tool_icon={<RiEraserLine />}
        />
        <EditorTool
          onClick={() => {
            setCurrentTool(Tools.BUCKET);
          }}
          tool_icon={<LuPaintBucket />}
        />
        <EditorTool
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const imageUrl = canvas.toDataURL();
            setBase64(imageUrl);
            onOpen();
          }}
          tool_icon={<IoShare />}
        />
        <EditorTool
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const imageUrl = canvas.toDataURL();
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = 'true';

            a.click();
          }}
          tool_icon={<IoCloudDownloadOutline />}
        />
      </div>
      <div className="flex-grow h-full flex justify-between items-center bg-slate-800">
        <div className="w-full">
          <div className="m-3 p-2 w-full rounded-md bg-slate-900">
            {[Tools.BUCKET, Tools.PENCIL].includes(currentTool) && (
              <CirclePicker
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
            )}
          </div>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
      <SharePixelArt
        base64={base64}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default Editor;
