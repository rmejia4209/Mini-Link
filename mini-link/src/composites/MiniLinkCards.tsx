import MiniLinkCard from "./MiniLinkCard";



function MiniLinkCards(): JSX.Element {

  const baseURL = import.meta.env.VITE_API_URL;

  const placeHolderData = [
    {'link': `${baseURL}/abcd`}
  ]

  return(
    <div className="flex flex-col items-center w-screen">
      <div className="max-w-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1,2,3,4,5, 6].map((val, idx) => <MiniLinkCard/>)}
        </div>
      </div>
    </div>  
  )
}

export default MiniLinkCards

