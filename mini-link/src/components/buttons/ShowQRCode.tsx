import BaseButton from "../base/BaseButton";
import QRIcon from "../../icons/QRIcon";
import XButton from "./XButton";
import QRCodeWrapper from "../QRWrapper";
const baseURL = import.meta.env.VITE_API_URL;


function ShowQRCodeButton({ alias }: { alias: string }): JSX.Element {

  const showQRCode = () => {
    const modalId = `qr_code_${alias}`;
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.showModal();
  }

  return (
    <>
      <BaseButton
        className="btn-sm btn-primary btn-outline"
        onClick={showQRCode}
        Icon={QRIcon}
      />
      <dialog id={`qr_code_${alias}`} className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box">
          <div className="flex flex-col items-center justify-center">
            <QRCodeWrapper value={`${baseURL}/${alias}`}/>
            <p className="text-lg text-base-content">
              Scan to follow {`minilink.com/${alias}`}
            </p>
          </div>
          <div className="modal-action mt-0">
            <form method="dialog">
              <XButton/>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ShowQRCodeButton;