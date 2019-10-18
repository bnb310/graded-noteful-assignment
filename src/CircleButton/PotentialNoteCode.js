import React from "react";
import ApiContext from "../ApiContext";

class AddNote extends React.Component {
  render() {
    return (
      <ApiContext.Provider>
        <form className="addNote">
          <label htmlFor="noteName">Name</label>
          <input type="text" id="noteName" required />
          <label htmlFor="contents">Note Text</label>
          <input type="text" id="contents" />
          <label htmlFor="folder">Assigned Folder</label>
          <select>
            <option>Important</option>
            <option>Super</option>
            <option>Spangley</option>
          </select>
          <button type="submit">Add Note</button>
        </form>
      </ApiContext.Provider>
    );
  }
}

export default AddNote;
