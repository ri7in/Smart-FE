import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Dashboard from "./Components/WasteManagementDashboard";
import ReportsPage from "./Pages/ReportsPage";
import UserCollectionsLayout from "./Components/organisms/UserCollectionsLayout/UserCollectionsLayout";
import SpecialForm from "./Pages/SpecialForm";
import ReviewFormPage from "./Pages/ReviewForm";
import UserDashboard from "./Components/UserDashboard";

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
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
