import { Link } from "@tanstack/react-router"
import { FaHome } from "react-icons/fa"

type Props = {}

function HomeButon({}: Props) {
  return (
    <Link to='/' className='fixed left-1 z-2' ><FaHome  size={45}/></Link>
  )
}

export default HomeButon