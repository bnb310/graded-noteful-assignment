import React from "react";
import ApiContext from "../ApiContext";
import PropTypes from 'prop-types'

class AddNote extends React.Component {
  render() {
    const folders = this.context.folders;

    return (
      <ApiContext.Provider>
        <form className="addNote">
          <label htmlFor="noteName">Name</label>
          <input type="text" id="noteName" required />
          <label htmlFor="contents">Note Text</label>
          <input type="text" id="contents" />
          <label htmlFor="folder">Assigned Folder</label>
          <select>
            {folders.map(choice => <option>{choice}</option>)};
          </select>
          <button type="submit">Add Note</button>
        </form>
      </ApiContext.Provider>
    );
  }
}

AddFolder.propTypes = {
  noteName: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  folder: PropTypes.oneOf(this.context.folders)
}

export default AddNote;
