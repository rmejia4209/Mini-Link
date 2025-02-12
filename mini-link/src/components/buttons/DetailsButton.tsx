import BaseButton from "../base/BaseButton";
import InfoIcon from "../../icons/InfoIcon";
import QRCodeWrapper from "../QRWrapper";
import LineGraph from "../LineGraph";

function DetailsButton({ alias }: { alias: string}): JSX.Element {

  const url = `${import.meta.env.VITE_API_URL}/${alias}`

  const showDetails = () => {
    const modalId = 'mini_link_details';
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.showModal();
  }

  return (
    <>
      <BaseButton
        className="btn-sm btn-info btn-outline"
        onClick={showDetails}
        Icon={InfoIcon}
      />
      <dialog id="mini_link_details" className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box p-2">
        <LineGraph />
        <div className="modal-action">
          <form method="dialog">
            <button
              className={`
                btn btn-sm btn-circle btn-ghost absolute right-2 top-2
              `}>
                X
              </button>
          </form>
        </div>
      </div>
    </dialog>
  </>
  )
}

export default DetailsButton