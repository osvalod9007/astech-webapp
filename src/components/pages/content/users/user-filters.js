import React, { memo, useState, useEffect, useMemo } from "react";
import {
  TextField,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import useDebounceCustom from "../../../../helper/text-debounce-custom";

function UsersFilters({ searches, setSearches, optionsRoles }) {
  const [text, setText] = useState("");
  const debouncedText = useDebounceCustom(text, 500);
  const filterNameMemoize = useMemo(() => debouncedText, [debouncedText]);

  useEffect(() => {
    setSearches({
      ...(!!filterNameMemoize ? { search: filterNameMemoize } : {}),
    });
  }, [filterNameMemoize, setSearches]);

  const handleTextChange = (event) => {
    setText(event?.target?.value);
  };

  const handleRoleChange = (event) => {
    setSearches({ role: event?.target?.value });
  };

  return (
    <div className="user-list-filters">
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <FormControl className="form-control">
            <TextField
              variant="outlined"
              size="small"
              type="search"
              InputProps={{
                className: "user-list-search-text",
                startAdornment: <SearchIcon />,
              }}
              value={text}
              onChange={handleTextChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl size="medium" className="form-control">
            <Select
              displayEmpty
              value={searches?.role || ""}
              onChange={handleRoleChange}
            >
              <MenuItem value="">All</MenuItem>
              {optionsRoles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(UsersFilters);
