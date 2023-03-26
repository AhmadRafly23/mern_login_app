import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/*Import All Components*/
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
import Reset from './components/Reset';
import Username from './components/Username';

/*Create Routes*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username />,
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/password',
    element: <Password />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
