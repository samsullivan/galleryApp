import React from 'react';
import ReactModal from 'react-modal';

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
    this.state = {selectedImage: null};

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        {this.props.images.map((image) =>
          <Thumbnail selectImage={this.openModal} image={image} key={image.id} />
        )}
        <ReactModal
          isOpen={!!this.state.selectedImage}
          onRequestClose={this.closeModal}
          contentLabel="Image"
        >
          <FullImage image={this.state.selectedImage} />
        </ReactModal>
      </div>
    );
  }
}

export default Gallery;
