import React, { ChangeEventHandler, useRef } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GPX } from "../../../domain/GPX";
import GPXPathViewer from "../../GPXPathViewer";

type Props = {
  gpx?: GPX;
  onSelectGpx: (file?: Blob) => void;
  className?: string;
};
export default function GPXInput({ gpx, className, onSelectGpx }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chooseFile = () => {
    inputRef.current?.click();
  };

  const onFileChosen: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const fileSelected = e.target.files?.[0];
    if (!fileSelected) return;
    onSelectGpx(fileSelected);
  };

  const onClear = () => onSelectGpx(undefined);

  return (
    <div
      onClick={chooseFile}
      className={classNames(
        "cursor-pointer rounded-lg p-2 flex items-center bg-gray-300 gap-2",
        className
      )}
    >
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        accept=".gpx"
        onChange={onFileChosen}
      />
      <div className="rounded-lg w-16 h-16 flex items-center justify-center">
        {gpx ? (
          <GPXPathViewer onDelete={onClear} gpx={gpx} />
        ) : (
          <FontAwesomeIcon icon="map" className="child:fill-gray-100 w-4 h-4" />
        )}
      </div>
    </div>
  );
}
