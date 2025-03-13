import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Importing React Bootstrap components
import { addMovie, updateMovie } from "../services/movieService";

const AddEditMovieModal = ({ open, onClose, movie, onMovieSaved }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: [],
    language: "",
    duration: "",
    release_date: "",
    description: "",
    rating: "",
    image_url: "",
    director: "",
    actors: [{ actor_name: "", role: "" }],
    trailer_url: "",
    ticket_price: {
      base_price: "",
      discounts: [{ type: "", amount: "" }],
    },
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        genre: movie.genre,
        language: movie.language,
        duration: movie.duration,
        release_date: movie.release_date,
        description: movie.description,
        rating: movie.rating,
        image_url: movie.image_url,
        director: movie.director,
        actors: movie.actors || [{ actor_name: "", role: "" }],
        trailer_url: movie.trailer_url,
        ticket_price: movie.ticket_price || {
          base_price: "",
          discounts: [{ type: "", amount: "" }],
        },
      });
    }
  }, [movie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input belongs to the nested ticket_price object
    if (name.startsWith("ticket_price")) {
      const [key] = name.split("."); // Get 'ticket_price'
      const nestedKey = name.split(".")[1]; // Get the nested property like 'base_price'

      setFormData({
        ...formData,
        [key]: {
          ...formData[key], // Preserve other values in ticket_price
          [nestedKey]: value, // Update the specific nested field
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // If it's not nested, directly update the value
      });
    }
  };

  const handleActorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedActors = [...formData.actors];
    updatedActors[index][name] = value;
    setFormData({ ...formData, actors: updatedActors });
  };

  const handleAddActor = () => {
    setFormData({
      ...formData,
      actors: [...formData.actors, { actor_name: "", role: "" }],
    });
  };

  const handleRemoveActor = (index) => {
    const updatedActors = formData.actors.filter((_, i) => i !== index);
    setFormData({ ...formData, actors: updatedActors });
  };

  const handleDiscountChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDiscounts = [...formData.ticket_price.discounts];
    updatedDiscounts[index][name] = value;
    setFormData({
      ...formData,
      ticket_price: { ...formData.ticket_price, discounts: updatedDiscounts },
    });
  };

  const handleAddDiscount = () => {
    setFormData({
      ...formData,
      ticket_price: {
        ...formData.ticket_price,
        discounts: [
          ...formData.ticket_price.discounts,
          { type: "", amount: "" },
        ],
      },
    });
  };

  const handleRemoveDiscount = (index) => {
    const updatedDiscounts = formData.ticket_price.discounts.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      ticket_price: { ...formData.ticket_price, discounts: updatedDiscounts },
    });
  };

  const handleSubmit = async () => {
    if (movie) {
      await updateMovie(movie._id, formData);
    } else {
      await addMovie(formData);
    }
    onMovieSaved();
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{movie ? "Edit Movie" : "Add Movie"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter movie title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre.join(", ")}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "genre", value: e.target.value.split(",") },
                })
              }
              placeholder="Enter movie genre (comma separated)"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              placeholder="Enter movie language"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDuration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter duration"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formReleaseDate">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter movie description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              placeholder="Enter movie rating"
              step="0.1"
              min="0"
              max="10"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDirector">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              placeholder="Enter director's name"
              required
            />
          </Form.Group>

          {/* Actors */}
          <Form.Label>Actors</Form.Label>
          {formData.actors.map((actor, index) => (
            <div key={index} className="mb-3">
              <Form.Control
                type="text"
                name="actor_name"
                value={actor.actor_name}
                onChange={(e) => handleActorChange(index, e)}
                placeholder="Enter actor's name"
                required
              />
              <Form.Control
                type="text"
                name="role"
                value={actor.role}
                onChange={(e) => handleActorChange(index, e)}
                placeholder="Enter role"
                required
              />
              <Button variant="danger" onClick={() => handleRemoveActor(index)}>
                Remove Actor
              </Button>
            </div>
          ))}
          <Button variant="primary" onClick={handleAddActor}>
            Add Actor
          </Button>

          <Form.Group className="mb-3" controlId="formTrailerUrl">
            <Form.Label>Trailer URL</Form.Label>
            <Form.Control
              type="text"
              name="trailer_url"
              value={formData.trailer_url}
              onChange={handleInputChange}
              placeholder="Enter trailer URL"
            />
          </Form.Group>

          {/* Ticket Price and Discounts */}
          <Form.Group className="mb-3" controlId="formBasePrice">
            <Form.Label>Base Price</Form.Label>
            <Form.Control
              type="number"
              name="ticket_price.base_price" // Name matches the nested structure
              value={formData.ticket_price.base_price} // Correctly set the value to the nested field
              onChange={handleInputChange}
              placeholder="Enter base ticket price"
              required
            />
          </Form.Group>

          {formData.ticket_price.discounts.map((discount, index) => (
            <div key={index}>
              <Form.Group className="mb-3">
                <Form.Label>Discount Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={discount.type}
                  onChange={(e) => handleDiscountChange(index, e)}
                  placeholder="Enter discount type"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Discount Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={discount.amount}
                  onChange={(e) => handleDiscountChange(index, e)}
                  placeholder="Enter discount amount"
                  required
                />
              </Form.Group>
              <Button
                variant="danger"
                onClick={() => handleRemoveDiscount(index)}
              >
                Remove Discount
              </Button>
            </div>
          ))}
          <Button variant="primary" onClick={handleAddDiscount}>
            Add Discount
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {movie ? "Save Changes" : "Add Movie"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditMovieModal;
