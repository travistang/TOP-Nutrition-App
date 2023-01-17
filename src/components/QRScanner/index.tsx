import classNames from 'classnames';
import React, { useState } from 'react';
import Button, { ButtonStyle } from '../Input/Button';
import QRScannerModal from './QRScannerModal';

type Props = {
  onQrCodeDetected: (code: string) => void;
  modalMessage: string;
  modalLabel: string;
  className?: string;
}
export default function QRScanner({ onQrCodeDetected, modalMessage, modalLabel, className }: Props) {
const [cameraModalOpened, setCameraModalOpened] = useState(false);

  return (
    <>
      <QRScannerModal
        opened={cameraModalOpened}
        onClose={() => setCameraModalOpened(false)}
        label={modalLabel}
        message={modalMessage}
        onQRCodeDetected={onQrCodeDetected} />
      <Button
        icon="qrcode"
        buttonStyle={ButtonStyle.Clear}
        className={classNames('items-center justify-center', className)}
        onClick={() => setCameraModalOpened(true)}
      />
    </>
  )
}