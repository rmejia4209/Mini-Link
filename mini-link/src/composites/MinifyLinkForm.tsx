import { MiniLinkType } from "../types/common";
import useObject from "../hooks/useObject";
import LinkInput from "../components/LinkInput";
import AliasInput from "../components/AliasInput";
import ServerStatus from "../components/ServerStatus";
import MinifyLinkButton from "../components/buttons/MinifyLinkButton";
import { createMiniLink } from "../api/createMiniLink";

interface FormActionTypes {
  appendMiniLink: (miniLink: MiniLinkType) => void;
  status: string;
}

function MinifyLinkForm({ appendMiniLink, status }: FormActionTypes) {

  const [linkDetails, setLinkDetails] = useObject({url: '', alias: ''});

  const handleFetch = async () => {
    try {
      const miniLinkDetails = await createMiniLink(
        { url: linkDetails.url, alias: linkDetails.alias }
      );
      appendMiniLink(miniLinkDetails);
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
            <ServerStatus status={status}/>
          </div>
        </div>
        
      </div>
    </div>


  )
}

export default MinifyLinkForm;
