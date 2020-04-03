import React, { Component, Fragment } from "react";
import Button from "../UI/Button/Button";
import Picker from "emoji-picker-react";
import { MdSend } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import "./SendMessageForm.css";

class SendMessageForm extends Component {
  state = {
    message: "",
  };

  submitFormHandler = e => {
    e.preventDefault();
    const message = {
      type: 'CREATE_MESSAGE',
      message: this.state.message
    };
    this.props.onSubmit(message);
    this.setState({ message: "" });
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  emojiHandler = (e, emoji) => {
    this.setState({ message: this.state.message + emoji.emoji });
  };

  render() {
    const { open } = this.props;

    let addclass = "Picker";
    open && (addclass += " d-block");
    return (
      <Fragment>
        <div className={addclass}>
          <Picker onEmojiClick={this.emojiHandler} />
        </div>
        <form onSubmit={this.submitFormHandler}>
          <div className="input-group align-items-center">
            <div className="mx-2 icons">
              <Button
                type="button"
                addClass="close"
                label={
                  <FaRegSmile style={{ fontSize: "40px", opacity: "0.5" }} />
                }
                click={this.props.emojiSwitcher}
              />
            </div>
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="message"
              className="form-control"
              style={{
                borderRadius: "1.25em",
                height: "45px"
              }}
              value={this.state.message}
              placeholder=" Message"
              required
            />
            <div className="mx-2 send">
              <Button
                type="submit"
                addClass="close"
                label={<MdSend style={{ fontSize: "40px", opacity: "0.5" }} />}
              />
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default (SendMessageForm);
