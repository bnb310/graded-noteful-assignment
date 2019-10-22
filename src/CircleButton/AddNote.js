import React from "react";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import config from "../config";

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: " ",
      contents: " ",
      chosenFolder: " "
    };
  }

  static contextType = ApiContext;

  updateNoteName(noteName) {
    this.setState({ noteName: { value: noteName } });
  }

  updateContents(contents) {
    this.setState({ contents: { value: contents } });
  }

  updateChosenFolder(chosenFolder) {
    this.setState({ chosenFolder: { value: chosenFolder } });
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
      contents: this.state.contents,
      chosenFolder: this.state.chosenFolder
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(res.push(newNote));
        return res.json();
      })
      .then(() => {
        this.context.addNote();
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
              <option>{choice}</option>
            ))}
            ;
          </select>
          <button type="submit" onClick={this.handleNoteSubmit}>
            Add Note
          </button>
        </form>
      </ApiContext.Provider>
    );
  }
}

AddNote.propTypes = {
  noteName: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  folder: PropTypes.oneOf(this.context.folders)
};

export default AddNote;
