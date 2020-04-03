import React from "react";
import moment from "moment";
import "moment/locale/ru";
import "./Messages.css";

const Messages = ({ username, isMymessage, date, message }) => {

  moment.locale("ru");
  date = moment(date).calendar();

  return (
    <div className={isMymessage ? "col-10 col-md-7 ml-auto" : "col-10 col-md-7 mr-auto"}>
      <div className={isMymessage ? "Toast myMessage" : "Toast"}>
        <div className="toast-header">
          <strong className="mr-auto">{username}</strong>
          <small>{date.toLocaleString()}</small>
        </div>
        <div className="toast-body d-flex flex-column">
          <span className="w-100">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
