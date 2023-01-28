import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSortBy } from "../../redux/slices/devices";
import { SORT_OPTIONS } from "./constants";
import searchImg from "../../assets/search.svg";
import { SORT_TYPES } from "../../redux/slices/devices/interfaces";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.devicesSlice);

  const handleOnSortChange = ({ target }: SelectChangeEvent<unknown>) =>
    dispatch(setSortBy(target.value as SORT_TYPES));

  return (
    <Box sx={{ marginTop: "30px" }}>
      <TextField
        placeholder="Search"
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
      />
      {/* <Select
        sx={{
          minWidth: "155px",
          marginLeft: "8px",
          fieldset: {
            border: "1px solid #D1D0D9",
            borderRadius: "4px",
          },
        }}
      >
        <MenuItem value="all">Device Type: ALL</MenuItem>
      </Select> */}

      <Select
        sx={{
          marginLeft: "8px",
          fieldset: {
            border: "1px solid #D1D0D9",
            borderRadius: "4px",
          },
        }}
        renderValue={(selectedOption) =>
          `Sort by: ${
            SORT_OPTIONS.find((option) => option.key === selectedOption)?.value
          }`
        }
        value={sortBy}
        onChange={handleOnSortChange}
      >
        {SORT_OPTIONS.map(({ key, value }) => (
          <MenuItem value={key} key={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
