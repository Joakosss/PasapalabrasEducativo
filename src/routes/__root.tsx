import {  Outlet, createRootRoute } from '@tanstack/react-router'
import HomeButon from '@/components/HomeButon'
export const Route = createRootRoute({
  component: () => (
    <>
      <HomeButon/>
      <Outlet />
    </>
  ),
})




