import React, { useState } from "react";
import "./About.css";

import AboutBanner from "../../assets/about-bg-i.jpg";
import AboutBanner1 from "../../assets/Carousel-3.jpg";
// import AboutBanner2 from "../../assets/About-banner-2.png";
import AboutBanner3 from "../../assets/About-banner-3.png";
import AboutUs from "../../assets/about-img.png";

const About = () => {
  const slides = [
    {
      image: AboutBanner1,
      alt: "About Carousel Image 1",
      title: "Experience the Purity of Nature",
      // subtitle: "Fresh Fruits",
      description:
        "At Annapurna Farms, we create natural powders and spice blends using carefully selected ingredients, ensuring purity, freshness, and exceptional quality in every product.",
    },
    {
      image: AboutBanner3,
      alt: "About Carousel Image 3",
      title: "Taste the Goodness of Nature",
      // subtitle: "Masalas",
      description:
        "From traditional karam powders to flavorful masalas and nutritious herbal powders, our products bring authentic taste, rich aroma, and natural goodness straight from the farm to your home.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  // useEffect(() => {
  //   document.title = "About";
  // }, []);

  return (
    <div className="about-section">
      <div className="about-section-containers">
        <div
          className="about-section-carousel-image"
          style={{
            backgroundImage: `url(${AboutBanner})`,
          }}
        ></div>
      </div>
      {/* About Content Section */}
      <div className="content-section">
        <div className="content-image">
          <img src={AboutUs} alt="About" className="about_img" />
        </div>
        <div className="content-text-about">
          <span className="name">— Our Mission</span>
          <h2 className="content-heading">Who we are</h2>
          <p className="content-text-para">
            Annapurna Organic, we believe in the power of nature and the purity
            of organic farming. Our journey began with a simple vision: to
            provide healthy, fresh, and natural produce while supporting
            sustainable farming practices. As a family-owned business, we are
            passionate about bringing you the best of nature's bounty, grown
            without harmful chemicals or synthetic pesticides.
          </p>
          {/* <button className="read_more_button">Read More</button> */}
        </div>
      </div>

      {/* Numbers Section */}
      <div className="about-grid-container">
        <div className="about-grid-item-start">
          <span>— We in numbers</span>
          <h2 className="about-numbers-heading">
            Our achievements reflect our commitment to delivering high-quality
            products, exceptional customer service, and innovative solutions. We
            take pride in building long-term relationships with our customers
            and continuously improving our services to meet their evolving
            needs.
          </h2>
        </div>

        <div className="about-grid-item-one">
          <h2 className="about-grid-item-heading">924</h2>
          <p className="about-grid-item-para">SATISFACTION CLIENTS</p>
        </div>

        <div className="about-grid-item-two">
          <h2 className="about-grid-item-heading">35</h2>
          <p className="about-grid-item-para">AWARDS RECEIVED</p>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="portfolio-container">
        <div className="portfolio-container-first">
          <p className="portfolio-container-para">
            At Annapurna Farms, we offer a carefully curated range of
            premium-quality spice blends, traditional karam powders, and natural
            herbal powders made from fresh, high-quality ingredients. Our
            products are prepared with a focus on purity, authentic taste, and
            nutritional value, bringing the goodness of nature directly to your
            kitchen.
          </p>
        </div>
        <div className="Our-portfolio-container-one">
          <span>— Our portfolio</span>
          <h2 className="our-protfolio-heading2">
            Taste the Authentic Difference: Pure, Fresh, and Natural
            Ingredients, Straight from the Farm
          </h2>
        </div>
      </div>

      <div className="portfolio-carousel-container">
        <div className="portfolio-carousel">
          <button
            className="slider-arrow slider-arrow-left"
            onClick={handlePrev}
          >
            ←
          </button>

          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].alt}
            className="portfolio-carousel-image"
          />

          <div className="carousel-overlay_00">
            <p className="carousel-subheading_99">
              {/* {slides[currentIndex].subtitle} */}
            </p>
            <h2 className="carousel-heading_99">
              {slides[currentIndex].title}
            </h2>
            <p className="carousel-description_99">
              {slides[currentIndex].description}
            </p>
          </div>

          <button
            className="slider-arrow slider-arrow-right"
            onClick={handleNext}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
