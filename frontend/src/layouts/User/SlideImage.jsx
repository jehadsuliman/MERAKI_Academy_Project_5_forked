import React from "react";
import Carousel from "react-bootstrap/Carousel";

const SlideImage = () => {
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        height: "400px",
        cursor: "pointer",
        marginTop: "63px",
        width: "100%",
      }}
    >
      <img
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/08/df/1720409776023f0dc0cf588b9e38904c9970047217.webp"
        alt="image"
        style={{ height: "430px", width: "475px" }}
      />
      <Carousel data-bs-theme="dark" style={{ height: "400px", width: "100%" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.ltwebstatic.com/images3_ccc/2023/08/22/64/169266935314900c7a236b57a699ad2422ef813c25_thumbnail_2000x.webp"
            alt="First slide"
            style={{ height: "415px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.ltwebstatic.com/images3_ccc/2024/08/05/a0/17228248837a7f89655701d4014d6544b30e346273_thumbnail_2000x.webp"
            alt="Second slide"
            style={{ height: "415px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.ltwebstatic.com/images3_ccc/2024/08/02/32/1722593985f8e56d2d44da10855c9aaaaa548adc22_thumbnail_2000x.webp"
            style={{ height: "415px" }}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <img
        src="https://img.ltwebstatic.com/images3_ccc/2024/08/05/32/17228279985e85eed426b5fbc6424d35e42b8e5be1.webp"
        alt="image"
        style={{ height: "430px", width: "475px" }}
      />
    </div>
  );
};

export default SlideImage;
