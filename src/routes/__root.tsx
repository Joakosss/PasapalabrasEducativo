import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { FaHome } from 'react-icons/fa'
export const Route = createRootRoute({
  component: () => (
    <>
      <HomeButon/>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})




type Props = {}

function HomeButon({}: Props) {
  return (
    <Link to='/' className='fixed left-1'><FaHome  size={45}/></Link>
  )
}

export default HomeButon