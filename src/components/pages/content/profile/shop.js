import React, { memo } from "react";
import { Box, Typography, FormHelperText } from "@material-ui/core";

function Shop({ shop, phone }) {
  return (
    <div className="shop">
      <Box paddingX={3}>
        <Typography className="text-color-green" variant="h6">
          {shop.name || "-"}
        </Typography>
        <div className="shop-content">
        <FormHelperText>Role</FormHelperText>
        <Typography>{shop.roles[0]?.name}</Typography>
        <FormHelperText>Address</FormHelperText>
        <Typography>{`${shop?.line1} ${shop?.line2} ${shop?.line3}`}</Typography>
        <FormHelperText>City State Zip</FormHelperText>
        <Typography>{`${shop?.city} ${shop?.state} ${shop?.postcode}`}</Typography>
        <FormHelperText>Phone</FormHelperText>
        <Typography>{phone}</Typography>
        <FormHelperText>Date Joined</FormHelperText>
        <Typography>
          {new Date(shop.forwarded_invitation).toDateString()}
        </Typography>
        </div>
      </Box>
    </div>
  );
}

export default memo(Shop);
