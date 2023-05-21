import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import FullScreenImageViewer from "./FullScreenImageViewer";

type Props = {
  image: Blob | null;
  className?: string;
};
export default function ImageViewer({ image, className }: Props) {
  const [showFullSizeImage, setShowFullSizeImage] = useState(false);
  const imageUrl = image ? `url(${URL.createObjectURL(image)})` : undefined;

  const style = imageUrl
    ? {
        backgroundImage: imageUrl,
        backgroundSize: "cover",
      }
    : undefined;
  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullSizeImage(true);
  }, []);

  const onCloseFullSizeImage = useCallback(
    () => setShowFullSizeImage(false),
    []
  );

  return (
    <>
      <div
        style={style}
        onClick={onClick}
        className={classNames(
          "flex-shrink-0 rounded-lg w-14 m-2 bg-gray-400 flex items-center justify-center",
          className
        )}
      >
        {!image && (
          <FontAwesomeIcon icon="image" className="w-4 h-4 child:fill-white" />
        )}
      </div>
      {showFullSizeImage && !!image && (
        <FullScreenImageViewer onClose={onCloseFullSizeImage} image={image} />
      )}
    </>
  );
}
