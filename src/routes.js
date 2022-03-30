import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Dashboard,
  Home,
  MasterPage,
  DataManagementPage,
  PostProductionPage,
  LeadsPage,
  EventsPage,
  QuotationsPage,
  SettingsPage,
  ReportPage,
  ErrorPage,
  Subs,
} from "./pages";
import routes from "./constants/routes";
import PrivateRoute from "./components/PrivateRoute";

const {
  login,
  dashboard,
  home,
  master,
  dataManagement,
  postProduction,
  leads,
  events,
  quotations,
  settings,
  report,
} = routes;
const Router = () => (
  <React.Fragment>
    <Routes>
      <Route path={login} element={<Login />} />
      <Route
        path={home}
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route path="" element={<Dashboard />} />
        <Route path={dashboard} element={<Dashboard />} />
        <Route path={master} element={<MasterPage />} />
        <Route path={dataManagement} element={<DataManagementPage />} />
        <Route path={postProduction} element={<PostProductionPage />} />
        <Route path={leads} element={<LeadsPage />} />
        <Route path={events} element={<EventsPage />} />
        <Route path={quotations} element={<QuotationsPage />} />
        <Route path={settings} element={<SettingsPage />} />
        <Route path={report} element={<ReportPage />} />
        {/* <Route path="mastersub" element={<MasterPage />} />
        <Route path="mastersubtest" element={<MasterPage />} /> */}
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </React.Fragment>
);

export default Router;
