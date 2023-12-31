import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Slider from './slider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='title'><h1>Image Slider 😁</h1></div>
    <Slider url={'https://picsum.photos/v2/list'} page={'1'} limit={'10'} />
  </React.StrictMode>
);

