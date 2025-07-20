import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainContextProvider } from "./Context/MainContext.jsx";

import MainLayout from "./Components/MainLayout.jsx";
import Email from "./Pages/Email.jsx";
import Review from "./Pages/Review.jsx";
import ReviewDetailView from "./Components/ReviewDetailView.jsx";
import { Bounce, ToastContainer } from "react-toastify";

const router = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <>
      <MainContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <RouterProvider router={router} />
      </MainContextProvider>
    </>
  );
}

export default App;
