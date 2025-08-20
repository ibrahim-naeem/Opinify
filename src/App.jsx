import { useEffect } from "react";
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
  const { setSession, setAdmin } = useMainConext();

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
    setAdmin(user?.admin);
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      setSession(session);
      insertUserIfNotExists(session?.user?.email);
      localStorage.setItem("isAuthenticated", session?.user?.role || "");
    };
    getSession();

    const {
      data: { subscription },
      error: subError,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    if (subError) console.error("Auth state change error:", subError);
    return () => subscription.unsubscribe();
  }, []);

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
