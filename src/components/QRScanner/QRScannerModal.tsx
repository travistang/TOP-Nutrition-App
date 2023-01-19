import React from 'react';
import { QrReader, OnResultFunction } from 'react-qr-reader';
import { useRequestCameraPermission } from '../../domain/MediaDevices';

import Button, { ButtonStyle } from '../Input/Button';
import Modal from '../Modal';
import SmallNotice from '../SmallNotice';

type Props = {
  opened: boolean;
  onClose: () => void;
  onQRCodeDetected: (code: string) => void;
  label: string;
  message: string;
}
export default function QRScannerModal({ label, message, opened, onClose, onQRCodeDetected }:Props) {
  const hasPermission = useRequestCameraPermission(opened);

  if (!opened || !hasPermission) return null;

  const onScan: OnResultFunction = (result) => {
    const detectedCode = result?.getText();
    if (!detectedCode) return;

    onQRCodeDetected(detectedCode);
    onClose();
  }

  return (
    <Modal
      label={label}
      opened={opened}
      onClose={onClose}>
      <div className="grid grid-cols-6 items-center justify-center gap-y-2">
        <QrReader
          onResult={onScan}
          constraints={{ facingMode: { ideal: "environment" } }}
          className="h-[60vh] col-span-full w-full"
        />
        <SmallNotice icon="info-circle" className="col-span-full">{message}</SmallNotice>
        <Button
          onClick={onClose}
          buttonStyle={ButtonStyle.Clear}
          icon="times"
          text="Close scanner"
          className="flex col-start-4 col-span-3 items-center justify-end" />
      </div>
    </Modal>
  )
}