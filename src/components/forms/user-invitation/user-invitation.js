import React from "react";
import UserInvitationOnDialog from "./user-invitation-on-dialog";
import CustomDialog from "../../dialogs/custom-dialog";
import UserInvitationForm from "./user-invitation-form";

function UserInvitation({
  bulkDialog,
  closeBulkDialog,
  submitInvitation,
  optionsRoles=[]
}) {
  return (
    <>
      {bulkDialog && (
        <CustomDialog
          width={400}
          open={bulkDialog}
          onClose={closeBulkDialog.bind(this, false)}
        >
          <UserInvitationOnDialog
            handleSubmit={submitInvitation}
            optionsRoles={optionsRoles}
          />
        </CustomDialog>
      )}
      <UserInvitationForm
        optionsRoles={optionsRoles}
        submitInvitation={submitInvitation}
      />
    </>
  );
}

export default UserInvitation;
