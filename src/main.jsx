import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import ToolPage from './pages/ToolPage.jsx';
import GuidePage from './pages/GuidePage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

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
}, {
  path: '/about-us',
  element: <AboutUs />
}, {
  path: '/login',
  element: <Login />
}, {
  path: '/register',
  element: <Register />
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)