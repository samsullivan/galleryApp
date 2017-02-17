import React from 'react';
import ReactModal from 'react-modal';
import jsonFetch from 'json-fetch'

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedImage: null};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectImage(this.props.image);
  }

  render() {
    return (
      <a onClick={this.handleClick}>
        <img src={this.props.image.thumbnailUrl} alt={this.props.image.name} />
      </a>
    );
  }
}

class FullImage extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.image.title}</h1>
        <img src={this.props.image.url} alt={this.props.image.name} />
      </div>
    );
  }
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    jsonFetch('https://jsonplaceholder.typicode.com/photos').then(response => {
      this.setState({images: response.body.splice(0, 25)});
    });
  }

  openModal(image) {
    this.setState({selectedImage: image});
  }

  closeModal() {
    this.setState({selectedImage: null});
  }

  render() {
    return (
      <div className="Gallery">
        {this.state.images.map((image) =>
          <Thumbnail selectImage={this.openModal} image={image} key={image.id} />
        )}
        <ReactModal
          isOpen={!!this.state.selectedImage}
          onRequestClose={this.closeModal}
          contentLabel="Image"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              top: '25px',
              right: 'auto',
              bottom: 'auto',
              left: '50%',
              width: '600px',
              marginLeft: '-320px'
            }
          }}
        >
          <FullImage image={this.state.selectedImage} />
        </ReactModal>
      </div>
    );
  }
}

export default Gallery;
