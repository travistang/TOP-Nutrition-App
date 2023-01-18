import classNames from 'classnames';
import React, { useState } from 'react';
import Button, { ButtonStyle } from '../Input/Button';
import QRScannerModal from './QRScannerModal';

type Props = {
  onQrCodeDetected: (code: string) => void;
  modalMessage: string;
  modalLabel: string;
  className?: string;
  buttonStyle?: ButtonStyle;
  buttonText?: string;
};
export default function QRScanner({
  onQrCodeDetected,
  modalMessage,
  modalLabel,
  buttonStyle = ButtonStyle.Clear,
  buttonText,
  className
}: Props) {
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
        text={buttonText}
        buttonStyle={buttonStyle}
        className={classNames('items-center justify-center', className)}
        onClick={() => setCameraModalOpened(true)}
      />
    </>
  );
}