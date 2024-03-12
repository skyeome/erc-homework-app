import { Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import AuthLayout from "./layout/AuthLayout";
import ErrorPage from "@/pages/error-page";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Record from "@/pages/record";
import Reading from "@/pages/reading";
import BookSearch from "@/pages/reading/search";

function BrowserRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="auth/login" element={<Login />} />
      </Route>
      <Route element={<PageLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="record" element={<Record />} />
        <Route path="reading/*">
          <Route index element={<Reading />} />
          <Route path="search" element={<BookSearch />} />
        </Route>
        <Route path="workbook" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default BrowserRoutes;
