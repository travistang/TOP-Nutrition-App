declare module 'react-qr-scanner' {
  export type DetectResult = {
    text: string;
  }
  type QRScannerProps = {
    delay?: number;
    onScan: (result: DetectResult) => void;
    onError: (error: Error) => void;
    constraints?: MediaTrackConstraints & {
      audio?: boolean;
      video?: boolean | { deviceId: string };
    };
    className?: string;
  };
  type QRScanner = React.ComponentClass<QRScannerProps>;
  const DefaultExports: QRScanner;
  export default DefaultExports;
}