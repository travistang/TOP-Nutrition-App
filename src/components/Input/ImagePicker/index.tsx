import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, {
  ChangeEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../Button";
import FullScreenImageViewer from "../../FullScreenImageViewer";

type Props = {
  className?: string;
  image: Blob | null;
  onChange: (image: Blob | null) => void;
};
export default function ImagePicker({ className, image, onChange }: Props) {
  const [viewingImage, setViewingImage] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imageSrc = useMemo(
    () => (image ? `url(${URL.createObjectURL(image)})` : ""),
    [image]
  );

  const onChooseImage = useCallback(() => {
    inputRef.current?.click();
  }, []);
  const onSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const imageSelected = e.target.files?.[0];
      if (!imageSelected) return;

      onChange(imageSelected);
      inputRef.current!.value = "";
    },
    [onChange]
  );
  const onClearImage: React.MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      onChange(null);
    },
    [onChange]
  );
  const togglePreview = useCallback(
    (shouldPreviewOpen: boolean) => (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setViewingImage(shouldPreviewOpen);
    },
    []
  );

  return (
    <div
      onClick={onChooseImage}
      className={classNames(
        "group relative rounded-lg bg-gray-400 flex items-center justify-center",
        className
      )}
      style={{
        backgroundImage: imageSrc,
        backgroundSize: "cover",
      }}
    >
      <input
        className="hidden"
        onChange={onSelectImage}
        ref={inputRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        alt="image-input"
      />
      {!image && (
        <FontAwesomeIcon icon="image" className="w-6 h-6 child:fill-gray-100" />
      )}
      {image && (
        <>
          <div className="hidden group-hover:flex absolute inset-0 rounded-lg bg-gray-400 bg-opacity-70 items-center justify-center">
            <FontAwesomeIcon
              icon="pen"
              className="child:fill-gray-100 w-6 h-6"
            />
          </div>
          <Button
            icon="times"
            className="z-30 w-4 h-4 rounded-full bg-red-500 absolute top-0 left-0 text-xs -translate-y-2 -translate-x-2"
            onClick={onClearImage}
          />
          <Button
            icon="expand"
            className="z-30 w-4 h-4 rounded-full bg-gray-100 absolute bottom-0 right-0 text-xs translate-y-2 translate-x-2"
            textClassName="child:fill-gray-800"
            onClick={togglePreview(true)}
          />
        </>
      )}
      {viewingImage && image && (
        <FullScreenImageViewer image={image} onClose={togglePreview(false)} />
      )}
    </div>
  );
}
