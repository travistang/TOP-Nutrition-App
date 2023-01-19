import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import React, { useEffect, useRef } from "react";

export default function useQRCodeReaderControl(
  previewRef: React.MutableRefObject<HTMLVideoElement | null>,
  onCodeDetected: (code: string) => void,
) {
  const codeReaderRef = useRef<BrowserQRCodeReader>(new BrowserQRCodeReader());
  const cameraControl = useRef<IScannerControls | null>(null);
  useEffect(() => {
    if (previewRef.current && !cameraControl.current) {
      codeReaderRef.current.decodeFromConstraints(
        {
          video: {
            facingMode: { ideal: 'environment' },
            noiseSuppression: { ideal: true },
          },
        },
        previewRef.current,
        (result, error, control) => {
          cameraControl.current = control;
          if (result) {
            onCodeDetected(result.getText());
            cameraControl.current.stop();
            cameraControl.current = null;
          }
        });
    }
  }, [previewRef, onCodeDetected]);

  const stopCamera = () => {
    cameraControl.current?.stop();
    cameraControl.current = null;
  };

  const focusCamera = () => {;
    cameraControl.current?.streamVideoConstraintsApply?.({ focusMode: "auto" } as MediaTrackConstraints);
  }

  return {
    stop: stopCamera,
    focusCamera,
    cameraControl,
  };
}