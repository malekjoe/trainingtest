import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./page/dashboard/Dashboard";
import InternationalDashboard from "./page/dashboard/InternationalDashboard.jsx";
import Team from "./page/team/Team";
import TeamProjects from "./page/team/TeamProjects";
import Contacts from "./page/contacts/Contacts";
import Invoices from "./page/invoices/Invoices";
import UnpaidInvoices from "./page/invoices/UnpaidInvoices.jsx"
import Form from "./page/form/Form";
import ChangePassword from "./page/form/ChangePassword.jsx";
import Calendar from "./page/calendar/Calendar";
import NewContact from "./page/contacts/NewContact";
import ViewCalendar from "./page/calendar/ViewCalendar";
import FAQ from "./page/faq/FAQ";
import SupportFAQ from "./page/faq/SupportFAQ.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
      <Route path="local-dashboard" element={<Dashboard />} />
      <Route path="international-dashboard" element={<InternationalDashboard />} />



      <Route path="team-overview" element={<Team />} />
      <Route path="team-projects" element={<TeamProjects />} />

      <Route path="contact-list" element={<Contacts />} />
      <Route path="new-contact" element={<NewContact />} />


      <Route path="all-invoices" element={<Invoices />} />
      <Route path="unpaid-invoices" element={<UnpaidInvoices />} />


      <Route path="edit-profile" element={<Form />} />
      <Route path="change-password" element={<ChangePassword />} />


      <Route path="add-event" element={<Calendar />} />
      <Route path="view-calendar" element={<ViewCalendar />} />


      <Route path="general-faqs" element={<FAQ />} />
      <Route path="support-faqs" element={<SupportFAQ />} />
      





    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
