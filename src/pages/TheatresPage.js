import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Spinner } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import {
  fetchTheatres,
  addTheatre,
  deleteTheatre,
} from "../services/theatresService"; // Import the API service

const TheatresPage = () => {
  const [theatres, setTheatres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      city: "",
      state: "",
      zip_code: "",
      coordinates: { latitude: "", longitude: "" },
    },
    contact_info: { phone: "", email: "" },
    total_screens: 1,
    screens: [{ screen_number: 1, capacity: "", formats_supported: ["2D"] }],
    manager: { name: "", contact: { phone: "", email: "" } },
    amenities: ["Parking", "Snacks", "Restrooms"],
    status: "open",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);

  // Load theatres data
  const loadTheatres = async () => {
    setLoading(true);
    try {
      const theatresData = await fetchTheatres();
      setTheatres(theatresData);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTheatres();
  }, []);

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      // For nested fields (e.g., location, manager, screens)
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        let currentField = updatedData;
        nameParts.forEach((part, index) => {
          if (index === nameParts.length - 1) {
            currentField[part] = value;
          } else {
            currentField = currentField[part];
          }
        });
        return updatedData;
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addTheatre(formData);
      setShowModal(false);
      resetForm();
      await loadTheatres();
    } catch (error) {
      console.error("Error submitting theatre data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete theatre
  const handleDelete = async (theatreId) => {
    setLoading(true);
    try {
      await deleteTheatre(theatreId);
      setTheatres(theatres.filter((theatre) => theatre._id !== theatreId));
    } catch (error) {
      console.error("Error deleting theatre:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      location: {
        address: "",
        city: "",
        state: "",
        zip_code: "",
        coordinates: { latitude: "", longitude: "" },
      },
      contact_info: { phone: "", email: "" },
      total_screens: 1,
      screens: [{ screen_number: 1, capacity: "", formats_supported: ["2D"] }],
      manager: { name: "", contact: { phone: "", email: "" } },
      amenities: ["Parking", "Snacks", "Restrooms"],
      status: "open",
      image_url: "",
    });
  };

  // Render loader
  const renderLoader = () => <Spinner animation="border" variant="primary" />;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Theatres</h1>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add New Theatre
      </Button>
      {loading ? (
        renderLoader()
      ) : (
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theatres.map((theatre) => (
              <tr key={theatre._id}>
                <td>{theatre._id}</td>
                <td>{theatre.name}</td>
                <td>{theatre.location.city}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(theatre._id)}
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

      {/* Modal to add a new theatre */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Theatre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Field */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Theatre Name"
              />
            </Form.Group>

            {/* Location Fields */}
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                placeholder="Enter City"
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleInputChange}
                placeholder="Enter State"
              />
            </Form.Group>
            <Form.Group controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="location.zip_code"
                value={formData.location.zip_code}
                onChange={handleInputChange}
                placeholder="Enter Zip Code"
              />
            </Form.Group>
            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="location.coordinates.latitude"
                value={formData.location.coordinates.latitude}
                onChange={handleInputChange}
                placeholder="Enter Latitude"
              />
            </Form.Group>
            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="location.coordinates.longitude"
                value={formData.location.coordinates.longitude}
                onChange={handleInputChange}
                placeholder="Enter Longitude"
              />
            </Form.Group>

            {/* Contact Info */}
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="contact_info.phone"
                value={formData.contact_info.phone}
                onChange={handleInputChange}
                placeholder="Enter Phone"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="contact_info.email"
                value={formData.contact_info.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
              />
            </Form.Group>

            {/* Total Screens */}
            <Form.Group controlId="formTotalScreens">
              <Form.Label>Total Screens</Form.Label>
              <Form.Control
                type="number"
                name="total_screens"
                value={formData.total_screens}
                onChange={handleInputChange}
                placeholder="Enter Total Screens"
                min="1"
              />
            </Form.Group>

            {/* Screens Details */}
            {Array.from({ length: formData.total_screens }).map((_, index) => (
              <div key={index} className="screen-details">
                <Form.Group controlId={`formScreenNumber-${index}`}>
                  <Form.Label>Screen Number</Form.Label>
                  <Form.Control
                    type="number"
                    name={`screens.${index}.screen_number`}
                    value={formData.screens[index]?.screen_number || ""}
                    onChange={handleInputChange}
                    placeholder="Enter Screen Number"
                  />
                </Form.Group>
                <Form.Group controlId={`formScreenCapacity-${index}`}>
                  <Form.Label>Screen Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name={`screens.${index}.capacity`}
                    value={formData.screens[index]?.capacity || ""}
                    onChange={handleInputChange}
                    placeholder="Enter Screen Capacity"
                  />
                </Form.Group>
                <Form.Group controlId={`formScreenFormats-${index}`}>
                  <Form.Label>Formats Supported</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    name={`screens.${index}.formats_supported`}
                    value={formData.screens[index]?.formats_supported || []}
                    onChange={handleInputChange}
                  >
                    <option value="2D">2D</option>
                    <option value="IMAX">IMAX</option>
                    <option value="3D">3D</option>
                  </Form.Control>
                </Form.Group>
              </div>
            ))}

            {/* Manager Details */}
            <Form.Group controlId="formManagerName">
              <Form.Label>Manager Name</Form.Label>
              <Form.Control
                type="text"
                name="manager.name"
                value={formData.manager.name}
                onChange={handleInputChange}
                placeholder="Enter Manager Name"
              />
            </Form.Group>
            <Form.Group controlId="formManagerPhone">
              <Form.Label>Manager Phone</Form.Label>
              <Form.Control
                type="text"
                name="manager.contact.phone"
                value={formData.manager.contact.phone}
                onChange={handleInputChange}
                placeholder="Enter Manager Phone"
              />
            </Form.Group>
            <Form.Group controlId="formManagerEmail">
              <Form.Label>Manager Email</Form.Label>
              <Form.Control
                type="email"
                name="manager.contact.email"
                value={formData.manager.contact.email}
                onChange={handleInputChange}
                placeholder="Enter Manager Email"
              />
            </Form.Group>

            {/* Amenities */}
            <Form.Group controlId="formAmenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
              >
                <option value="Parking">Parking</option>
                <option value="Snacks">Snacks</option>
                <option value="Restrooms">Restrooms</option>
              </Form.Control>
            </Form.Group>

            {/* Status */}
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </Form.Control>
            </Form.Group>

            {/* Image URL */}
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="Enter Image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TheatresPage;
