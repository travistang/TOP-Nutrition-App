import React, { useMemo } from "react";

type Props = {
  image: Blob;
  onClose: () => void;
};
export default function FullScreenImageViewer({ image, onClose }: Props) {
  const url = useMemo(() => URL.createObjectURL(image), [image]);
  return (
    <div
      onClick={onClose}
      className="z-50 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80"
    >
      <img
        onClick={(e) => e.stopPropagation()}
        className="max-w-full bg-contain"
        src={url}
        alt="fullscreen-viewer"
      />
    </div>
  );
}
