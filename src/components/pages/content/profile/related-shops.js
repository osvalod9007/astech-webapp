import React from "react";
import { List, ListItem, Typography, Box } from "@material-ui/core";
import Shop from "./shop";
import { sortByString } from "../../../../helper/basicFunctions";

function ProfileRelatedShops({ relatedShops = [], phone }) {
  return (
    <div className="related-shops">
        <Typography className="text-color-green" variant="h6" component={Box} paddingX={5}>Related Shops</Typography>
      <List>
        {relatedShops.sort((a,b) => sortByString(a.name, b.name)).map((shop) => (
          <ListItem key={shop.id} divider>
            <Shop shop={shop} phone={phone} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ProfileRelatedShops;
