import BaseButton from "../base/BaseButton";
import BarGraphIcon from "../../icons/BarGraphIcon";
import XButton from "./XButton";
import LineGraph from "../LineGraph";

function StatsButton(): JSX.Element {

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
        Icon={BarGraphIcon}
      />
      <dialog id="mini_link_details" className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box p-2">
        <LineGraph />
        <div className="modal-action">
          <form method="dialog">
            <XButton/>
          </form>
        </div>
      </div>
    </dialog>
  </>
  )
}

export default StatsButton