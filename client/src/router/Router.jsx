import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // App component with Header, Footer, and Outlet
import Dashboard from "../Page/Dashboard"; // Dashboard component
import LoginPage from "../Page/LoginPage"; // Login component
import SignUpPage from "../Page/SignUpPage"; // Signup component
import UserPage from "../Page/UserPage"; // UserPage component
import AdminPannel from "../Page/AdminPannel"; // AdminPanel component
import AddFeedback from "../Components/AddFeedback"; // AddFeedback component
import AddEmployee from "../Components/AddEmployee"; // AddEmployee component
import Admin from "../Components/Admin"; // Admin component
import PageNotFound from "../Page/PageNotFound"; // PageNotFound component
import ViewEmployee from "../Components/ViewEmployee"; // ViewEmployee component
import ProtectedRoute from "../helper/ProtectedRoute";
import EditUserBox from "../Components/EditUserBox";
import DeleteUser from "../Components/DeleteUser";

// Define the router with separate paths for login and signup (without App) and the rest inside App
const router = createBrowserRouter([
  {
    path: "/", // Root path for the app
    element: <App />, // App component that contains the layout (Header, Footer, Outlet)
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ), // Protect Dashboard route
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ), // Protect UserPage route
      },
      {
        path: "/admin", // Admin panel with nested routes
        element: (
          <ProtectedRoute>
            <AdminPannel />
          </ProtectedRoute>
        ), // Protect AdminPanel route
        children: [
          {
            path: "adminPage",
            element: (
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            ),
          },
          {
            path: "addFeedback",
            element: (
              <ProtectedRoute>
                <AddFeedback />
              </ProtectedRoute>
            ),
          },
          {
            path: "addEmployee",
            element: (
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            ),
          },
          {
            path: "viewEmployee",
            element: (
              <ProtectedRoute>
                <ViewEmployee />
              </ProtectedRoute>
            ),
            children: [
              { path: "editUser/:id", element: <EditUserBox /> },
              { path: "deleteUser/:id", element: <DeleteUser /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> }, // Login route (without Header/Footer)
  { path: "/signup", element: <SignUpPage /> }, // Signup route (without Header/Footer)
  { path: "*", element: <PageNotFound /> }, // Page Not Found
]);

export default router;
