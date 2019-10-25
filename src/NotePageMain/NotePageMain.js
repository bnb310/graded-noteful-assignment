import React from "react";
import Note from "../Note/Note";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    console.log(note);
    if (note.id == null) return null;
    return (
      <ApiContext.Provider>
        <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
      </ApiContext.Provider>
        

      
    );
  }
}

export default NotePageMain;
