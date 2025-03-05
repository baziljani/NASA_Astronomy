import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_REACT_APP_NASA_API_KEY;

function ImageDetailsPage() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [asFavorite, setAsFavorite] = useState(false);

  useEffect(() => {
    if (date) {
      fetchImageDetails(date);
      checkFavorite(date);
    }
  }, [date]);

  const fetchImageDetails = async (date) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
      );
      setImage(response.data);
    } catch (error) {
      console.error("Error loading image details:", error);
    }
  };

  const checkFavorite = (date) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setAsFavorite(favorites.includes(date));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (asFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav !== date);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(date);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setAsFavorite(!asFavorite);
  };

  if (!image) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="navigate"
      >
        Back to Gallery
      </button>
      <h1 className="text">{image.title}</h1>
      <div className="image">
        {image.media_type === "image" ? (
          <img
            src={image.url}
            alt={image.title}
            className="image-tiles"
          />
        ) : (
          <iframe
            src={image.url}
            title={image.title}
            className="image-tiles"
            allowFullScreen
          />
        )}
        <div className="text-details">
          <p className="text">{image.explanation}</p>
          <p className="text">Date: {image.date}</p>
          {image.copyright && (
            <p className="text">Copyright: {image.copyright}</p>
          )}
          <button
            onClick={toggleFavorite}
            className="favorite"
          >
            {asFavorite ? "😒 Remove Favorite" : "😍 Add Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageDetailsPage;