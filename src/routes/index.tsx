import { getInitialData, isDBInitialized } from '@/models/db';
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

      const res = await getInitialData();
      console.log(res);

      return res;
    },
    element: <Main />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
]);
