import React from "react";
import {Redirect} from 'react-router-dom';
import ApiContext from "../ApiContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import config from "../config";
import CircleButton from '../CircleButton/CircleButton'
import '../AddNote/Add.css'

class AddFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folderName: 'New Folder',
      redirect: false
    }
  }
  
  
  static contextType = ApiContext;

updateFolderName(folderName) {
  this.setState({folderName: folderName});
  console.log(this.state.folderName)
}

formSubmitRedirect() {
  this.setState({redirect: true});
  this.renderRedirect();
}

renderRedirect = () => {
  if (this.state.redirect) {
    return <Redirect to='/' />; 
  } 
}

handleFolderSubmit = e => {

  e.preventDefault();
  const newFolder = {
    name: this.state.folderName
    
  };

  console.log(newFolder)

  fetch(`${config.API_ENDPOINT}/folders`, {
    method: "POST",
    body: JSON.stringify(newFolder),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e));
      return res.json();
    })
    .then((newFolder) => {
      this.context.addFolder(newFolder);
      this.formSubmitRedirect();
    })
    .catch(error => {
      console.error({ error });
    });
};

  render() {
    return (

        <div className="App">
        {this.renderRedirect()}
        <form className="addFolder">
        <label htmlFor="folderName">Name</label>
        <input type="text" id="folderName" onChange = {e => this.updateFolderName(e.target.value)} />
        <button type="submit"  onClick = {this.handleFolderSubmit} className="addSubmit">Add Folder</button>
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
        </div>
        
    );
  }
}



export default AddFolder;
