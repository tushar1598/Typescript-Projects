import { RouterProvider } from "react-router-dom";
import Router from "./components/Router/Router";
import Toast from "./Notifications/Toast";

const App = () => {
  const router = Router();

  return (
    <>
      <div className="pt-16">
        <RouterProvider router={router} />
        <Toast />
      </div>
    </>
  );
};

export default App;
