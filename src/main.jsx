import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ToolPage from './pages/ToolPage.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />
}, {
  path: '/tools/:toolId',
  element: <ToolPage />
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
