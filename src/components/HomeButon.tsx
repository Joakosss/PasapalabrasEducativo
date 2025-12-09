import { Link, useRouterState } from "@tanstack/react-router"
import { FaHome } from "react-icons/fa"

type Props = {}

function HomeButon({ }: Props) {
  const routeState = useRouterState()
  const isIndex = routeState.location.pathname == "/"


  return (
    <>
      {!isIndex &&
        <Link to='/' key={"home-button"} className='fixed left-1 z-2 text-blue-800 hover:text-blue-400' ><FaHome size={45} /></Link>
      }
    </>
  )
}

export default HomeButon