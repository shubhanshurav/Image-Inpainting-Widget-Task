import React from "react";

export const OutputImages = ({ originalImage, maskImage }) => (
  <div className="output-container text-white flex flex-col lg:flex-row justify-evenly items-center space-y-6 lg:space-y-0">
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Original Image</h3>
      <img
        src={originalImage}
        alt="Original"
        className="max-w-lg border border-gray-300 shadow-md"
      />
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Mask Image</h3>
      <img
        src={maskImage}
        alt="Mask"
        className="max-w-lg border border-gray-300 shadow-md"
      />
    </div>
  </div>
);
