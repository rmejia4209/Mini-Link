import BaseButton from "../base/BaseButton";
import DeleteIcon from "../../icons/DeleteIcon";

interface DeleteButtonProps {
  alias: string;
  removeMiniLink: (alias: string) => Promise<void>;
}

function DeleteButton(
  { alias, removeMiniLink }: DeleteButtonProps): JSX.Element
{

  const showWarning = () => {
    const modalId = 'delete_confirmation';
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.showModal();
  }

  const handleRemoval = async (): Promise<void> => {
   removeMiniLink(alias);
  }

  return (
    <>
      <BaseButton
        className="btn-sm btn-error btn-outline"
        onClick={showWarning}
        Icon={DeleteIcon}
      />
      <dialog id="delete_confirmation" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box rounded-xl">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this mini link?
          </h3>
          <p className="py-4">
            This will delete this mini link permanently.
            You cannot undo this action.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex flex-row gap-4">
                <BaseButton
                  className="btn-outline btn-neutral"
                  text="Cancel"
                />
                <BaseButton
                  className="btn-error"
                  text="Delete"
                  onClick={handleRemoval}
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default DeleteButton;