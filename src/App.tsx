import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Input from "./components/Input";
import { AltVisual } from "./components/AltVisual";
import Visual from "./components/Visual";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Input />,
    },
    {
      path: "visual",
      element: <Visual />,
    },
    {
      path: "alt",
      element: <AltVisual />,
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
