import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

const Modal = props => {
  return (
    <Fragment>
      <div
        className="modal"
        style={{
          display: props.show ? "block" : "none",
          width: "48%",
          height: "25%",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Error
              </h5>
              <Button addClass="close" label="x" click={props.close} />
            </div>
            <div className="modal-body">
              <p>
                {props.error}
              </p>
            </div>
            <div className="modal-footer">
              <Button addClass="secondary" label="Close" click={props.close} />
            </div>
          </div>
        </div>
      </div>
      <Backdrop show={props.show} onClick={props.close} />
    </Fragment>
  );
};

export default Modal;
