import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ImageListingPage.css";

const API_KEY = import.meta.env.VITE_REACT_APP_NASA_API_KEY;
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=100`;

function ImageListingPage() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all");

  useEffect(() => {
    if (!API_KEY) {
      console.error("API key is missing. Please set REACT_APP_NASA_API_KEY in your environment variables.");
      return;
    }
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(APOD_URL);
      setImages(response.data);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (e) => {
    setMediaTypeFilter(e.target.value);
  };

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.date.includes(searchQuery);
    const matchesFilter =
      mediaTypeFilter === "all" || image.media_type === mediaTypeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
          <h1 className="head">🪐 Welcome to the NASA Astronomy Gallery</h1>
          <p className="para">
            The 100 best images from NASA as captured and selected by the NASA Headquarters Photo team.
          </p>

      <div >
        <input
          type="text"
          placeholder="Title or Date (YYYY-MM-DD)"
          value={searchQuery}
          onChange={handleSearch}
          className="border"
        />
        <select
          value={mediaTypeFilter}
          onChange={handleFilter}
          className="border"
        >
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <div className="image-grid">
        {filteredImages.map((image) => (
          <div key={image.date} className="border">
            <img
              src={image.url}
              alt={image.title}
              className="image"
              loading="lazy"
            />
            <h2 className="heading2">{image.title}</h2>
            <p className="para">{image.date}</p>
            <Link to={`/details/${image.date}`}>
              <button className="details">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageListingPage;