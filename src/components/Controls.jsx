import React from "react";

export const Controls = ({ editor, setMaskImage}) => {

  const clearCanvas = () => {
    editor?.canvas.getObjects().forEach((obj) => {
      if (obj.type === "path") {
        editor.canvas.remove(obj);
      }
    });
    editor?.canvas.renderAll();
  };

    const exportMask = () => {
      if (!editor) return;

      const canvas = editor.canvas;
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;
      const maskContext = maskCanvas.getContext("2d");

      maskContext.fillStyle = "black";
      maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

      canvas.getObjects("path").forEach((path) => {
        path.render(maskContext);
      });

      const maskDataUrl = maskCanvas.toDataURL("image/png");
      setMaskImage(maskDataUrl);
    };


  return (
    <div className="controls flex mb-8">
      <div className="flex flex-row gap-4 m-auto">
        <button
          onClick={exportMask}
          className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
        >
          Export Mask
        </button>

        <button
          onClick={clearCanvas}
          className="px-6 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
};