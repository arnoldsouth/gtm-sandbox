import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import type { LeadEvent } from "../types/gtm";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  message: string;
  inquiryType: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "",
    message: "",
    inquiryType: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const trackFormSubmission = () => {
    const event: LeadEvent = {
      event: "lead_form_submit",
      eventCategory: "Lead Generation",
      eventAction: "Form Submit",
      eventLabel: formData.inquiryType,
      leadType: formData.inquiryType,
      preferredContact: formData.preferredContact,
    };
    window.dataLayer?.push(event);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    trackFormSubmission();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredContact: "",
      message: "",
      inquiryType: "",
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph align="center">
          We're here to help! Fill out the form below and we'll get back to you
          shortly.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Preferred Contact Method</InputLabel>
                <Select
                  name="preferredContact"
                  value={formData.preferredContact}
                  label="Preferred Contact Method"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="text">Text</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Inquiry Type</InputLabel>
                <Select
                  name="inquiryType"
                  value={formData.inquiryType}
                  label="Inquiry Type"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="test_drive">Schedule Test Drive</MenuItem>
                  <MenuItem value="vehicle_info">Vehicle Information</MenuItem>
                  <MenuItem value="financing">Financing Options</MenuItem>
                  <MenuItem value="general">General Inquiry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactForm;
