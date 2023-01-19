import React, { useRef } from 'react';
import { useRequestCameraPermission } from '../../domain/MediaDevices';
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
  const onCodeDetectedWithClose = (code: string) => {
    onQRCodeDetected(code);
    onClose();
  }

  const { stop } = useQRCodeReaderControl(videoPreviewRef, onCodeDetectedWithClose);
  const onCloseWithCameraCleanup = () => {
    stop();
    onClose();
  }
  if (!opened || !hasPermission) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video className='object-cover absolute left-0 top-0 h-full w-full z-0' ref={videoPreviewRef} />
      <div className="z-50 border-4 w-[60vw] h-[60vw] rounded-lg border-gray-200" style={{ boxShadow: '0 0 0 100vmax rgb(0 0 0 / .7)' }}  />
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