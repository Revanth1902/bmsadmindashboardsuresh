import React, { useState, useEffect } from "react";
import {
  fetchTheatres,
  deleteTheatre,
  addTheatre,
} from "../services/theatresService";
import {
  Button,
  Table,
  Spinner,
  Row,
  Col,
  Alert,
  Modal,
  Form,
} from "react-bootstrap"; // Import necessary components
import { FaTrashAlt, FaPlus } from "react-icons/fa"; // Icons for delete and add actions

const TheatresPage = () => {
  const theater_amenities = [
    "Comfortable seating",
    "High-quality sound system",
    "HD projectors",
    "VIP lounge",
    "Concessions stand",
    "Restrooms",
    "Free Wi-Fi",
    "Air conditioning",
    "Accessible seating",
    "Parking lot",
    "Coat check",
    "Hearing assistance devices",
    "Screen captions/subtitles",
    "Bar or café",
    "Gift shop",
    "Group booking options",
    "Loyalty programs",
    "Childcare services",
    "Wheelchair access",
    "Reserved seating",
  ];
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching theatres
  const [error, setError] = useState(null); // Error state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to manage Delete Confirmation Modal visibility
  const [selectedTheatreId, setSelectedTheatreId] = useState(null); // ID of the selected theatre to delete
  const [showAddModal, setShowAddModal] = useState(false); // State to manage Add Theatre Modal visibility
  const [newTheatreData, setNewTheatreData] = useState({
    name: "",
    location: {
      coordinates: { latitude: "", longitude: "" },
      address: "",
      city: "",
      state: "",
      zip_code: "",
    },
    contact_info: { phone: "", email: "" },
    manager: {
      name: "",
      contact: { phone: "", email: "" },
    },
    amenities: [],
    status: "open", // Changed to valid status value
    total_screens: 1,
  });

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

  // Handle Delete Action - Open confirmation modal
  const handleDelete = (theatreId) => {
    setSelectedTheatreId(theatreId); // Set the ID of the theatre to be deleted
    setShowDeleteModal(true); // Show confirmation modal
  };

  // Confirm Delete Action
  const confirmDelete = async () => {
    try {
      await deleteTheatre(selectedTheatreId); // Call delete API
      setTheatres(
        theatres.filter((theatre) => theatre._id !== selectedTheatreId)
      ); // Update state after deletion
    } catch (error) {
      setError("Error deleting theatre");
      console.error("Error deleting theatre:", error);
    } finally {
      setShowDeleteModal(false); // Close the modal after deletion
    }
  };

  // Handle Add Theatre - Open modal
  const handleAddTheatre = () => {
    setShowAddModal(true); // Show Add Theatre modal
  };

  // Handle Add Theatre Form Submit
  const handleAddTheatreSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTheatre(newTheatreData); // Call add theatre API
      setTheatres([...theatres, newTheatreData]); // Update theatres state
      setShowAddModal(false); // Close modal
      setNewTheatreData({
        name: "",
        location: {
          coordinates: { latitude: "", longitude: "" },
          address: "",
          city: "",
          state: "",
          zip_code: "",
        },
        contact_info: { phone: "", email: "" },
        manager: {
          name: "",
          contact: { phone: "", email: "" },
        },
        amenities: [],
        status: "active",
        total_screens: 1,
      }); // Reset form
    } catch (error) {
      setError("Error adding theatre");
      console.error("Error adding theatre:", error);
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
        <>
          <Row className="mb-4">
            <Col>
              <Button variant="primary" onClick={handleAddTheatre}>
                <FaPlus className="mr-2" /> Add Theatre
              </Button>
            </Col>
          </Row>
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
                  </td>
                  <td>{theatre.contact_info.phone}</td>
                  <td>{theatre.total_screens} Screens</td>
                  <td>{theatre.amenities.join(", ")}</td>
                  <td>{theatre.status}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(theatre._id)}
                    >
                      <FaTrashAlt /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Confirmation Dialog Modal for Deletion */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Theatre</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this theatre?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Theatre Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Theatre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTheatreSubmit}>
            {/* Theatre Name */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTheatreName">
                  <Form.Label>Theatre Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTheatreData.name}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Location Section (Address, City, State, Zip) - 4 fields side by side */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="formTheatreLocationAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    value={newTheatreData.location.address}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        location: {
                          ...newTheatreData.location,
                          address: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formTheatreLocationCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={newTheatreData.location.city}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        location: {
                          ...newTheatreData.location,
                          city: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formTheatreLocationState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    value={newTheatreData.location.state}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        location: {
                          ...newTheatreData.location,
                          state: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formTheatreLocationZipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip Code"
                    value={newTheatreData.location.zip_code}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        location: {
                          ...newTheatreData.location,
                          zip_code: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Coordinates Section - 2 fields side by side */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTheatreCoordinatesLatitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Latitude"
                    value={newTheatreData.location.coordinates.latitude}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        location: {
                          ...newTheatreData.location,
                          coordinates: {
                            ...newTheatreData.location.coordinates,
                            latitude: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTheatreCoordinatesLongitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Longitude"
                    value={newTheatreData.location.coordinates.longitude}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        location: {
                          ...newTheatreData.location,
                          coordinates: {
                            ...newTheatreData.location.coordinates,
                            longitude: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Contact Info - 2 fields side by side */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTheatreContactPhone">
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    value={newTheatreData.contact_info.phone}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        contact_info: {
                          ...newTheatreData.contact_info,
                          phone: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTheatreContactEmail">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={newTheatreData.contact_info.email}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        contact_info: {
                          ...newTheatreData.contact_info,
                          email: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Manager Info - 2 fields side by side */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTheatreManagerName">
                  <Form.Label>Manager Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Manager Name"
                    value={newTheatreData.manager.name}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        manager: {
                          ...newTheatreData.manager,
                          name: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTheatreManagerPhone">
                  <Form.Label>Manager Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Manager Phone"
                    value={newTheatreData.manager.contact.phone}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        manager: {
                          ...newTheatreData.manager,
                          contact: {
                            ...newTheatreData.manager.contact,
                            phone: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTheatreManagerEmail">
                  <Form.Label>Manager Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Manager Email"
                    value={newTheatreData.manager.contact.email}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        manager: {
                          ...newTheatreData.manager,
                          contact: {
                            ...newTheatreData.manager.contact,
                            email: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTheatreAmenities">
                  <Form.Label>Amenities</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={newTheatreData.amenities}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        amenities: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                    required
                  >
                    {theater_amenities.map((amenity, index) => (
                      <option key={index} value={amenity}>
                        {amenity}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Status */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formTheatreStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={newTheatreData.status}
                    onChange={(e) =>
                      setNewTheatreData({
                        ...newTheatreData,
                        status: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="renovation">Renovation</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Add Theatre
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TheatresPage;
