import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
import Cancel from "./pages/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "payment/success/:tran_id", 
        element: <paymentSuccess />
      },
      { 
        path: "payment/fail", 
        element: <Fail /> 
      },
      { 
        path: "payment/cancel", 
        element: <Cancel /> 
      },
    ],
  },
]);

export default router;
