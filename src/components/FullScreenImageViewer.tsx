import React, { useCallback, useMemo } from "react";

type Props = {
  image: Blob;
  onClose: () => void;
};
export default function FullScreenImageViewer({ image, onClose }: Props) {
  const url = useMemo(() => URL.createObjectURL(image), [image]);
  const onCloseWithStopPropagation = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  return (
    <div
      onClick={onCloseWithStopPropagation}
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
