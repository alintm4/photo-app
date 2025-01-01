import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import Login from "./components/Login";
import Register from "./components/Register";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Notes />} />
      <Route path="create" element={<AddNote />} />
      <Route path="edit/:id" element={<EditNote />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
