import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocks } from "../../../../redux/slices/lockSlice";

export default function ChooseLock({ placeId, doorsToAdd, setDoorsToAdd }) {
  const { locks } = useSelector((state) => state.locks);
  const [doorSearchQuery, setDoorSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleFetchPlaceLocks = async (overrides) => {
    await dispatch(fetchLocks({ limit: 10, place_id: placeId, ...overrides }));
  };

  // Once the placeId changes, fetch the locks attached to that placeId
  useEffect(() => {
    if (placeId) {
      handleFetchPlaceLocks();
    }
  }, [placeId]);

  // delay handle fetch function for 500 milliseconds
  const debouncedOnChange = useCallback(
    debounce((query) => {
      handleFetchPlaceLocks({ query });
    }, 500),
    []
  );

  // Map locks to show the label (the name of the lock) and it's id
  const doorOptions = locks.data.map(({ name, id }) => ({ label: name, id }));

  return (
    <Autocomplete
      disablePortal
      disabled={!placeId}
      options={doorOptions}
      fullWidth
      value=""
      onChange={(event, newValue) => {
        event.preventDefault();
        if (newValue) setDoorsToAdd((prev) => [...prev, newValue]);
      }}
      inputValue={doorSearchQuery}
      onInputChange={(event, newInputValue) => {
        setDoorSearchQuery(newInputValue);
        debouncedOnChange(newInputValue);
      }}
      clearOnBlur
      blurOnSelect
      sx={{ mt: 4 }}
      renderInput={(params) => <TextField {...params} label="Search Door" />}
    />
  );
}
