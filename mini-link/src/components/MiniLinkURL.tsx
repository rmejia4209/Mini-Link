import CopyLinkButton from "./buttons/CopyLinkButton";
import FollowLinkButton from "./buttons/FollowLinkButton";

interface MiniLinkURLPropTypes {
  alias: string;
}

function MiniLinkURL({ alias }: MiniLinkURLPropTypes): JSX.Element {

  return (
    <>
      <div className="relative flex flex-row items-center justify-center group w-[175px] h-[45px]">
        <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
          <h1 className="card-title m-1 text-secondary-content text-4xl">
            {`${alias}`}
          </h1>
        </div>
        <div className="absolute inset-0 hidden items-center justify-center gap-1 z-[1] group-hover:flex">
          <CopyLinkButton alias={alias}/>
          <FollowLinkButton alias={alias}/>
        </div>
      </div>      
    </>
  )
}

export default MiniLinkURL;