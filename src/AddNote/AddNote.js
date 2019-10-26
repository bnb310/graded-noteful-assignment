import React from "react";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import config from "../config";
import CircleButton from '../CircleButton/CircleButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Add.css'

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: "New Note",
      contents: "Add New Note Text Here!",
      chosenFolder: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
    };
  }

  static contextType = ApiContext;

  updateNoteName(noteName) {
    this.setState({ noteName: noteName });
  }

  updateContents(contents) {
    this.setState({ contents:  contents });
  }

  updateChosenFolder(chosenFolder) {
    this.setState({ chosenFolder: chosenFolder });
  }

  handleNoteSubmit = e => {
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    e.preventDefault();
    const newNote = {
      id: makeid(8) + "-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: this.state.noteName,
      content: this.state.contents,
      folderId: this.state.chosenFolder,
      modified: "2019-01-04T00:00:00.000Z"
    };

    console.log(newNote)

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(res.push(newNote));
        return res.json();
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    const folders = this.context.folders;

    return (
      <ApiContext.Provider>
        
        <form className="addNote">
          <label htmlFor="noteName">Name</label>
          <input
            type="text"
            id="noteName"
            onChange={e => this.updateNoteName(e.target.value)}
            required
          />
          <label htmlFor="contents">Note Text</label>
          <input
            type="text"
            id="contents"
            onChange={e => this.updateContents(e.target.value)}
          />
          <label htmlFor="folder">Assigned Folder</label>
          <select
            id="chosenFolder"
            onChange={e => this.updateChosenFolder(e.target.value)}
          >
            {folders.map(choice => (
              <option value = {choice.id}>{choice.name}</option>
            ))}
            ;
          </select>
          <button type="submit" onClick={this.handleNoteSubmit} className="addSubmit">
            Add Note
          </button>
        </form>

        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='Add__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
      </ApiContext.Provider>
    );
  }
}

AddNote.propTypes = {
  noteName: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
};

export default AddNote;
