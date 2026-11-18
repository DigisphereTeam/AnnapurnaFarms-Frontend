import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { BASE_URL, CAROUSEL_API } from "../../api/api";
import { toast } from "react-toastify";
import "./Slider.css";

const Sliders = () => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch(CAROUSEL_API.GET_ALL);
        const result = await response.json();

        if (result.statusCode === 200) {
          const images = result.carousels.map(item => ({
            id: item.carousel_id,
            src: `${BASE_URL}/${item.carousel_image}`,
          }));
          setCarouselImages(images);
        } else {
           toast.error(`Failed to fetch images:, ${result.message}`);
        }
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchCarouselImages();
  }, []);

  return (
    <div className="carousel-container">
      <Carousel indicators={false} controls={false} interval={3000} className="carousel-custom">
        {carouselImages.map((item) => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.src} alt={`Slide ${item.id}`} />
            {/* <Carousel.Caption>
              <h3 className="carousel-container-title">Premium Quality Powders</h3>
              <p className="carousel-container-para">Fresh, healthy, and nutrient-rich powders for your daily wellness.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Sliders;
