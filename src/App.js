// App.jsx
import React, { useState } from "react";
import { FabricCanvas } from "./components/FabricCanvas";
import { Controls } from "./components/Controls";
import { OutputImages } from "./components/OutputImages";
import { useFabricJSEditor } from "fabricjs-react";

const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const { editor, onReady } = useFabricJSEditor();

  return (
    <div className="app-container bg-gray-900 min-h-screen p-6">
      <h1 className="app-title text-3xl font-bold text-center border-b-4 m-auto pb-2 border-blue-600 w-fit text-blue-600 mb-8">
        Image Inpainting Widget
      </h1>

      <FabricCanvas
        editor={editor}
        onReady={onReady}
        setOriginalImage={setOriginalImage}
      />

      <Controls editor={editor} setMaskImage={setMaskImage} />

      {originalImage && maskImage && (
        <OutputImages originalImage={originalImage} maskImage={maskImage} />
      )}
    </div>
  );
};

export default App;
