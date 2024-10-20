import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Dashboard from "./components/WasteManagementDashboard";
import ReportsPage from "./Pages/ReportsPage";
import UserCollectionsLayout from "./components/organisms/UserCollectionsLayout/UserCollectionsLayout";
import DashboardLayout from "./components/organisms/DashboardLayout/DashboardLayout";
import SpecialForm from "./Pages/SpecialForm";
import ReviewFormPage from "./Pages/ReviewForm";
import PaymentPage from "./Pages/PaymentPage";

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
    element: <DashboardLayout />,
  },
  {
    path: "/collections",
    element: <UserCollectionsLayout />,
  },
  {
    path: "/specialCollectionForm",
    element: <SpecialForm />,
  },
  {
    path: "/reviewForm",
    element: <ReviewFormPage />,
  },
  {
    path: "/manager",
    element: <Dashboard />,
  },
  {
    path: "/managerreport",
    element: <ReportsPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
