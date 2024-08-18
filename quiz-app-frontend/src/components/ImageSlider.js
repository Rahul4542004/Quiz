import React from "react";
import { useNavigate } from "react-router-dom";
import "./ImageSlider.css";

const images = [
  { src: "dbms1.jpg", link: "/page1" },
  { src: "os2.jpg", link: "/page2" },
  { src: "cns2.jpg", link: "/page3" },
  { src: "oop.jpg", link: "/page4" },
];

function ImageSlider() {
  const navigate = useNavigate();

  const moveSlider = (direction) => {
    const sliderList = document.querySelector(".slider .list");
    const sliderItems = sliderList.querySelectorAll(".item");

    if (direction === "next") {
      sliderList.appendChild(sliderItems[0]);
    } else {
      sliderList.prepend(sliderItems[sliderItems.length - 1]);
    }
  };

  return (
    <div className="slider">
      <div className="arrowButtons">
        <button className="prev" onClick={() => moveSlider("prev")}>
          {"<"}
        </button>
        <button className="next" onClick={() => moveSlider("next")}>
          {">"}
        </button>
      </div>
      <div className="list">
        {images.map((image, index) => (
          <div className="item" key={index}>
            <img src={image.src} alt={`Slide ${index + 1}`} />
            <div className="content">
              <div className="button">
                <button onClick={() => {
                  if(image.src === 'dbms1.jpg')
                    navigate(`/test/${"dbms"}`)
                  else if(image.src === 'os2.jpg')
                    navigate(`/test/${"os"}`);
                  else if(image.src === "cns2.jpg")
                    navigate(`/test/${"cns"}`);
                  else
                    navigate(`/test/${"oops"}`)
                }} >TAKE A TEST</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
