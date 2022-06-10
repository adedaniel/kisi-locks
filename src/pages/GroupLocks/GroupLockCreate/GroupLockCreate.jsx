import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLockToGroup,
  clearStates,
} from "../../../redux/slices/groupLockSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddingLocksLoader from "./components/AddingLocksLoader";
import ChooseLock from "./components/ChooseLock";
import RetryAddingLocks from "./components/RetryAddingLocks";

export default function AddDoors({ successCallback }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [doorsToAdd, setDoorsToAdd] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { places } = useSelector((state) => state.places);
  const { selectedGroup } = useSelector((state) => state.groups);
  const { loading } = useSelector((state) => state.groupLocks);

  const dispatch = useDispatch();

  // Close the dialog and reset states
  const closeDialog = () => {
    setDialogOpen(false);
    setPlaceId(null);
    setDoorsToAdd([]);
    setHasError(false);
    successCallback();
    dispatch(clearStates());
  };

  /** Remove a door from the array of doors to be queued
   *  and added to the group
   * @param door
   */
  const removeFromDoorsToAdd = (door) => {
    const updated = doorsToAdd.filter(({ id }) => door.id !== id);
    setDoorsToAdd(updated);
  };

  /** Performs API call for each door in the `doorsToAdd` array
   *  to add the door/lock to the current `selectedGroup`.
   */
  const handleAddLockToGroup = async () => {
    setHasError(false);
    const response = await Promise.all(
      doorsToAdd.map(async (door) => {
        // Attempt to add each lock to the group
        const response = await dispatch(
          addLockToGroup({
            group_lock: {
              group_id: selectedGroup.id,
              lock_id: door.id,
            },
          })
        );

        // If the lock is added successfully, remove it from the array of `doorsToAdd`
        if (response.payload.id) {
          removeFromDoorsToAdd(door);
          return null;
        } else {
          // Else, if it fails, return the door
          return door;
        }
      })
    );

    // After the API calls have been made, we need to know how many doors failed to be added to the group.
    // ie. the items in the `response` array that are not `null`
    if (response.filter(Boolean).length) {
      // If there are a number of doors, then indicate that an error had occured.
      setHasError(true);
      return;
    }

    // However, if all goes well (all the items in the `response` array were `null`ish)
    // Then we can close the dialog
    closeDialog();
  };

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
      <Dialog onClose={closeDialog} open={dialogOpen}>
        <DialogTitle>Add Doors</DialogTitle>
        {!loading && (
          <Box>
            {!hasError && (
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
                <ChooseLock
                  placeId={placeId}
                  doorsToAdd={doorsToAdd}
                  setDoorsToAdd={setDoorsToAdd}
                />

                <Stack flexWrap="wrap" direction="row" mt={3} spacing={1}>
                  {doorsToAdd.map((door) => (
                    <Chip
                      sx={{ mb: 1 }}
                      key={door.id}
                      label={door.label}
                      onDelete={() => removeFromDoorsToAdd(door)}
                      deleteIcon={<CloseIcon />}
                    />
                  ))}
                </Stack>
              </DialogContent>
            )}

            {hasError && (
              <RetryAddingLocks
                doorsToAdd={doorsToAdd}
                removeFromDoorsToAdd={removeFromDoorsToAdd}
              />
            )}

            <Divider />

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                sx={{
                  textTransform: "initial",
                  fontWeight: 600,
                  mr: 2,
                  fontSize: 16,
                }}
                onClick={closeDialog}
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
                disabled={!doorsToAdd.length}
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

        {loading && <AddingLocksLoader doorsToAdd={doorsToAdd} />}
      </Dialog>
    </Box>
  );
}
