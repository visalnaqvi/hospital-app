import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ResetPassword from "./components/resetPassword";
import ForgotPassword from "./components/forgotPassword";


function App() {
 
  //handling routing
  const router = createBrowserRouter([
    {
      path: "login",
      element: (
        <Login type={ "login"} />
      ),
    },
    {
      path: "register",
      element: <Login type={"register"} />,
    },
    {
      path: "/",
      element: (
        <Dashboard />
      ),
    },
    {
      path:"/reset-password/:token",
      element:(
        <ResetPassword />
      )
    },
    {
      path:"/forgot-password",
      element:(
        <ForgotPassword />
      )
    }
  ]);

  return(
    <RouterProvider router={router} />
  )
  
}

export default App;
