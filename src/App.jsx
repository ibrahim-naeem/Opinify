import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainContextProvider } from "./Context/MainContext.jsx";

import MainLayout from "./Components/MainLayout.jsx";
import Email from "./Pages/Email.jsx";
import Review from "./Pages/Review.jsx";
import ReviewDetailView from "./Components/ReviewDetailView.jsx";

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
      {
        path: "reviewDetails/:id",
        element: <ReviewDetailView />,
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
