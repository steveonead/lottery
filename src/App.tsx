import SideMenu from '@/components/side-menu';
import SnowBackground from '@/components/snow-background';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return (
    <SnowBackground>
      <SideMenu />
      <RouterProvider
        router={router} future={{
          v7_startTransition: true,
        }}
      />
    </SnowBackground>
  );
}
