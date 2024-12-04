import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const trackNavigation = (destination: string) => {
    window.dataLayer?.push({
      event: "navigation",
      eventCategory: "Navigation",
      eventAction: "Click",
      eventLabel: destination,
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Auto Dealership
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            onClick={() => trackNavigation("Home")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/vehicles"
            onClick={() => trackNavigation("Vehicles")}
          >
            Inventory
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/contact"
            onClick={() => trackNavigation("Contact")}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
