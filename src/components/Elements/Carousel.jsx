import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Assets
import Featured1 from "../../assets/img/people/1.jpg";
import Featured2 from "../../assets/img/people/2.jpg";
import Featured3 from "../../assets/img/people/3.jpg";
import Featured4 from "../../assets/img/people/4.jpg";
import Featured5 from "../../assets/img/people/5.jpg";
import Featured6 from "../../assets/img/people/6.jpg";
import Featured7 from "../../assets/img/people/7.jpg";
import Featured8 from "../../assets/img/people/8.jpg";

export default function Carousel() {
  const settings = {
    infinite: true,
    speed: 8000,
    rows: 2,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    easing: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured1} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured2} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured3} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured4} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured5} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured6} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured7} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured8} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured3} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured1} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured2} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured4} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured5} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured3} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured7} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured5} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured6} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured1} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured8} alt="featured" />
        </div>
        <div className="flexCenter">
          <ImgStyle className="radius8 shadow" src={Featured5} alt="featured" />
        </div>
      </Slider>
    </div>
  );
}

const ImgStyle = styled.img`
  width: 80%;
  height: 30%;
  padding: 3%;
`;
