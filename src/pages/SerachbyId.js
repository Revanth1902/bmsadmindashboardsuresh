import React, { useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./SearchById.css";
const SearchById = () => {
  const [id, setId] = useState("");
  const [entityType, setEntityType] = useState("users");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Field Mappings for different entity types
  const fieldMappings = {
    users: [
      { label: "User ID", key: "userId" },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone Number", key: "phone_number" },
      { label: "Date of Birth", key: "date_of_birth" },
      { label: "Gender", key: "gender" },
      { label: "Profile Picture", key: "profile_picture" },
      { label: "Preferred Language", key: "preferred_language" },
      { label: "Address", key: "address" },
      { label: "Wallet Balance", key: "wallet_balance" },
      { label: "Membership Status", key: "membership_status" },
      { label: "Notifications Enabled", key: "notifications_enabled" },
      { label: "Date Joined", key: "date_joined" },
      { label: "Last Login", key: "last_login" },
    ],
    theatre: [
      { label: "Theatre ID", key: "theatre_id" },
      { label: "Name", key: "name" },
      { label: "Total Screens", key: "total_screens" },
      { label: "Status", key: "status" },
      { label: "Created At", key: "created_at" },
      { label: "Updated At", key: "updated_at" },
    ],
    movies: [
      { label: "Movie ID", key: "movie_id" },
      { label: "Title", key: "title" },
      { label: "Genre", key: "genre" },
      { label: "Language", key: "language" },
      { label: "Duration", key: "duration" },
      { label: "Release Date", key: "release_date" },
      { label: "Description", key: "description" },
      { label: "Rating", key: "rating" },
      { label: "Image URL", key: "image_url" },
      { label: "Director", key: "director" },
      { label: "Actors", key: "actors" },
      { label: "Trailer URL", key: "trailer_url" },
    ],
    bookings: [
      { label: "Booking ID", key: "booking_id" },
      { label: "User ID", key: "user_id" },
      { label: "Theatre ID", key: "theatre_id" },
      { label: "Movie ID", key: "movie_id" },
      { label: "Show Time", key: "show_time" },
      { label: "Seats Booked", key: "seats_booked" },
      { label: "Total Amount", key: "total_amount" },
      { label: "Payment Status", key: "payment_status" },
      { label: "Booking Date", key: "booking_date" },
    ],
    payments: [
      { label: "Payment ID", key: "payment_id" },
      { label: "User ID", key: "user_id" },
      { label: "Booking ID", key: "booking_id" },
      { label: "Amount", key: "amount" },
      { label: "Payment Date", key: "payment_date" },
      { label: "Payment Method", key: "payment_method" },
      { label: "Status", key: "status" },
    ],
  };

  const renderNestedData = (key, value) => {
    if (typeof value === "object" && value !== null) {
      // Handle nested objects or arrays
      return (
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>
            {Array.isArray(value) ? (
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <pre>{JSON.stringify(value, null, 2)}</pre>
            )}
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow key={key}>
        <TableCell>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  };

  const handleSearch = async () => {
    if (!id) {
      setError("Please enter an ID.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://bmsbackend-u3gc.onrender.com/api/admin/api/admin/${entityType}/${id}`
      );
      const entityData =
        response.data[entityType] || response.data.user || response.data.movie;
      setData(entityData);
    } catch (err) {
      setError("No data found or something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!data) return null;

    return (
      <TableContainer>
        <Table striped bordered hover responsive>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((key) => renderNestedData(key, data[key]))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box className="search-container">
      <Typography variant="h4" className="title">
        Search by ID
      </Typography>

      <Box className="form-container">
        <TextField
          label="Enter ID"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input-field"
        />
      </Box>

      <Box className="form-container">
        <FormControl fullWidth>
          <InputLabel>Select Entity Type</InputLabel>
          <Select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="select-field"
          >
            <MenuItem value="users">User</MenuItem>
            <MenuItem value="theatres">Theatre</MenuItem>
            <MenuItem value="movies">Movie</MenuItem>
            <MenuItem value="bookings">Booking</MenuItem>
            <MenuItem value="payments">Payment</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="form-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          className="search-button"
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box className="loading-container">
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}

      {data && renderTable()}
    </Box>
  );
};
export default SearchById;
