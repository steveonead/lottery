import { isDBInitialized, queryIfNoPrizeRemain, queryInitialData } from '@/lib/db';
import Main from '@/pages/main';
import Success from '@/pages/success';
import Upload from '@/pages/upload';
import { createBrowserRouter, redirect } from 'react-router-dom';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      loader: async () => {
        const isInit = await isDBInitialized();
        const noPrizeRemain = await queryIfNoPrizeRemain();

        if (!isInit) {
          return redirect('/upload');
        }

        if (noPrizeRemain) {
          return redirect('/success');
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
    {
      path: '/success',
      loader: async () => {
        const isInit = await isDBInitialized();

        if (!isInit) {
          return redirect('/upload');
        }

        return null;
      },
      element: <Success />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
