import React, { Component } from "react";
import { connect } from "react-redux";
import ReconnectingWebSocket from 'reconnecting-websocket';
import SendMessageForm from "../../components/SendMessageForm/SendMessageForm";
import Messages from "../../components/Messages/Messages";
import Modal from "../../components/UI/Modal/Modal";
import NavBar from "../../components/UI/NavBar/NavBar";

import "./Chat.css";


class Chat extends Component {

  state = {
    messages: [],
    connectedUsers: [],
    error: null,
    loading: false,
    show: false,
    open: false
  };

  componentDidMount() {
    if (this.props.user) {
      this.websocket = new ReconnectingWebSocket(`ws://localhost:8000/messages?Token=${this.props.user.token}`);

      this.websocket.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);

          switch (data.type) {
            case 'NEW_MESSAGE':
              this.setState({messages: [...this.state.messages, data._doc]})
              break;
            case 'LAST_MESSAGES':
              this.setState({messages: data.messages});
              break;
            case 'CONNECTED_USERS':
              this.setState({connectedUsers: data.users});
              break;
            case 'AUTHENTICATION_ERROR':
              this.setState({error: data.error, show: !this.state.show});
              break;
            default: 
              console.log('default')
          }

          this.scrollToBottom()

        } catch (e) {
          console.log('Something went wrong', e);
        }
      }
    };
  };

  componentWillUnmount() {
    this.websocket.close();
  };

  sendMessage = (message) => {
    this.websocket.send(JSON.stringify(message));
    this.setState({open: false});
  };

  scrollToBottom = () => {
    this.el.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  render = () => {
    return (
      <div className="backWrap">
        {this.state.error && <Modal show={this.state.show}  error={this.state.error} />}
        <div className="wrap">
          <div className='header'>
            <NavBar/>
          </div>
          <div className={this.state.open ? 'middleWrap emoji-open': 'middleWrap'}>
            <div className='user-list'>
              <ul className='m-0 p-0' style={{listStyle: 'none'}}>
                {this.state.connectedUsers.map(el => (
                  <li className="user-list-item" key={el}>{el}</li>
                ))}
              </ul>
            </div>
            <div className="messageWrap">
              {this.state.messages.map(el => (
                <Messages
                  key={el._id}
                  username={el.user.username}
                  isMymessage={this.props.user.username === el.user.username}
                  date={el.datetime}
                  message={el.message}
                />
              ))}
              <div ref={el => {this.el = el}}/>
            </div>
          </div>
          <div className="formWrap">
            <SendMessageForm 
              onSubmit={this.sendMessage} 
              emojiSwitcher={() => this.setState({open: !this.state.open})} 
              open={this.state.open}
            />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  user: state.users.user,
});


export default connect(mapStateToProps)(Chat);
