import { useRouteError } from "react-router-dom"

function Error() {

    const error = useRouteError();

    if(error.message == 404){
        return <div><h3 className="text-4xl">Page not found...{error.message}</h3></div>
    }

  return (
    <div>
        <h1>Oops... !</h1>
        <h2>{error.message}</h2>
    </div>
  )
}

export default Error