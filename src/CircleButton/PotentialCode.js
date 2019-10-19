import React from "react";
import ApiContext from "../ApiContext";

class AddFolder extends React.Component {
  static contextType = ApiContext;

//  handleFolderSubmit() {
//    event.preventDefault();
//    previousState = {this.props.state.folders};
//    newFolder = {folderName}
//    this.setState({folders: previousState.push(newFolder)})
//  }

  render() {
    return (
      <ApiContext.Provider>
        <form className="addFolder">
        <label htmlFor="folderName">Name</label>
        <input type="text" id="folderName" />
        <button type="submit">Add Folder</button>
        </form>
      </ApiContext.Provider> 
    );
  }
}

export default AddFolder;
