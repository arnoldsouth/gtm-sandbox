import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const VehicleList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const trackVehicleView = (vehicleId: string, vehicleName: string) => {
    window.dataLayer?.push({
      event: "vehicle_view",
      eventCategory: "Vehicle Interaction",
      eventAction: "View Details",
      eventLabel: vehicleName,
      vehicleId: vehicleId,
      vehicleName: vehicleName,
      listName: "Vehicle Inventory",
      listPosition: vehicles.findIndex((v) => v.id === vehicleId) + 1,
    });
    navigate(`/vehicles/${vehicleId}`);
  };

  const trackInventoryFilter = (filterType: string, filterValue: string) => {
    window.dataLayer?.push({
      event: "inventory_filter",
      eventCategory: "Inventory Interaction",
      eventAction: "Filter",
      eventLabel: `${filterType}: ${filterValue}`,
    });
  };

  const vehicles = [
    {
      id: "1",
      name: "2024 Model X SUV",
      image: "https://placehold.co/400x300",
      price: 45000,
      description: "Luxury SUV with advanced features",
      type: "SUV",
    },
    {
      id: "2",
      name: "2024 Model Y Sedan",
      image: "https://placehold.co/400x300",
      price: 35000,
      description: "Efficient and stylish sedan",
      type: "Sedan",
    },
    {
      id: "3",
      name: "2024 Model Z Truck",
      image: "https://placehold.co/400x300",
      price: 55000,
      description: "Powerful and capable truck",
      type: "Truck",
    },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    trackInventoryFilter("Search", event.target.value);
  };

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value);
    trackInventoryFilter("Sort", event.target.value);
  };

  const filteredAndSortedVehicles = vehicles
    .filter((vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Vehicle Inventory
      </Typography>

      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        <TextField
          label="Search Vehicles"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredAndSortedVehicles.map((vehicle) => (
          <Grid item xs={12} md={6} lg={4} key={vehicle.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={vehicle.image}
                alt={vehicle.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {vehicle.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {vehicle.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${vehicle.price.toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => trackVehicleView(vehicle.id, vehicle.name)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VehicleList;
