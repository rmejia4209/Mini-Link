import { useState } from "react";
import BaseButton from "../base/BaseButton";
import BarGraphIcon from "../../icons/BarGraphIcon";
import XButton from "./XButton";
import BarGraph from "../BarGraph";


interface StatsButtonPropTypes {
  alias: string;
}

function StatsButton(
  { alias }: StatsButtonPropTypes): JSX.Element
{
  const [isLoading, setIsLoading] = useState(true);

  const showDetails = () => {
    const modalId = `mini_link_details_${alias}`;
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.showModal();
    console.log(`${alias}: ${isLoading}`)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }



  return (
    <>
      <BaseButton
        className="btn-sm btn-info btn-outline"
        onClick={showDetails}
        Icon={BarGraphIcon}
      />
      <dialog id={`mini_link_details_${alias}`}className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box">
        <BarGraph isLoading={isLoading} labels={['thing', 'other', 'diamond']} values={[70, 50, 30]}/>
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

export default StatsButton