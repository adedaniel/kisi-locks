import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import GroupLocks from "./pages/GroupLocks/GroupLockListing/GroupLocks";
import GroupListing from "./pages/Groups/GroupListing/GroupListing";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/groups" replace />} />
        <Route path="/groups" element={<DashboardLayout />}>
          <Route index element={<GroupListing />} />
          <Route path=":id">
            <Route index element={<GroupLocks />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
