import { Home, Results } from "@/views";

import { createBrowserRouter } from "react-router-dom";
import { paths } from ".";

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />,
  },
  {
    path: paths.results,
    element: <Results />,
  },
]);
