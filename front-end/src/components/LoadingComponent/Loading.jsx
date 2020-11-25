import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <img
        className="loading__img"
        src="https://trello-attachments.s3.amazonaws.com/5f7f173f3f927d440950a925/5fbe91ca731763484cbf700b/6e21907e5f5496277fd591a98a7b71d1/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif"
        alt="loading"
      />
      <p className="loading__text">Loading...</p>
    </div>
  );
}

export default Loading;
