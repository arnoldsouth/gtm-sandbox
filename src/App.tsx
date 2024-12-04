import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import TagManager from "react-gtm-module";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VehicleList from "./pages/VehicleList";
import VehicleDetail from "./pages/VehicleDetail";
import ContactForm from "./pages/ContactForm";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const tagManagerArgs = {
  gtmId: "GTM-MBB4RX9S", // Replace with actual GTM ID
};

function App() {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
