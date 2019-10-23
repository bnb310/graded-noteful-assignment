import React from "react";
import ApiContext from "../ApiContext";
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import config from "../config";
import CircleButton from './CircleButton'

class AddFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folderName: 'New Folder'
    }
  }
  
  
  static contextType = ApiContext;

updateFolderName(folderName) {
  this.setState({folderName: {value: folderName}})
}

handleFolderSubmit = e => {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  e.preventDefault();
  const newFolder = {
    id: makeid(8) + '-ffaf-11e8-8eb2-f2801f1b9fd1',
    name: this.state.folderName
  };

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

renderForm () {
  return(
    <>
    <form className="addFolder">
        <label htmlFor="folderName">Name</label>
        <input type="text" id="folderName" onChange = {e => this.updateFolderName(e.target.value)}/>
        <button type="submit"  onClick = {this.handleFolderSubmit}>Add Folder</button>
        </form>
    </>
  )
}

  render() {
    return (
      <ApiContext.Provider>
        <div className="App">
            <nav className="App__nav">
            <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
            </nav>
              <header className="App__header">
                  <h1>
                    <Link to="/">Noteful</Link>{' '}
                    <FontAwesomeIcon icon="check-double" />
                  </h1>
              </header>
            <main className="App__newFolder">{this.renderForm()}</main>
        </div>
        
      </ApiContext.Provider> 
    );
  }
}

AddFolder.propTypes = {
  value: PropTypes.string.isRequired
}

export default AddFolder;
