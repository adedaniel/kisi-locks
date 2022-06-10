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

export default function AddDoors({ isOpen, onClose, successCallback }) {
  const [placeId, setPlaceId] = useState(null);
  const [doorsToAdd, setDoorsToAdd] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { places } = useSelector((state) => state.places);
  const { selectedGroup } = useSelector((state) => state.groups);
  const { loading } = useSelector((state) => state.groupLocks);

  const dispatch = useDispatch();

  const closeDialog = () => {
    setPlaceId(null);
    setDoorsToAdd([]);
    setHasError(false);
    onClose();
    successCallback();
    dispatch(clearStates());
  };

  const removeFromDoorsToAdd = (door) => {
    const updated = doorsToAdd.filter(({ id }) => door.id !== id);
    setDoorsToAdd(updated);
  };

  const handleAddLockToGroup = async () => {
    setHasError(false);
    const response = await Promise.all(
      doorsToAdd.map(async (door) => {
        const response = await dispatch(
          addLockToGroup({
            group_lock: {
              group_id: selectedGroup.id,
              lock_id: door.id,
            },
          })
        );

        if (response.payload.id) {
          removeFromDoorsToAdd(door);
        } else {
          return door;
        }
      })
    );

    if (response.filter(Boolean).length) {
      setHasError(true);
      return;
    }

    closeDialog();
  };

  return (
    <Box>
      <Dialog onClose={closeDialog} open={isOpen}>
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
