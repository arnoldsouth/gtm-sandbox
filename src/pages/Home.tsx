import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { VehicleEvent } from "../types/gtm";

const Home = () => {
  const navigate = useNavigate();

  const trackVehicleView = (vehicleId: string, vehicleName: string) => {
    const event: VehicleEvent = {
      event: "vehicle_view",
      eventCategory: "Vehicle Interaction",
      eventAction: "View Details",
      eventLabel: vehicleName,
      vehicleId: vehicleId,
      vehicleName: vehicleName,
      listName: "Featured Vehicles",
      listPosition: featuredVehicles.findIndex((v) => v.id === vehicleId) + 1,
    };
    window.dataLayer?.push(event);
    navigate(`/vehicles/${vehicleId}`);
  };

  const trackTestDrive = (vehicleId: string, vehicleName: string) => {
    const event: VehicleEvent = {
      event: "test_drive_request",
      eventCategory: "Lead Generation",
      eventAction: "Test Drive Request",
      eventLabel: vehicleName,
      vehicleId: vehicleId,
      vehicleName: vehicleName,
    };
    window.dataLayer?.push(event);
    navigate("/contact");
  };

  const featuredVehicles = [
    {
      id: "1",
      name: "2024 Model X SUV",
      image: "https://placehold.co/400x300",
      price: "$45,000",
      description: "Luxury SUV with advanced features",
    },
    {
      id: "2",
      name: "2024 Model Y Sedan",
      image: "https://placehold.co/400x300",
      price: "$35,000",
      description: "Efficient and stylish sedan",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Our Dealership
      </Typography>

      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Featured Vehicles
      </Typography>

      <Grid container spacing={4}>
        {featuredVehicles.map((vehicle) => (
          <Grid item xs={12} md={6} key={vehicle.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={vehicle.image}
                alt={vehicle.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {vehicle.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {vehicle.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {vehicle.price}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => trackVehicleView(vehicle.id, vehicle.name)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => trackTestDrive(vehicle.id, vehicle.name)}
                  >
                    Schedule Test Drive
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
