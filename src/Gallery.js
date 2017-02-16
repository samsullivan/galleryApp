import React from 'react';

class Thumbnail extends React.Component {
  render() {
    let image = this.props.image;

    return (
      <img src={image.thumbnailUrl} alt={image.name} />
    );
  }
}


class Gallery extends React.Component {
  render() {
    let images = this.props.images;
    
    return (
      <div className="Gallery">
        {images.map((image) => <Thumbnail image={image} key={image.id} />)}
      </div>
    );
  }
}

export default Gallery;
