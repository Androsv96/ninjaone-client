import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";

import searchImg from "../../assets/search.svg";
import { useAppDispatch } from "../../redux/hooks";
import { setSearchCriteria } from "../../redux/slices/devices";
import { useState, useEffect } from "react";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchFor, setSearchFor] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchFor(e.target.value);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      dispatch(setSearchCriteria(searchFor));
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchFor, dispatch]);

  return (
    <TextField
      placeholder="Search"
      value={searchFor}
      sx={{
        width: "270px",
        fieldset: {
          border: "1px solid #D1D0D9",
          borderRadius: "4px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ border: "none" }}>
            <Icon>
              <img src={searchImg} alt="searchImg" />
            </Icon>
          </InputAdornment>
        ),
      }}
      onChange={handleOnChange}
    />
  );
};
