import useObject from "../hooks/useObject";
import LinkInput from "../components/LinkInput";
import AliasInput from "../components/AliasInput";
import MinifyLinkButton from "../components/MinifyLinkButton";
import { createMiniLink } from "../api/apiServices";

function MinifyLinkForm() {

  const [linkDetails, setLinkDetails] = useObject({url: '', alias: ''});

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
              onClick={() => createMiniLink(
                { url: linkDetails.url, alias: linkDetails.alias }
              )}
            />
          </div>
        </div>
      </div>
    </div>


  )
}

export default MinifyLinkForm;
