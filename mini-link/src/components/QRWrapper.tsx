import QRCode from "react-qr-code";


interface QRCodeWrapperPropTypes {
  value: string;
}

function QRCodeWrapper({ value }: QRCodeWrapperPropTypes): JSX.Element {
  return (
    <div className="bg-white p-2 rounded-2xl max-h-fit">
      <QRCode size={200} value={value} viewBox="0 0 100 100"/>
    </div>
  )
}

export default QRCodeWrapper;
