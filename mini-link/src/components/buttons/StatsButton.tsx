import { useState } from "react";
import BaseButton from "../base/BaseButton";
import BarGraphIcon from "../../icons/BarGraphIcon";
import XButton from "./XButton";
import BarGraph from "../BarGraph";
import getMonthlyVisitors from "../../api/getMonthlyVisitors";

interface StatsButtonPropTypes {
  alias: string;
}

function StatsButton(
  { alias }: StatsButtonPropTypes): JSX.Element
{
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState<string[] | null>(null);
  const [values, setValues] = useState<number[] | null>(null)

  const showDetails = async () => {
    const modalId = `mini_link_details_${alias}`;
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.showModal();
    if (!isLoading) return;
    try {
      const [labels, values] = await getMonthlyVisitors(alias);
      setLabels(labels);
      setValues(values);
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    } catch (err) {
      console.error(err);
    }
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
        <BarGraph
          isLoading={isLoading}
          labels={labels as string[]}
          values={values as number[]}
        />
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