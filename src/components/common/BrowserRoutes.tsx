import { Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import ErrorPage from "@/pages/error-page";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Record from "@/pages/record";
import Reading from "@/pages/reading";
import BookSearch from "@/pages/reading/search";
import NewReadingHomework from "@/pages/reading/new";
import WorkBook from "@/pages/workbook";
import NewWorkBook from "@/pages/workbook/new";
import AddUser from "@/pages/admin/user/AddUser";
import BookReadingDetail from "@/pages/reading/detail";
import Dashboard from "@/pages/admin/dashboard";
import AdminHomework from "@/pages/admin/homework";
import AdminUser from "@/pages/admin/user";
import EditUser from "@/pages/admin/user/EditUser";
import AdminHomeworkLevel from "@/pages/admin/homework/level";

function BrowserRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="auth/login" element={<Login />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="user">
          <Route index element={<AdminUser />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
        <Route path="homework">
          <Route index element={<AdminHomework />} />
          <Route path=":levelName" element={<AdminHomeworkLevel />} />
        </Route>
      </Route>
      <Route element={<PageLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="record" element={<Record />} />
        <Route path="reading">
          <Route index element={<Reading />} />
          <Route path="search" element={<BookSearch />} />
          <Route path="new" element={<NewReadingHomework />} />
          <Route path=":title" element={<BookReadingDetail />} />
        </Route>
        <Route path="workbook">
          <Route index element={<WorkBook />} />
          <Route path="new" element={<NewWorkBook />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default BrowserRoutes;
