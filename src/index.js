import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// https://learn.skillcrush.com/module-8/working-with-user-input/

class Chalkboard extends Component {
  // set initial state
  state = {
    chalk: "",
    notes: []
  }
  // event handler to update the Chalkboard class component's state
  // as a user types, the text can be seen on the "Chalkboard"
  updateChalk = event => {
    // interrogate the event to update our state (interrogating an event means retrieving information about an event object)
    // setState method causes the chalkboard part of the UI to re-render showing the new value
    // updates the chalk state with whatever text a user typed into the text field
    this.setState({ chalk: event.target.value });
  };
  // this event handler is called when the form is submitted
  // when a user clicks "submit", the note is added to the list of notes
  updateNotes = event => {
    /* submit events cause the browser to refresh the page by 
    default. We don't want that, so we prevent it by calling
    this method on the submit event object: */
    event.preventDefault();
    // start by making a copy of the current notes array
    // ?do we copy the array similar to Python so as not to corrupt the original array?
    var newNotes = this.state.notes.slice();
    // add the current chalk message to our copy of the notes array
    newNotes.push(this.state.chalk);
    // update state and rerender with an empty input field
    this.setState({
      chalk: "",
      notes: newNotes
    });
  };
  render() {
    // map over notes array, creating an li for each note
    // this is a callback function declared inline
    var notes = this.state.notes.map(note => <li>{note}</li>);
    return (
      <div className="App">
        {/* event listener passes to the updateNotes event handler the JS object when the user submits teh form */}
        <form onSubmit={this.updateNotes}>
          <input
            type="text"
            placeholder="type here"
            // value is for the state of chalk in the Clalkboard class component
            value={this.state.chalk}
            // event listener passes to the updateChalk event handler the JS object when the user inputs 
            onChange={this.updateChalk}
          />
          <input type="submit" />
        </form>
        <div className="board">
          {/* rendering the current state of chalk in the Clalkboard class component */}
          <h1 className="chalk">{this.state.chalk}</h1>
        </div>
        {/* rendering the notes that were mapped over */}
        <ul className="notes">{notes}</ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Chalkboard />, rootElement);
