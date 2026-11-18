import React, { useState } from "react";
import "./Blog.css";


import second from "../../assets/chilly powder.jpg";
import third from "../../assets/coriander powder.jpg";
import fourth from "../../assets/cardamom powder.jpg";
import five from "../../assets/cumin powder.jpg";

import first from "../../assets/Palli Karam.jpg.jpeg";  

import Moringa_powder from "../../assets/Moringa Powder.jpg.jpeg";
import Palli_Karam from "../../assets/Palli Karam.jpg.jpeg";
import Podina_Karam from "../../assets/Podina Karam.jpg.jpeg";
import tomato_Karam from "../../assets/tomato powder.jpg.jpeg";
import Karivepaku_Karam from "../../assets/Karivepaku Karam.jpg.jpeg";
import rose_powder from "../../assets/rose powder.jpg.jpeg";
import veg_masala from "../../assets/veg masala.jpg.jpeg";
import non_veg_masala from "../../assets/non veg masala.jpg.jpeg";



import blog1 from "../../assets/coconut powder.jpg";
import blog2 from "../../assets/coriander powder.jpg";
import blog3 from "../../assets/chilly powder.jpg";

const Blog = () => {
  const blogData = [
    {
      title: "Moringa Powder",
      image: Moringa_powder,
      content: {
        pageTitle:
          "Moringa Powder: Nature’s Superfood for a Healthier Lifestyle",

        intro: [
          "At Annapurna Farms, we are committed to bringing the goodness of nature to your home. Our Moringa Powder is made from carefully selected moringa leaves that are naturally dried and finely ground to preserve their nutritional value and natural goodness.",
          'Known as the "Miracle Tree," moringa is packed with essential vitamins, minerals, and antioxidants that support overall health and wellness.',
        ],

        whyTitle: "Why Choose Annapurna Farms Moringa Powder?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made from premium-quality moringa leaves without artificial colors, preservatives, or additives.",
          },
          {
            title: "Rich in Nutrients",
            desc: "A natural source of vitamins, minerals, antioxidants, and plant-based nutrients.",
          },
          {
            title: "Supports a Healthy Lifestyle",
            desc: "Helps complement a balanced diet and active lifestyle.",
          },
          {
            title: "Easy to Use",
            desc: "Can be added to smoothies, juices, soups, and various recipes.",
          },
        ],

        howTitle: "How to Use Moringa Powder",

        howSections: [
          {
            subtitle: "Healthy Beverages",
            points: [
              "Morning Drink: Mix 1 teaspoon of Moringa Powder in warm water and consume daily.",
              "Smoothies: Blend with banana, milk, and honey for a nutritious smoothie.",
            ],
          },
          {
            subtitle: "Everyday Cooking",
            points: [
              "Soups: Add a teaspoon to vegetable or lentil soups for extra nutrition.",
              "Curries: Mix into curries and gravies to enhance nutritional value.",
              "Health Mixes: Combine with other natural ingredients for homemade health drinks.",
            ],
          },
        ],

        benefits: [
          "Rich in antioxidants",
          "Contains essential vitamins and minerals",
          "Supports overall wellness",
          "Easy to incorporate into daily meals",
          "Naturally sourced and carefully processed",
        ],

        storage: [
          "Store in an airtight container after opening.",
          "Keep in a cool and dry place.",
          "Avoid direct sunlight and moisture.",
          "Use a dry spoon to maintain freshness.",
        ],

        conclusion: [
          "Whether you're looking to enhance your nutrition, prepare healthy beverages, or add natural goodness to your meals, Moringa Powder is a simple and convenient choice.",
          "Experience the purity of nature with Annapurna Farms Moringa Powder and take a step toward a healthier lifestyle.",
          "Discover the goodness of Moringa with Annapurna Farms today!",
        ],
      },
    },

    {
      title: "Palli Karam",
      image: Palli_Karam,
      content: {
        pageTitle: "Palli Karam: The Authentic Andhra Flavor for Every Meal",

        intro: [
          "At Annapurna Farms, we are dedicated to bringing traditional flavors to your dining table.",
          "Our Palli Karam is prepared using premium-quality roasted peanuts and carefully selected spices to deliver the authentic taste of Andhra cuisine.",
          "Known for its rich flavor and irresistible aroma, Palli Karam is a versatile spice blend that enhances the taste of everyday meals and traditional dishes alike.",
        ],

        whyTitle: "Why Choose Annapurna Farms Palli Karam?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made from high-quality peanuts and natural spices without artificial colors or preservatives.",
          },
          {
            title: "Rich in Flavor",
            desc: "Offers a perfect balance of nutty taste and traditional Andhra spices.",
          },
          {
            title: "Traditional Recipe",
            desc: "Prepared using authentic methods to preserve the original flavor and aroma.",
          },
          {
            title: "Easy to Use",
            desc: "A ready-to-use accompaniment for rice, idli, dosa, and various snacks.",
          },
        ],

        howTitle: "How to Use Palli Karam",

        howSections: [
          {
            subtitle: "Traditional Andhra Style",
            points: [
              "Hot Rice and Ghee: Mix 1-2 teaspoons of Palli Karam with hot rice and ghee.",
              "Idli and Dosa: Sprinkle over idli or dosa and enjoy with a little oil or ghee.",
            ],
          },
          {
            subtitle: "Everyday Meals",
            points: [
              "Side Dish: Serve as a flavorful side accompaniment with lunch or dinner.",
              "Snacks: Use as a seasoning for snacks and savory dishes.",
            ],
          },
        ],

        benefits: [
          "Rich peanut flavor",
          "Traditional Andhra taste",
          "Versatile and easy to use",
          "Made from natural ingredients",
          "Enhances the flavor of everyday meals",
        ],

        storage: [
          "Store in an airtight container after opening.",
          "Keep in a cool and dry place.",
          "Avoid direct exposure to sunlight.",
          "Always use a dry spoon.",
        ],

        conclusion: [
          "Whether you are enjoying a simple meal of rice and ghee or serving traditional breakfast dishes, Palli Karam adds authentic flavor and richness to every bite.",
          "Experience the traditional taste of Andhra Pradesh with Annapurna Farms Palli Karam and make every meal more delicious.",
          "Discover the authentic goodness of Palli Karam with Annapurna Farms today!",
        ],
      },
    },

    {
      title: "Veg Masala",
      image: veg_masala,
      content: {
        pageTitle: "Veg Masala: The Secret to Flavorful Vegetarian Cooking",

        intro: [
          "At Annapurna Farms, we believe that great food starts with great ingredients. Our Veg Masala is expertly crafted using a blend of premium spices to bring authentic taste, rich aroma, and vibrant flavor to your favorite vegetarian dishes.",
          "Carefully prepared and finely ground, our Veg Masala helps you create delicious meals with ease while preserving the traditional flavors of Indian cuisine.",
        ],

        whyTitle: "Why Choose Annapurna Farms Veg Masala?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made from carefully selected spices without artificial colors or preservatives.",
          },
          {
            title: "Rich Aroma",
            desc: "Enhances the fragrance and taste of every dish.",
          },
          {
            title: "Authentic Flavor",
            desc: "A balanced blend of spices for traditional Indian cooking.",
          },
          {
            title: "Easy to Use",
            desc: "Perfect for everyday cooking and special occasions.",
          },
        ],

        howTitle: "How to Use Veg Masala",

        howSections: [
          {
            subtitle: "Vegetable Curries",
            points: [
              "Add 1–2 teaspoons while cooking vegetable curries for enhanced flavor.",
            ],
          },
          {
            subtitle: "Paneer Dishes",
            points: [
              "Mix into paneer recipes to create rich and flavorful gravies.",
            ],
          },
          {
            subtitle: "Dal Preparations",
            points: [
              "Add a small amount to lentils and dals for a delicious twist.",
            ],
          },
          {
            subtitle: "Mixed Vegetable Recipes",
            points: [
              "Enhance the taste of stir-fries and vegetable preparations.",
            ],
          },
        ],

        benefits: [
          "Rich and authentic taste",
          "Premium-quality spice blend",
          "Easy to use in daily cooking",
          "Enhances aroma and flavor",
          "Suitable for a variety of vegetarian dishes",
        ],

        storage: [
          "Store in an airtight container after opening.",
          "Keep in a cool and dry place.",
          "Avoid direct sunlight and moisture.",
          "Use a dry spoon to maintain freshness.",
        ],

        conclusion: [
          "Whether you're preparing a simple family meal or a festive feast, Annapurna Farms Veg Masala helps bring authentic taste and aroma to every dish.",
          "Experience the richness of traditional spices with Annapurna Farms Veg Masala today!",
        ],
      },
    },

    {
      title: "Non Veg Masala",
      image: non_veg_masala,
      content: {
        pageTitle:
          "Non Veg Masala: Authentic Spice Blend for Delicious Non-Vegetarian Dishes",

        intro: [
          "At Annapurna Farms, we bring together carefully selected spices to create a bold and flavorful Non Veg Masala.",
          "Designed to complement chicken, mutton, fish, and seafood recipes, it delivers rich taste and irresistible aroma.",
          "Our special spice blend helps you recreate restaurant-style flavors right in your own kitchen.",
        ],

        whyTitle: "Why Choose Annapurna Farms Non Veg Masala?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made using premium-quality spices without artificial additives.",
          },
          {
            title: "Rich Flavor",
            desc: "Enhances the taste of meat and seafood dishes.",
          },
          {
            title: "Traditional Blend",
            desc: "Prepared using authentic recipes and carefully balanced ingredients.",
          },
          {
            title: "Convenient to Use",
            desc: "Perfect for daily cooking and special occasions.",
          },
        ],

        howTitle: "How to Use Non Veg Masala",

        howSections: [
          {
            subtitle: "Chicken Curry",
            points: ["Add 1–2 teaspoons while cooking chicken curry."],
          },
          {
            subtitle: "Mutton Curry",
            points: ["Mix into mutton gravies for deep, rich flavor."],
          },
          {
            subtitle: "Fish Recipes",
            points: ["Use in fish curries and marinades."],
          },
          {
            subtitle: "Biryani",
            points: [
              "Add to biryani preparations for enhanced aroma and taste.",
            ],
          },
        ],

        benefits: [
          "Rich and authentic flavor",
          "Suitable for various meat dishes",
          "Enhances aroma and texture",
          "Easy to use",
          "Made from quality ingredients",
        ],

        storage: [
          "Store in an airtight container.",
          "Keep away from moisture and direct sunlight.",
          "Use a dry spoon.",
          "Keep in a cool and dry place.",
        ],

        conclusion: [
          "Whether it's a family gathering or a special celebration, Annapurna Farms Non Veg Masala helps create delicious meals packed with authentic taste.",
          "Discover the rich flavors of Annapurna Farms Non Veg Masala today!",
        ],
      },
    },

    {
      title: "Podina Karam",
      image: Podina_Karam,
      content: {
        pageTitle: "Podina Karam: A Refreshing Twist of Mint and Spices",

        intro: [
          "At Annapurna Farms, our Podina Karam combines the freshness of mint leaves with traditional spices to create a flavorful and aromatic accompaniment for your meals.",
          "Its unique blend of ingredients delivers a refreshing taste while maintaining the authentic essence of Andhra cuisine.",
        ],

        whyTitle: "Why Choose Annapurna Farms Podina Karam?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Prepared using natural ingredients and quality spices.",
          },
          {
            title: "Refreshing Flavor",
            desc: "The goodness of mint provides a fresh and vibrant taste.",
          },
          {
            title: "Traditional Taste",
            desc: "Inspired by authentic Andhra recipes.",
          },
          {
            title: "Ready to Use",
            desc: "Perfect for quick and delicious meals.",
          },
        ],

        howTitle: "How to Use Podina Karam",

        howSections: [
          {
            subtitle: "Hot Rice and Ghee",
            points: ["Mix with rice and ghee for a flavorful meal."],
          },
          {
            subtitle: "Idli and Dosa",
            points: ["Serve as a side accompaniment."],
          },
          {
            subtitle: "Chapati and Roti",
            points: ["Sprinkle over chapatis with a little ghee."],
          },
          {
            subtitle: "Snacks",
            points: ["Use as a seasoning for snacks and savory dishes."],
          },
        ],

        benefits: [
          "Refreshing mint flavor",
          "Rich aroma",
          "Traditional Andhra taste",
          "Easy to use",
          "Made from natural ingredients",
        ],

        storage: [
          "Store in an airtight container.",
          "Keep in a cool and dry place.",
          "Protect from moisture.",
          "Always use a dry spoon.",
        ],

        conclusion: [
          "Bring freshness and authentic Andhra flavor to your meals with Annapurna Farms Podina Karam.",
          "Experience the perfect blend of mint and spices today!",
        ],
      },
    },

    {
      title: "Karivepaku Karam",
      image: Karivepaku_Karam,
      content: {
        pageTitle: "Karivepaku Karam: The Nutritional Power of Curry Leaves",

        intro: [
          "At Annapurna Farms, our Karivepaku Karam is prepared using carefully selected curry leaves and traditional spices.",
          "This flavorful blend combines authentic taste with the natural goodness of curry leaves.",
          "A favorite in Andhra kitchens, Karivepaku Karam is both delicious and versatile.",
        ],

        whyTitle: "Why Choose Annapurna Farms Karivepaku Karam?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made using quality curry leaves and natural spices.",
          },
          {
            title: "Rich Aroma",
            desc: "Delivers a distinctive fragrance and flavor.",
          },
          {
            title: "Traditional Recipe",
            desc: "Prepared using authentic Andhra methods.",
          },
          {
            title: "Easy to Use",
            desc: "Perfect for daily meals and snacks.",
          },
        ],

        howTitle: "How to Use Karivepaku Karam",

        howSections: [
          {
            subtitle: "Rice and Ghee",
            points: ["Mix with hot rice and ghee."],
          },
          {
            subtitle: "Idli and Dosa",
            points: ["Serve as a flavorful accompaniment."],
          },
          {
            subtitle: "Side Dish",
            points: ["Use alongside curries and meals."],
          },
          {
            subtitle: "Snacks",
            points: ["Sprinkle on snacks for extra flavor."],
          },
        ],

        benefits: [
          "Rich curry leaf flavor",
          "Traditional Andhra taste",
          "Easy to incorporate into meals",
          "Naturally prepared",
          "Versatile and convenient",
        ],

        storage: [
          "Store in an airtight container.",
          "Keep in a cool and dry place.",
          "Avoid direct sunlight.",
          "Use a dry spoon.",
        ],

        conclusion: [
          "Enjoy the authentic flavor of curry leaves in every meal with Annapurna Farms Karivepaku Karam.",
          "Bring home the goodness of traditional Andhra cuisine today!",
        ],
      },
    },

    {
      title: "Tamota Powder",
      image: tomato_Karam,
      content: {
        pageTitle: "Tamota Powder: Rich Tomato Flavor for Everyday Cooking",

        intro: [
          "At Annapurna Farms, our Tamota Powder is made from carefully selected tomatoes that are dried and processed to preserve their natural taste and quality.",
          "This convenient ingredient helps you add rich tomato flavor to a variety of dishes throughout the year.",
        ],

        whyTitle: "Why Choose Annapurna Farms Tamota Powder?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made from quality tomatoes without artificial additives.",
          },
          {
            title: "Rich Taste",
            desc: "Delivers concentrated tomato flavor.",
          },
          {
            title: "Convenient",
            desc: "Easy to store and use whenever needed.",
          },
          {
            title: "Versatile",
            desc: "Suitable for a wide range of recipes.",
          },
        ],

        howTitle: "How to Use Tamota Powder",

        howSections: [
          {
            subtitle: "Curries and Gravies",
            points: ["Add for rich tomato flavor."],
          },
          {
            subtitle: "Soups",
            points: ["Mix into soups for enhanced taste."],
          },
          {
            subtitle: "Sauces",
            points: ["Use in homemade sauces and dips."],
          },
          {
            subtitle: "Rice Dishes",
            points: ["Add to pulao and rice preparations."],
          },
        ],

        benefits: [
          "Rich tomato flavor",
          "Convenient and easy to use",
          "Long shelf life",
          "Suitable for many recipes",
          "Made from natural ingredients",
        ],

        storage: [
          "Store in an airtight container.",
          "Keep in a cool and dry place.",
          "Protect from moisture.",
          "Use a dry spoon.",
        ],

        conclusion: [
          "Whether you're preparing curries, soups, or sauces, Annapurna Farms Tamota Powder offers convenience and delicious flavor in every spoonful.",
          "Experience the goodness of tomatoes all year round!",
        ],
      },
    },

    {
      title: "Rose Powder",
      image: rose_powder,
      content: {
        pageTitle: "Rose Powder: Natural Care and Beauty from Rose Petals",

        intro: [
          "At Annapurna Farms, our Rose Powder is made from carefully selected rose petals that are naturally dried and finely ground to preserve their fragrance and quality.",
          "Known for its refreshing aroma and versatility, Rose Powder is a popular choice for skincare and wellness routines.",
        ],

        whyTitle: "Why Choose Annapurna Farms Rose Powder?",
        whyPoints: [
          {
            title: "100% Natural",
            desc: "Made from pure rose petals without additives.",
          },
          {
            title: "Refreshing Fragrance",
            desc: "Provides a naturally pleasant floral aroma.",
          },
          {
            title: "Multi-Purpose Use",
            desc: "Suitable for skincare and wellness applications.",
          },
          {
            title: "Premium Quality",
            desc: "Carefully processed to maintain purity and freshness.",
          },
        ],

        howTitle: "How to Use Rose Powder",

        howSections: [
          {
            subtitle: "Face Packs",
            points: [
              "Mix with rose water or yogurt for a refreshing face pack.",
            ],
          },
          {
            subtitle: "Skin Care",
            points: ["Use in homemade beauty treatments."],
          },
          {
            subtitle: "Bath Care",
            points: ["Add to bath preparations for a soothing experience."],
          },
          {
            subtitle: "Wellness Routines",
            points: ["Incorporate into natural self-care practices."],
          },
        ],

        benefits: [
          "Natural floral fragrance",
          "Suitable for skincare routines",
          "Easy to use",
          "Premium quality ingredients",
          "Refreshing and versatile",
        ],

        storage: [
          "Store in an airtight container.",
          "Keep in a cool and dry place.",
          "Avoid moisture and direct sunlight.",
          "Use a dry spoon.",
        ],

        conclusion: [
          "Add a touch of natural care and freshness to your daily routine with Annapurna Farms Rose Powder.",
          "Experience the timeless goodness of rose petals with Annapurna Farms today!",
        ],
      },
    },
  ];

  const CardsData = [
    {
      id: "1",
      name: "Benefits of Moringa Powder",
      title: "Moringa Powder",
      image: Moringa_powder,
    },
    {
      id: "2",
      name: "Benefits of Podina Karam",
      title: "Podina Karam",
      image: Podina_Karam,
    },
    {
      id: "3",
      name: "Benefits of Tamota Powder",
      title: "Tamota Powder",
      image: tomato_Karam,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(blogData[0]);

  return (
    <div className="blog">
      <div className="blogpage"></div>
      <div className="container py-4 mt-5">
        <div className="row container">
          <div className="col-lg-8 mb-4 order-2 order-lg-1">
            <div className="fw-bold fs-5 mb-3">-Blog</div>
            <section>
              <h6 className="blogpage-h6-title mb-3">
                {selectedProduct.content.pageTitle}
              </h6>
              {selectedProduct.content.intro.map((para, index) => (
                <p key={index} style={{ textAlign: "justify" }}>
                  {para}
                </p>
              ))}
              <h6 className="fw-semibold mt-3 mb-4">
                {selectedProduct.content.whyTitle}
              </h6>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  paddingLeft: "20px",
                }}
              >
                {selectedProduct.content.whyPoints.map((item, i) => (
                  <li key={i}>
                    <strong>{item.title}:</strong> {item.desc}
                  </li>
                ))}
              </ul>

              <h6 className="fw-semibold mt-4 mb-4">
                {selectedProduct.content.howTitle}
              </h6>

              {selectedProduct.content.howSections.map((sec, i) => (
                <div key={i}>
                  <h6 className="fw-semibold mt-3">{sec.subtitle}</h6>
                  <ul>
                    {sec.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <h6 className="fw-semibold mt-4 mb-2">Benefits</h6>
              <ul>
                {selectedProduct.content.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <h6 className="fw-semibold mt-4 mb-2">Storage Instructions</h6>

              <ul>
                {selectedProduct.content.storage.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              {selectedProduct.content.conclusion.map((para, index) => (
                <p key={index} className="mt-3">
                  {para}
                </p>
              ))}
            </section>
          </div>

          <div className="col-lg-4 order-1 order-lg-2">
            <div className="top-img-card mb-3">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="card-img-top img-fluid"
              />
            </div>

            <div className="mb-4">
              <h5 className="mb-3 text-danger">Products</h5>
              <ul className="list-group">
                {blogData.map((product, index) => (
                  <li
                    key={index}
                    className={`list-group-item border-0`}
                    style={{
                      cursor: "pointer",
                      paddingLeft: "0px",
                      fontSize: "15px",
                      color:
                        selectedProduct.title === product.title
                          ? "red"
                          : "black",
                      fontWeight:
                        selectedProduct.title === product.title ? "600" : "500",
                    }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="product-list-blog-social-media-h5 mb-3">
                Share Content
              </h5>
              <div className="">
                <p className="product-list-blog-social-media">Instagram</p>
                <p className="product-list-blog-social-media">Facebook</p>
                <p className="product-list-blog-social-media">Email</p>
                <p className="product-list-blog-social-media">WhatsApp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {CardsData.map((item, index) => (
            <div className="col-md-4" key={index}>
              <img
                src={item.image}
                // className=""
                alt="..."
                className="card-img-top blog-cards-cardsdata"
                // style={{
                //   backgroundColor: "#7be2e5",
                //   borderRadius: "5px",
                //   height: "290px",
                //   marginBottom: "10px",
                // }}
              />
              <div className="text-center" style={{ marginTop: "-20px" }}>
                <span className="cardtxt mb-3">{item.title}</span>
                {/* <h5 className="mt-3 cardtxt-h5-title">{item.name}</h5> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
