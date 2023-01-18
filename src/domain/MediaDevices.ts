import { useEffect, useState } from "react";

export const useRequestCameraPermission = (shouldRequest: boolean) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (shouldRequest && !permissionGranted) {
      const screenWidth = window.innerWidth;
      navigator?.mediaDevices?.getUserMedia({
        video: {
          width: { ideal: screenWidth },
          height: { ideal: screenWidth * 2 },
        },
      })
        .then(() => setPermissionGranted(true))
    }
  }, [shouldRequest, permissionGranted]);

  return permissionGranted;
};

export const useEnumerateCameras = (shouldRequestPermission: boolean) => {
  const permissionGranted = useRequestCameraPermission(shouldRequestPermission);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (!permissionGranted) return;
    navigator?.mediaDevices?.enumerateDevices()
      .then((devices) => devices.filter(device => device.kind === 'videoinput'))
      .then(setDevices)
  }, [permissionGranted]);

  return devices;
}