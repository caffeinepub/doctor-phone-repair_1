import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book',
  component: BookAppointmentPage,
});

const successRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking-success',
  component: BookingSuccessPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/appointments',
  component: AdminAppointmentsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, bookRoute, successRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

