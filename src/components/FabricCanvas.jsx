import React, { useState } from "react";
import { FabricJSCanvas } from "fabricjs-react";

export const FabricCanvas = ({
  editor,
  onReady,
  setOriginalImage,
}) => {
  const [brushSize, setBrushSize] = useState(10);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          editor?.canvas.setBackgroundImage(
            img.src,
            editor.canvas.renderAll.bind(editor.canvas),
            {
              scaleX: editor.canvas.width / img.width,
              scaleY: editor.canvas.height / img.height,
            }
          );
          setOriginalImage(img.src);
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid JPEG or PNG image.");
    }
  };

  const handleBrushSizeChange = (event) => {
    const size = parseInt(event.target.value, 10);
    setBrushSize(size);
    editor?.canvas.freeDrawingBrush &&
      (editor.canvas.freeDrawingBrush.width = size);
  };

  const enableDrawingMode = () => {
    editor.canvas.isDrawingMode = true;
    editor?.canvas.freeDrawingBrush &&
      (editor.canvas.freeDrawingBrush.color = "yellow");
  };

  return (
    <div className="canvas-container flex flex-col items-center space-y-4 py-4">
      <div className="flex flex-row gap-4">
        <button
          onClick={enableDrawingMode}
          className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Enable Drawing
        </button>
        <label className="flex items-center space-x-3">
          <span className="text-gray-300">Brush Size:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleBrushSizeChange}
            className="w-40"
          />
        </label>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full max-w-xs px-4 py-2 text-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <FabricJSCanvas
        className="canvas border border-gray-400 w-[800px] h-[600px]"
        onReady={onReady}
      />

    </div>
  );
};
