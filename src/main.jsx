import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx';
import ToolPage from './pages/ToolPage.jsx';
import GuidePage from './pages/GuidePage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
}, {
  path: '/tools/:toolId',
  element: <ToolPage />
}, {
  path: 'guides/:guideId',
  element: <GuidePage />
}, {
  path: '/privacy-policy',
  element: <PrivacyPolicy />
}, {
  path: '/terms-and-conditions',
  element: <TermsAndConditions />
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)