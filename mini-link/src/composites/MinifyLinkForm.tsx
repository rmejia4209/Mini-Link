import { MiniLinkType } from "../types/common";
import useObject from "../hooks/useObject";
import LinkInput from "../components/LinkInput";
import AliasInput from "../components/AliasInput";
import MinifyLinkButton from "../components/MinifyLinkButton";
import { createMiniLink } from "../api/apiServices";

interface FormActionTypes {
  appendMiniLink: (miniLink: MiniLinkType) => void;
}

function MinifyLinkForm({ appendMiniLink }: FormActionTypes) {

  const [linkDetails, setLinkDetails] = useObject({url: '', alias: ''});

  const handleFetch = async () => {
    try {
      const [status, data] = await createMiniLink(
        { url: linkDetails.url, alias: linkDetails.alias }
      );
      if (status == 409) alert('TODO: alias red');
      else if (status == 422) alert('TODO: invalid input(s)');
      else appendMiniLink(data as MiniLinkType);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex flex-col w-screen items-center">
      <div className='w-full max-w-screen-sm p-5'>
        <div
          className={`
            bg-neutral-content flex flex-col items-center
            rounded-3xl w-full p-5 shadow-lg
          `}
        >
          <div className='flex flex-col items-center gap-5 w-full'>
            <LinkInput
              value={linkDetails.url}
              onChange={setLinkDetails}
            />
            <AliasInput
              value={linkDetails.alias}
              onChange={setLinkDetails}
            />
            <MinifyLinkButton
              onClick={handleFetch}
            />
          </div>
        </div>
      </div>
    </div>


  )
}

export default MinifyLinkForm;
