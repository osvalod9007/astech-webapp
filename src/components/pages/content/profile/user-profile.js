import React, { useContext, useRef, useEffect, useState } from "react";
import { Grid, Typography, Container, Box } from "@material-ui/core";
import TitlePage from "../../../atoms/title-page";
import authContext from "../../../../context/auth/authContext";
import FormUserInformation from "../../../forms/user-information/form-user-information";
import { fetchRoles } from "../../../../context/users/userActions";
import profileFormValidation from "./profileFormValidation";
import ProfileRelatedShops from "./related-shops";

function UserProfile() {
  const { user: userAuth, saveDataProfile } = useContext(authContext);
  const [optionsRoles, setOptionsRoles] = useState([]);
  const [errorsForm, setErrorsForm] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const mounted = useRef(true);
  const formRef = useRef();

  useEffect(() => {
    mounted.current = true;
    fetchRoles().then((roles) => {
      const filtered = roles.data.results.filter((role) => {
        if (userAuth.isAdmin) {
          return role.name !== "In-Shop";
        } else {
          return true
        }
      });
      if (mounted.current) {
        setOptionsRoles(filtered);
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [userAuth]);

  const onSubmit = async (values) => {
    const errors = profileFormValidation(values);
    if(Object.keys(errors).length){
        setErrorsForm(errors)   
    }else{
        setSubmitting(true)
        await saveDataProfile(values);
        setErrorsForm({})
        setSubmitting(false)
    }
  };

  return (
    <div className="user-profile">
      <Container maxWidth={"md"} component={Box} marginTop="16px" >
        <TitlePage title="Profile" />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography className="text-color-green" variant="h6">
              User Information
            </Typography>
            <FormUserInformation
              submitting={submitting}
              ref={formRef}
              errors={errorsForm}
              userInformation={userAuth}
              onSubmit={onSubmit}
              optionsRoles={optionsRoles}
              type="from-user-profile"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProfileRelatedShops relatedShops={userAuth?.organizations} phone={userAuth?.phone_number} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserProfile;
