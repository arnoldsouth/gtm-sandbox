import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
} from "@mui/material";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock vehicle data - in a real app, this would come from an API
  const vehicle = {
    id,
    name: "2024 Model X SUV",
    image: "https://placehold.co/800x400",
    price: 45000,
    description: "Luxury SUV with advanced features",
    type: "SUV",
    specs: {
      engine: "3.5L V6",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      fuelEconomy: "20 city / 28 highway",
      exteriorColor: "Midnight Blue",
      interiorColor: "Black Leather",
      vin: "ABC123XYZ456789",
      stockNumber: "STK12345",
    },
    features: [
      "Navigation System",
      "Bluetooth",
      "Backup Camera",
      "Heated Seats",
      "Sunroof",
    ],
  };

  useEffect(() => {
    // Track vehicle detail view
    const event: VehicleEvent = {
      event: "vehicle_detail_view",
      eventCategory: "Vehicle Interaction",
      eventAction: "Detail View",
      eventLabel: vehicle.name,
      vehicleId: vehicle.id!,
      vehicleName: vehicle.name,
      vehiclePrice: vehicle.price,
      vehicleType: vehicle.type,
    };
    window.dataLayer?.push(event);
  }, [vehicle]);

  const trackTestDrive = () => {
    const event: VehicleEvent = {
      event: "test_drive_request",
      eventCategory: "Lead Generation",
      eventAction: "Test Drive Request",
      eventLabel: vehicle.name,
      vehicleId: vehicle.id!,
      vehicleName: vehicle.name,
      vehiclePrice: vehicle.price,
    };
    window.dataLayer?.push(event);
    navigate("/contact");
  };

  const trackContactDealer = () => {
    const event: VehicleEvent = {
      event: "contact_dealer",
      eventCategory: "Lead Generation",
      eventAction: "Contact Dealer",
      eventLabel: vehicle.name,
      vehicleId: vehicle.id!,
      vehicleName: vehicle.name,
      vehiclePrice: vehicle.price,
    };
    window.dataLayer?.push(event);
    navigate("/contact");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {vehicle.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${vehicle.price.toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {vehicle.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={trackTestDrive}
            >
              Schedule Test Drive
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              onClick={trackContactDealer}
            >
              Contact Dealer
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Vehicle Specifications
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.entries(vehicle.specs).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row" sx={{ width: "30%" }}>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {vehicle.features.map((feature) => (
              <Chip key={feature} label={feature} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VehicleDetail;
