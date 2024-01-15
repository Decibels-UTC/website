import React from 'react';
import { Link } from 'react-scroll';

const VideoComponent = (props) => {
  return (
    <div>
      <video width={props.width} height={props.height} autoPlay loop muted>
        <source src={props.src} type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      {/* Other content */}
    </div>
  );
};

export default VideoComponent;
