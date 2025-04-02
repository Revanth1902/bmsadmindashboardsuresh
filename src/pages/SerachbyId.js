import React, { useState } from "react";
import axios from "axios";
import { Spinner, Table, Form, Button, Alert } from "react-bootstrap";

const SearchById = () => {
  const [id, setId] = useState("");
  const [entityType, setEntityType] = useState("users"); // Default search for users
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
    // Case 1: If the value is a nested object (e.g., location, contact_info, manager, ticket_price)
    if (typeof value === "object" && value !== null) {
      // Handle ticket_price specifically
      if (key === "ticket_price") {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Base Price</td>
                    <td>{value.base_price}</td>
                  </tr>
                  {/* Render discounts if available */}
                  {value.discounts.length > 0 ? (
                    value.discounts.map((discount, index) => (
                      <tr key={index}>
                        <td>{discount.type} Discount</td>
                        <td>{discount.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Discounts</td>
                      <td>-</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </td>
          </tr>
        );
      }

      // Special case for location object
      if (key === "location") {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Latitude</td>
                    <td>{value.coordinates?.latitude}</td>
                  </tr>
                  <tr>
                    <td>Longitude</td>
                    <td>{value.coordinates?.longitude}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{value.address}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{value.city}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{value.state}</td>
                  </tr>
                  <tr>
                    <td>Zip Code</td>
                    <td>{value.zip_code}</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
        );
      }

      // Special case for contact_info object
      if (key === "contact_info") {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Phone</td>
                    <td>{value.phone}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{value.email}</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
        );
      }

      // Special case for manager object
      if (key === "manager") {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{value.name}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone</td>
                    <td>{value.contact?.phone}</td>
                  </tr>
                  <tr>
                    <td>Contact Email</td>
                    <td>{value.contact?.email}</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
        );
      }

      // Case for arrays like screens, amenities, movies_showing, etc.
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <Table striped bordered hover size="sm" className="mt-2">
                  <thead>
                    <tr>
                      {Object.keys(value[0]).map((subKey, idx) => (
                        <th key={idx}>
                          {subKey.replace(/_/g, " ").toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item).map((subValue, idx) => (
                          <td key={idx}>{subValue}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
            </tr>
          );
        }
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                  <tr>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {value.map((item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
        );
      }

      // For any other nested objects (like cast, reviews), render them as a list
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <ul>
              {Object.keys(value).map((nestedKey) => (
                <li key={nestedKey}>
                  <strong>{nestedKey}:</strong>{" "}
                  {JSON.stringify(value[nestedKey])}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      );
    }

    // Case 2: If the value is a string URL (e.g., image_url or trailer_url)
    if (key === "image_url" && value.startsWith("http")) {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <img
              src={value}
              alt="Movie Poster"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </td>
        </tr>
      );
    }
    if (key === "trailer_url" && value) {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <a href={value} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">Watch Trailer</Button>
            </a>
          </td>
        </tr>
      );
    }

    // Case 3: Default rendering for other key-value pairs (strings, numbers, etc.)
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!id) {
      setError("Please enter an ID.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Dynamically build the endpoint based on the entity type
      const response = await axios.get(
        `https://bmsbackend-u3gc.onrender.com/api/admin/api/admin/${entityType}/${id}`
      );

      // Check if the entity data is wrapped in a `user`, `movie`, etc.
      const entityData =
        response.data[entityType] ||
        response.data.user ||
        response.data.movie ||
        response.data.booking ||
        response.data.theatre;

      // Set the fetched data
      setData(entityData);
      console.log(entityData);
    } catch (err) {
      setError("No data found or something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Function to render table based on entity type
  const renderTable = () => {
    if (!data) return null;

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate through data and render key-value pairs */}
          {Object.keys(data).map((key) => renderNestedData(key, data[key]))}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="container mt-4">
      <h3>Search by ID</h3>

      {/* Search Form */}
      <Form>
        <Form.Group controlId="searchId">
          <Form.Label>Enter ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        {/* Dropdown to select the entity */}
        <Form.Group controlId="entityType" className="mt-3">
          <Form.Label>Select Entity Type</Form.Label>
          <Form.Control
            as="select"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
          >
            <option value="users">User</option>
            <option value="theatres">Theatre</option>
            <option value="movies">Movie</option>
            <option value="bookings">Booking</option>
            <option value="payments">Payment</option>
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleSearch}
          disabled={loading}
          className="mt-3"
        >
          Search
        </Button>
      </Form>

      {/* Loader */}
      {loading && (
        <div className="mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Display Data in Table */}
      {data && renderTable()}
    </div>
  );
};

export default SearchById;
