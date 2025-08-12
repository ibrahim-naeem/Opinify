import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { useMainConext } from "./hooks/useMainContext.js";
import { supabase } from "./database/supabase.js";

import Email from "./Pages/Email.jsx";
import MyReviews from "./Pages/myReview.jsx";
import Review from "./Pages/Review.jsx";

import MainLayout from "./Components/MainLayout.jsx";
import ReviewDetailView from "./Components/ReviewDetailView.jsx";

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
        {
          path: "myReviews",
          element: <MyReviews />,
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
  const { session, setSession } = useMainConext();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  console.log("Session:", session);
  return (
    <>
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
    </>
  );
}

export default App;
