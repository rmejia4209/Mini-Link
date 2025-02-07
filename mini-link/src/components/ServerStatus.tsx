


function ServerStatus({ status }: {status: string}): JSX.Element {

  return (
    <div className="self-start text-left flex flex-row items-center gap-2">
      <p>Status: </p>
      <div className={
        `${status == 'OK'? 'bg-success' : 'bg-error'} 
        glass w-4 h-4 rounded-full`
      }></div>
    </div>
  )
}

export default ServerStatus