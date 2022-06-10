import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import { addLockToGroup } from "../../../redux/slices/groupLockSlice";
import { fetchLocks } from "../../../redux/slices/lockSlice";

export default function AddDoors({ successCallback }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [doorSearchQuery, setDoorSearchQuery] = useState("");
  const [placeId, setPlaceId] = useState(null);
  const [door, setDoor] = useState(null);
  const { places } = useSelector((state) => state.places);
  const { locks } = useSelector((state) => state.locks);
  const { selectedGroup } = useSelector((state) => state.groups);
  const { loading, error } = useSelector((state) => state.groupLocks);

  const dispatch = useDispatch();

  const handleFetchPlaceLocks = async (overrides) => {
    await dispatch(fetchLocks({ limit: 10, place_id: placeId, ...overrides }));
  };

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

  const handleAddLockToGroup = async () => {
    const response = await dispatch(
      addLockToGroup({
        group_lock: {
          group_id: selectedGroup.id,
          lock_id: door.id,
        },
      })
    );

    if (response.payload.id) {
      setDialogOpen(false);
      successCallback();
    }
  };

  const doorOptions = locks.data.map(({ name, id }) => ({ label: name, id }));

  return (
    <Box>
      <Button
        size="large"
        variant="outlined"
        onClick={() => setDialogOpen(true)}
        sx={{
          textTransform: "initial",
          fontWeight: 700,
          borderRadius: 1.5,
          width: 146,
          height: 46,
        }}
      >
        Add Doors
      </Button>

      <Dialog open={dialogOpen}>
        <DialogTitle>Add Doors</DialogTitle>
        {!loading && (
          <Box>
            <DialogContent sx={{ width: 600 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Select place</InputLabel>
                <Select
                  value={placeId}
                  onChange={(event) => setPlaceId(event.target.value)}
                  label="Select place"
                  fullWidth
                >
                  {places.data?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Autocomplete
                disablePortal
                disabled={!placeId}
                options={doorOptions}
                fullWidth
                value={door}
                onChange={(event, newValue) => {
                  setDoor(newValue);
                }}
                inputValue={doorSearchQuery}
                onInputChange={(event, newInputValue) => {
                  setDoorSearchQuery(newInputValue);
                  debouncedOnChange(newInputValue);
                }}
                sx={{ mt: 4 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search Door" />
                )}
              />
            </DialogContent>

            <Divider />
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                sx={{
                  textTransform: "initial",
                  fontWeight: 600,
                  mr: 2,
                  fontSize: 16,
                }}
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddLockToGroup}
                sx={{
                  textTransform: "initial",
                  width: 100,
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 2,
                }}
                disabled={!door || !placeId}
                disableElevation
                size="large"
                variant="contained"
                autoFocus
              >
                Add
              </Button>
            </DialogActions>
          </Box>
        )}

        {loading && (
          <Stack alignItems="center" sx={{ width: 600 }}>
            <Spinner />
            <Typography my={4}>Loading</Typography>
          </Stack>
        )}
      </Dialog>
    </Box>
  );
}
