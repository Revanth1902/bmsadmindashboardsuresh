import React, { useState, useEffect } from "react";
import { fetchTheatres, deleteTheatre } from "../services/theatresService"; // Adjust your service imports
import { Button, Table, Spinner, Row, Col, Alert } from "react-bootstrap"; // Import Bootstrap components
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for delete action

const TheatresPage = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // For error handling

  // Fetching theatres data from the API
  useEffect(() => {
    const loadTheatres = async () => {
      try {
        const theatresData = await fetchTheatres(); // Fetch theatres from service
        setTheatres(theatresData);
      } catch (error) {
        setError("Error fetching theatres data");
        console.error("Error fetching theatres:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    loadTheatres();
  }, []);

  // Handling delete action for the theatres
  const handleDelete = async (theatreId) => {
    try {
      await deleteTheatre(theatreId);
      setTheatres(theatres.filter((theatre) => theatre._id !== theatreId)); // Update state after deletion
    } catch (error) {
      setError("Error deleting theatre");
      console.error("Error deleting theatre:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Theatres</h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />{" "}
          {/* Bootstrap spinner */}
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert> // Error handling if fetch fails
      ) : (
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Screens</th>
              <th>Amenities</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theatres.map((theatre) => (
              <tr key={theatre._id}>
                <td>{theatre.name}</td>
                <td>
                  {theatre.location.city}, {theatre.location.state}
                  <br />
                  {theatre.location.address}, {theatre.location.zip_code}
                </td>
                <td>
                  <strong>Phone:</strong> {theatre.contact_info.phone}
                  <br />
                  <strong>Email:</strong> {theatre.contact_info.email}
                </td>
                <td>
                  {theatre.total_screens} Screens
                  <br />
                  {/* {theatre.screens.map((screen) => (
                    <div key={screen._id}>
                      Screen {screen.screen_number}: {screen.capacity} seats (
                      {screen.formats_supported.join(", ")})
                    </div>
                  ))} */}
                </td>
                <td>{theatre.amenities.join(", ")}</td>
                <td>{theatre.status}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(theatre._id)}
                    className="d-flex align-items-center"
                  >
                    <FaTrashAlt style={{ marginRight: "8px" }} />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TheatresPage;
