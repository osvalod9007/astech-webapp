import React from "react";
import { Typography, Divider } from "@material-ui/core";

function TitlePage({ title, subtitle }) {
  return (
    <div className="title-page">
      <Typography className="title-page-title" variant="h5">
        {title}
      </Typography>
      <Divider className="title-page-divider" />
      <div className="title-page-subtitle">{subtitle}</div>
    </div>
  );
}

export default TitlePage;
