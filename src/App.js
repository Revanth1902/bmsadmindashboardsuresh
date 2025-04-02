import React from "react";
// src/index.js
import "./App.css"; // Import the Tailwind styles here

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Import pages and components
import UsersPage from "./pages/UserPage";
import TheatresPage from "./pages/TheatresPage";
import BookingsPage from "./pages/BookingsPage";
import ReportsPage from "./pages/ReportsPage";
import MoviesPage from "./pages/MoviesPage";
import PaymentsPage from "./pages/PaymentsPage";
import Sidebar from "./components/Sidebar";
import SearchById from "./pages/SerachbyId";
const theme = createTheme(); // Your theme configuration

function App() {
  return (
    // Wrap the app in ThemeProvider to provide context to MUI components
    <>
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          {/* Sidebar will be displayed on the left */}
          <Sidebar />

          {/* Main content area */}
          <div style={{ marginLeft: 240, padding: 20, width: "100%" }}>
            {/* Define routes and the pages to be displayed */}
            <Routes>
              <Route path="/searchbyid" element={<SearchById />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/theatres" element={<TheatresPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/movies" element={<MoviesPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
