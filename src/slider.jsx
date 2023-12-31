import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./slider.css";
const Slider = ({ url, page = 1, limit = 10 }) => {
  const [Images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [CurrentImage, setCurrentImage] = useState(0);
  const [Error, setError] = useState(null);
  async function loadImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data) setImages(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log(Error);
    }
  }
  useEffect(() => {
    if (url !== "") loadImages(url);
  }, [url]);
  console.log(Images);
  if (Loading) {
    return <div>data is Loading!!!</div>;
  }

  if (Error !== null) {
    return <div>Error</div>;
  }
  function handleLeftClick() {
    setCurrentImage(CurrentImage === 0 ? Images.length - 1 : CurrentImage - 1);
  }
  function handleRightClick() {
    setCurrentImage(CurrentImage === Images.length - 1 ? 0 : CurrentImage + 1);
  }
  return (
    <div className="container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={() => handleLeftClick()}
      />
      {Images && Images.length
        ? Images.map((pic, Index) => {
            return (
              <img
                key={pic.id}
                src={pic.download_url}
                alt={pic.download_url}
                className={
                  Index === CurrentImage
                    ? "Current-image"
                    : "Current-image image-inactive"
                }
              />
            );
          })
        : null}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={() => handleRightClick()}
      />
      <span className="Circle-indicator">
        {Images && Images.length
          ? Images.map((pic, Index) => {
              return (
                <button
                  key={Index}
                  className={
                    Index === CurrentImage
                      ? "Current-indicator"
                      : "Current-indicator Indicator-inactive"
                  }
                  onClick={() => setCurrentImage(Index)}
                ></button>
              );
            })
          : null}
      </span>
    </div>
  );
};

export default Slider;
