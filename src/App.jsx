import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { useMainConext } from "./hooks/useMainContext.js";
import { supabase } from "./database/supabase.js";

import Email from "./Pages/Email.jsx";
import MyReviews from "./Pages/myReview.jsx";
import Review from "./Pages/Review.jsx";

import MainLayout from "./Components/MainLayout.jsx";
import ReviewDetailView from "./Components/ReviewDetailView.jsx";

import { AnimatedTable } from "./Components/AnimatedTable.jsx";
import { getUser } from "./api/user.js";

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
        {
          path: "recentReviews",
          element: <AnimatedTable />,
        },
        {
          path: "*",
          element: <Navigate to="/review" replace />,
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
  const { session, setSession, setAdmin } = useMainConext();

  const insertUserIfNotExists = async (email) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_FUNCTION_URL}/insert-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`, // send JWT
        },
        body: JSON.stringify({ email }),
      }
    );
    const user = await res.json();
    // console.log(user);
    setAdmin(user?.admin);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      insertUserIfNotExists(session?.user?.email);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      session?.user?.role !== "authenticated";
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
