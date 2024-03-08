import { Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import AuthLayout from "./layout/AuthLayout";
import ErrorPage from "@/pages/error-page";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function BrowserRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="auth/login" element={<Login />} />
      </Route>
      <Route element={<PageLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="record" element={<Home />} />
        <Route path="reading" element={<Home />} />
        <Route path="workbook" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default BrowserRoutes;
