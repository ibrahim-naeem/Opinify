import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainContextProvider } from "./Context/MainContext.jsx";

import MainLayout from "./Components/MainLayout.jsx";
import Email from "./Pages/Email.jsx";
import Review from "./Pages/Review.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Email />,
      },
      {
        path: "review",
        element: <Review />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <MainContextProvider>
        <RouterProvider router={router} />
      </MainContextProvider>
    </>
  );
}

export default App;
