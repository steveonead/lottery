import SnowBackground from '@/components/snow-background';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return (
    <SnowBackground>
      <RouterProvider router={router} />
    </SnowBackground>
  );
}
