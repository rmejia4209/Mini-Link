import MagnifyingGlass from "../icons/MagnifyingGlass"

function Logo(): JSX.Element {
  return (
    <div className="flex flex-row items-center">
      <MagnifyingGlass/>
      <h1 className={`
        text-4xl font-black tracking-tighter bg-gradient-to-r
        bg-clip-text text-transparent animate-text 
        from-primary via-secondary to-accent
      `}
      >
        Mini Link
      </h1>
    
    </div>
    
  )
}

export default Logo