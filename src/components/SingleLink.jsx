import React, { Component } from 'react';

export default class SingleLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: props.lnk,
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendChangesUpwards = this.sendChangesUpwards.bind(this);
  }

  handleChange(evt) {
    this.setState({ link: evt.target.value });
  }

  sendChangesUpwards(evt) {
    this.setState({ link: evt.target.value });
    this.props.cb(this.props.idx, this.state.link);
  }

  render() {
    return (
      <div className="SingleLink flex items-center">
        <input
          type="url"
          className="formFieldInput"
          placeholder={`Enter Link e.g. https://anchor.fm/apvamatch${this.props.idx}`}
          name={`link${this.props.idx}`}
          value={this.state.link}
          onChange={this.handleChange}
          onBlur={this.sendChangesUpwards}
        />
        <i
          className="bi bi-trash"
          onClick={() => this.props.del(this.props.idx)}
        />
      </div>
    );
  }
}
