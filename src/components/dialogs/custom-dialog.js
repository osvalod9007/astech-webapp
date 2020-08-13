import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { ReactComponent as CloseIcon } from "../../assets/img/closex.svg";

const CustomDialog = ({ width=600, open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
      className: "custom-dialog"
    }}>
      <DialogContent className="custom-dialog-container">
        <div className="close">
          <CloseIcon className="icon-size" onClick={onClose} />
        </div>
        <div className="dialog-text">
         {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
