import { isDBInitialized, queryInitialData } from '@/lib/db';
import Main from '@/pages/main';
import Upload from '@/pages/upload';
import {
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const isInit = await isDBInitialized();

      if (!isInit) {
        return redirect('/upload');
      }

      const res = await queryInitialData();

      return res;
    },
    element: <Main />,
  },
  {
    path: '/upload',
    loader: async () => {
      const isInit = await isDBInitialized();

      if (isInit) {
        return redirect('/');
      }

      return null;
    },
    element: <Upload />,
  },
]);
