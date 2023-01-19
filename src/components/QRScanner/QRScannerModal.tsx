import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { supportTorch, useRequestCameraPermission } from '../../domain/MediaDevices';
import useQRCodeReaderControl from '../../hooks/useQRCodeReaderControl';

import Button, { ButtonStyle } from '../Input/Button';

type Props = {
  opened: boolean;
  onClose: () => void;
  onQRCodeDetected: (code: string) => void;
  label: string;
  message: string;
}
export default function QRScannerModal({ message, opened, onClose, onQRCodeDetected }:Props) {
  const hasPermission = useRequestCameraPermission(opened);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const [cameraLightOn, setCameraLightOn] = useState(false);
  const canSwitchOnLight = supportTorch();

  const onCodeDetectedWithClose = (code: string) => {
    onQRCodeDetected(code);
    onClose();
  }

  const { stop, cameraControl, focusCamera } = useQRCodeReaderControl(videoPreviewRef, onCodeDetectedWithClose);
  const toggleLight = () => {
    if (!canSwitchOnLight) return;
    const willCameraLightOn = !cameraLightOn;
    cameraControl.current?.streamVideoConstraintsApply?.({
      advanced: [{
        torch: willCameraLightOn
      } as MediaTrackConstraints]
    });
    setCameraLightOn(willCameraLightOn);
  }

  const onCloseWithCameraCleanup = () => {
    stop();
    onClose();
  }
  if (!opened || !hasPermission) return null;

  return (
    <div
      onClick={focusCamera}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video className='object-cover absolute left-0 top-0 h-full w-full z-0' ref={videoPreviewRef} />
      <div
        className="flex items-center justify-center relative z-50 border-4 w-[60vw] h-[60vw] rounded-lg border-gray-200"
        style={{ boxShadow: '0 0 0 100vmax rgb(0 0 0 / .7)' }}
      >
        {canSwitchOnLight && (
          <Button
            className={classNames(
              "absolute -bottom-24 w-16 h-16 bg-opacity-50",
              cameraLightOn ? "bg-yellow-500" : "bg-gray-700",
            )}
            circle
            onClick={toggleLight}
            buttonStyle={ButtonStyle.Clear}
            icon="lightbulb"
          />
        )}
      </div>
      <Button
        onClick={onCloseWithCameraCleanup}
        buttonStyle={ButtonStyle.Clear}
        icon="times"
        textClassName='child:fill-gray-100 font-bold text-xl'
        className="absolute top-8 right-8 h-16 w-16 z-50" />
      <div className="absolute left-4 right-4 bottom-4 rounded-lg p-4 bg-gray-700 text-gray-300 z-50 text-center flex items-center">
        {message}
      </div>
    </div>
  )
}