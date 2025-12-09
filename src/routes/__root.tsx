import { Outlet, createRootRoute } from '@tanstack/react-router'
import HomeButon from '@/components/HomeButon'
export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen w-full bg-[url(./img/fondo1.webp)] bg-blue-100/100 bg-blend-overlay">
      <HomeButon />
      <Outlet />
    </div>
  ),
})




