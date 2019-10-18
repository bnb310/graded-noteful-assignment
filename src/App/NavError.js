import React from "react";

class NavError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return false;
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Oh no! We can't find your folders! Please try again later.</h2>
      );
    }
    return this.props.children;
  }
}

export default NavError;
