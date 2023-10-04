import React, { Component } from "react";
import { InboxHtml } from "../Elements/InboxHtml";
import ModalCompose from "../Elements/ModalCompose";
import ModalMessage from "../Elements/ModalMessage";
import messages from "../../data/messages.json";

class All extends Component {
  constructor(props) {
    super(props);

    this.markRead = this.markRead.bind(this);
    this.doShow = this.doShow.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.toggleMark = this.toggleMark.bind(this);
    this.toggleMarkAll = this.toggleMarkAll.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.ModalMessage = React.createRef();
    this.ModalCompose = React.createRef();
    this.state = {
      initMessages: messages,
      messages: messages,
      selected: {},
      deleted: [],
    };
  }

  markRead(idx) {
    /* mark this message as read */
    let messages = [...this.state.messages];
    messages[idx].read = true;
    this.setState({ messages });
  }

  doShow(idx) {
    this.markRead(idx);
    this.setState({
      selected: messages[idx],
    });
    /* open message in modal */
    this.ModalMessage.current.show();
  }

  doCompose() {
    /* open compose modal */
    this.ModalCompose.current.show();
  }

  toggleMark(idx) {
    let messages = [...this.state.messages];
    messages[idx].marked = messages[idx].marked ? 0 : 1;
    this.setState({ messages });
  }

  doDelete(idx) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    /* append it to deleted */
    deleted.push(messages[idx]);
    /* remove the message at idx */
    messages.splice(idx, 1);
    this.setState({ messages, deleted });
  }

  toggleMarkAll() {
    let messages = [...this.state.messages];
    messages.map((v, k) => {
      return (v.marked = v.marked ? 0 : 1);
    });
    this.setState({ messages });
  }

  deleteMarked() {
    var self = this;
    let messages = [...this.state.messages];
    var tbd = [];
    for (var k = 0; k < messages.length; k++) {
      if (messages[k].marked === 1) {
        tbd.push(k);
      }
    }

    if (tbd.length > 0) {
      self.deleteMessages(tbd);
    }
  }

  refreshMessages() {
    let initMessages = [...this.state.initMessages];
    this.setState({ messages: initMessages });
  }

  deleteMessages(arr) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    for (var i = arr.length - 1; i >= 0; i--) {
      deleted.push(messages[i]);
      messages.splice(arr[i], 1);
    }
    this.setState({ messages, deleted });
  }
  render() {
    return (
      <>
      
        <div className="">
          <div
            className="container"
            style={{ width: "70%", marginRight: "0.3px" }}
          >
            <div
              className=""
              style={{ width: "100%", marginTop: "5rem", marginBottom: "1rem" }}
            >
              <InboxHtml parent={this} />
              <ModalCompose sendTo={this.state.selected.fromAddress} />
              <ModalMessage
                ref={this.ModalMessage}
                message={this.state.selected}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default All;
