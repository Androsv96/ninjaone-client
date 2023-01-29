import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setFilterBy,
  setRefetchDevices,
  setSortBy,
} from "../../redux/slices/devices";
import {
  FILTER_TYPES,
  SORT_TYPES,
} from "../../redux/slices/devices/interfaces";
import { FILTERS_OPTIONS, SORT_OPTIONS } from "./constants";
import searchImg from "../../assets/search.svg";
import reloadImg from "../../assets/reload.svg";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { sortBy, filterBy } = useAppSelector((state) => state.devicesSlice);

  const handleOnSortChange = ({ target }: SelectChangeEvent<unknown>) =>
    dispatch(setSortBy(target.value as SORT_TYPES));

  const handleOnChangeFilter = ({ target }: SelectChangeEvent<unknown>) =>
    dispatch(setFilterBy(target.value as FILTER_TYPES));

  const handleOnReload = () => dispatch(setRefetchDevices(true));

  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
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
        <Select
          sx={{
            minWidth: "227px",
            marginLeft: "8px",
            fieldset: {
              border: "1px solid #D1D0D9",
              borderRadius: "4px",
            },
          }}
          renderValue={(selectedOption) =>
            `Device Type: ${
              FILTERS_OPTIONS.find((option) => option.key === selectedOption)
                ?.value
            }`
          }
          value={filterBy}
          onChange={handleOnChangeFilter}
        >
          {FILTERS_OPTIONS.map(({ key, value }) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>

        <Select
          sx={{
            marginLeft: "8px",
            border: "1px solid #D1D0D9",
            borderRadius: "4px",
            minWidth: "315px",
          }}
          renderValue={(selectedOption) =>
            `Sort by: ${
              SORT_OPTIONS.find((option) => option.key === selectedOption)
                ?.value
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

      <Icon
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleOnReload}
      >
        <img src={reloadImg} alt="reloadImg" />
      </Icon>
    </Box>
  );
};
