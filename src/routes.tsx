import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import UserDashboard from "./Components/UserDashboard";
import Dashboard from "./Components/WasteManagementDashboard";
import ReportsPage from "./Pages/ReportsPage";
import UserCollections from "./Components/UserCollections";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/user",
    element: <UserDashboard />,
  },
  {
    path: "/collections",
    element: <UserCollections />,
  },
  {
    path: "/manager",
    element: <Dashboard />,
  },
  {
    path: "/managerreport",
    element: <ReportsPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
