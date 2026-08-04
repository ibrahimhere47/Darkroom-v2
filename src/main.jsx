import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx';
import ToolPage from './pages/ToolPage.jsx';
import Layout from './components/Layout.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
}, {
  path: '/tools/:toolId',
  element: <ToolPage />
}]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)