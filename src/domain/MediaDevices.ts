import { useEffect, useState } from "react";

export const useRequestCameraPermission = (shouldRequest: boolean) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (shouldRequest && !permissionGranted) {
      navigator?.mediaDevices?.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
        },
      })
        .then(() => setPermissionGranted(true))
    }
  }, [shouldRequest, permissionGranted]);

  return permissionGranted;
};

export const supportTorch = () => {
  return (navigator?.mediaDevices.getSupportedConstraints() as { torch?: boolean; } | undefined)?.torch;
}

export const useEnumerateCameras = (shouldRequestPermission: boolean) => {
  const permissionGranted = useRequestCameraPermission(shouldRequestPermission);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (!permissionGranted || devices.length > 0) return;
    navigator?.mediaDevices?.enumerateDevices()
      .then((devices) => devices.filter(device => device.kind === 'videoinput'))
      .then(setDevices)
  }, [permissionGranted, devices]);

  return devices;
}