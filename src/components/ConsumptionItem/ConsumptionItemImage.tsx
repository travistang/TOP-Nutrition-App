import React, { useCallback, useEffect, useRef, useState } from "react";
import { Food } from "../../types/Food";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullScreenImageViewer from "../FullScreenImageViewer";

type Props = {
  withImagePreview?: boolean;
  consumption: Food;
};
export default function ConsumptionItemImage({ consumption }: Props) {
  const [showFullSizeImage, setShowFullSizeImage] = useState(false);
  const imageRef = useRef<Blob | null>(null);
  const hasImage = !!imageRef.current;
  const imageUrl = hasImage
    ? `url(${URL.createObjectURL(imageRef.current!)})`
    : undefined;

  useEffect(() => {
    ConsumptionDatabase.getOrCreateFoodDetailByRecord(consumption).then(
      (foodDetail) => {
        imageRef.current = foodDetail?.image ?? null;
      }
    );
  }, [consumption]);

  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullSizeImage(true);
  }, []);

  const onCloseFullSizeImage = useCallback(
    () => setShowFullSizeImage(false),
    []
  );

  const style = imageUrl
    ? {
        backgroundImage: imageUrl,
        backgroundSize: "cover",
      }
    : undefined;
  return (
    <>
      <div
        style={style}
        onClick={onClick}
        className="flex-shrink-0 rounded-lg w-14 h-full m-2 bg-gray-400 flex items-center justify-center"
      >
        {!hasImage && (
          <FontAwesomeIcon icon="image" className="w-4 h-4 child:fill-white" />
        )}
      </div>
      {showFullSizeImage && hasImage && (
        <FullScreenImageViewer
          onClose={onCloseFullSizeImage}
          image={imageRef.current!}
        />
      )}
    </>
  );
}
