import Sidebar from "./components/sidebar";
import Feed from "./components/feed";
import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import { useToast } from "./components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedUserToken, isTokenExpired, removeAuthenticatedUserToken } from "./lib/auth";
import Aside from "./components/aside";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error";
import Cards from "./components/cards/cards";

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  const router = createBrowserRouter([
    {
      path: "/homework-5-flashcards-app-YunZng/",
      element: <>
        <Sidebar />
        <Feed />
        <Aside />
      </>,
      errorElement: <ErrorPage />,
    }, {
      path: "/homework-5-flashcards-app-YunZng/decks/:deckId",
      element: <>
        <Sidebar />
        <Cards />
        <Aside />
      </>,
      errorElement: <ErrorPage />,
    },
    
  ]);

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);
  return (
    <div className="flex justify-center min-h-screen max-h-screen overflow-hidden">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}
export default App;
