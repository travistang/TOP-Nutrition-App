import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import QrScanner, { DetectResult } from 'react-qr-scanner';

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
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (opened && !permissionGranted) {
      navigator?.mediaDevices?.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
        .then(() => setPermissionGranted(true))
        .catch(onClose)
    }
  }, [opened, permissionGranted, onClose])

  if (!opened || !permissionGranted) return null;

  const onScan = (result: DetectResult) => {
    const detectedCode = result?.text;
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
        <QrScanner
          onScan={onScan}
          onError={error => toast.error(error.message)}
          delay={500}
          constraints={{ facingMode: { exact: "environment" }, audio: false, video: true }}
          className="h-[33vh] col-span-full w-full"
        />
        <SmallNotice icon="info-circle" className="col-span-full">{message}</SmallNotice>
        <Button
          onClick={onClose}
          buttonStyle={ButtonStyle.Clear}
          icon="times"
          text="Close scanner"
          className="flex text-end col-start-5 col-span-2 items-center justify-end" />
      </div>
    </Modal>
  )
}