import React, { useEffect, useState } from 'react';
import QrScanner, { DetectResult } from 'react-qr-scanner';
import { useEnumerateCameras } from '../../domain/MediaDevices';

import Button, { ButtonStyle } from '../Input/Button';
import SelectInput from '../Input/SelectInput';
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
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const availableCameras = useEnumerateCameras(opened);

  useEffect(() => {
    const backCamera = availableCameras.find(camera => camera.label.startsWith('Back'));
    if (backCamera) {
      setDeviceId(backCamera.deviceId);
    }
  }, [availableCameras]);

  if (!opened || !availableCameras?.length) return null;

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
          onError={error => console.error(error)}
          delay={500}
          constraints={{ deviceId }}
          className="h-[60vh] col-span-full w-full"
        />
        {availableCameras.length > 0 && (
          <SelectInput
            className="col-span-3 col-start-4"
            value={deviceId ?? ''}
            onSelect={setDeviceId}
            label=""
            options={availableCameras.map(device => ({ label: device.label, value: device.deviceId }))} />
        )}
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