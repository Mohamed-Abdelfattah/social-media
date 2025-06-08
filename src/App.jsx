import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { CommentProvider } from "./contexts/commentContext";
import BlankLayout from "./layouts/blank-layout/blankLayout";
import { PostsProvider } from "./contexts/postsContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
        // loader:getAllPosts
      },
    ],
  },
]);

function App() {
  return (
    <PostsProvider>
      <CommentProvider>
        <RouterProvider router={router} />
      </CommentProvider>
    </PostsProvider>
  );
}
export default App;
