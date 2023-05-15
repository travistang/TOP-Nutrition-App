import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Food } from "../types/Food";
import ConsumptionDatabase from "../database/ConsumptionDatabase";
import FullScreenImageViewer from "./FullScreenImageViewer";
import classNames from "classnames";

type Props = {
  className?: string;
  consumption: Food;
};
export default function ConsumptionItemImage({
  className,
  consumption,
}: Props) {
  const [showFullSizeImage, setShowFullSizeImage] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const hasImage = !!image;
  const imageUrl = hasImage ? `url(${URL.createObjectURL(image)})` : undefined;

  useEffect(() => {
    ConsumptionDatabase.getOrCreateFoodDetailByRecord(consumption).then(
      (foodDetail) => {
        setImage(foodDetail?.image ?? null);
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
        className={classNames(
          "flex-shrink-0 rounded-lg w-14 m-2 bg-gray-400 flex items-center justify-center",
          className
        )}
      >
        {!hasImage && (
          <FontAwesomeIcon icon="image" className="w-4 h-4 child:fill-white" />
        )}
      </div>
      {showFullSizeImage && hasImage && (
        <FullScreenImageViewer onClose={onCloseFullSizeImage} image={image} />
      )}
    </>
  );
}
