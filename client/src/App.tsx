import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './store/features/auth/thunks.ts';
import router from './routes/routes.tsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
