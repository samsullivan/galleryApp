import React from 'react';
import ReactModal from 'react-modal';
import jsonFetch from 'json-fetch';
import './Gallery.sass';

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
      <div className="Thumbnail">
        <a onClick={this.handleClick}>
          <img src={this.props.image.thumbnailUrl} alt={this.props.image.name} />
        </a>
      </div>
    );
  }
}

class DescriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.description || ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.updateDescription(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Save" />
      </form>
    );
  }
}

class FullImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: localStorage.getItem(this.descriptionKey()) || '',
      editingDescription: false
    };

    this.editDescription = this.editDescription.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  descriptionKey() {
    return 'imageDescription-' + this.props.image.id;
  }

  editDescription() {
    this.setState({editingDescription: true});
  }

  updateDescription(description) {
    localStorage.setItem(this.descriptionKey(), description);
    this.setState({
      description: description,
      editingDescription: false
    });
  }

  render() {
    return (
      <div className="FullImage">
        <h1>{this.props.image.title}</h1>

        {this.state.description && !this.state.editingDescription && <p>{this.state.description}</p>}
        {this.state.editingDescription
          ? <DescriptionForm description={this.state.description} updateDescription={this.updateDescription} />
          : <a onClick={this.editDescription}>{this.state.description ? 'Edit' : 'Add'} Description</a>
        }

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
