import React from "react";
import ApiContext from "../ApiContext";
import PropTypes from 'prop-types'

class AddFolder extends React.Component {
  
  static contextType = ApiContext;

//  handleFolderSubmit() {
//    event.preventDefault();
//    previousState = {this.props.state.folders};
//    newFolder = {folderName}
//    this.setState({folders: previousState.push(newFolder)})
//  }

handleFolderSubmit = e => {
  e.preventDefault();
  const newFolder = folderName.value;

  fetch(`${config.API_ENDPOINT}/folders`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) return res.json().then(res.push(newFolder));
      return res.json();
    })
    .then(() => {
      this.context.AddFolder();
    })
    .catch(error => {
      console.error({ error });
    });
};

  render() {
    return (
      <ApiContext.Provider>
        <form className="addFolder">
        <label htmlFor="folderName">Name</label>
        <input type="text" id="folderName" />
        <button type="submit" onClick = {this.handleFolderSubmit}>Add Folder</button>
        </form>
      </ApiContext.Provider> 
    );
  }
}

AddFolder.propTypes = {
  value: PropTypes.string.isRequired
}

export default AddFolder;
