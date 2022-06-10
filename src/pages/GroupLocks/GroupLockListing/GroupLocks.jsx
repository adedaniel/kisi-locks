import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  List,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupById } from "../../../redux/slices/groupSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import {
  deleteGroupLock,
  fetchGroupLocks,
} from "../../../redux/slices/groupLockSlice";
import LockListItem from "./components/LockListItem";
import Pagination from "../../../components/Pagination/Pagination";
import AddDoors from "../GroupLockCreate/GroupLockCreate";
import { fetchPlaces } from "../../../redux/slices/placeSlice";

export default function GroupLocks() {
  const { selectedGroup } = useSelector((state) => state.groups);
  const { groupLocks, loading } = useSelector((state) => state.groupLocks);
  const [showDeleteCofirmation, setShowDeleteCofirmation] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleFetchGroupDetails = async () => {
    await dispatch(fetchGroupById({ id }));
  };

  const handleFetchGroupLocks = async (overrides) => {
    await dispatch(
      fetchGroupLocks({ group_id: id, limit: 10, offset: 0, ...overrides })
    );
  };

  const handleFetchPlaces = async () => {
    await dispatch(fetchPlaces());
  };

  const handleDeleteGroupLock = async (id) => {
    const response = await dispatch(deleteGroupLock({ id }));
    if (response.payload.success) {
      // After removing the lock, show confirmation snackbar
      // and refectch the list of groupLocks
      setShowDeleteCofirmation(true);
      handleFetchGroupLocks();
    }
  };

  // When the component mounts, We need to fetch the group details,
  // as well as the locks associated with that group.
  // We'll also need to fetch places for when we want to attach
  // the lock of a place to the group.
  useEffect(() => {
    handleFetchGroupDetails();
    handleFetchGroupLocks();
    handleFetchPlaces();
  }, []);

  if (!selectedGroup) {
    return <Spinner />;
  }

  return (
    <Box pb={12}>
      <Stack direction="row" spacing={1}>
        <Typography fontWeight="bold" fontSize={30}>
          {selectedGroup.name}
        </Typography>
      </Stack>
      <Typography mb={3} color="gray" fontSize={14}>
        Add users to groups and assign different access rights
      </Typography>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <Stack
          direction="row"
          px={3.5}
          py={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize={18} fontWeight="bold">
            Doors
          </Typography>

          <AddDoors successCallback={handleFetchGroupLocks} />
        </Stack>
        <Divider />
        <Stack px={3.5} py={1.5}>
          {groupLocks.data && !groupLocks.data.length && (
            <Typography textAlign="center">
              You haven't added any doors.
            </Typography>
          )}
          <List>
            {groupLocks.data &&
              groupLocks.data.map((groupLock) => (
                <LockListItem
                  key={groupLock.id}
                  groupLock={groupLock}
                  onDelete={handleDeleteGroupLock}
                />
              ))}
          </List>
        </Stack>
        <Divider />
        {groupLocks.pagination && (
          <Pagination
            pagination={groupLocks.pagination}
            handlePageChange={handleFetchGroupLocks}
          />
        )}
      </Card>
      <Snackbar
        autoHideDuration={3000}
        open={showDeleteCofirmation}
        message="Door has been removed from group"
      />
    </Box>
  );
}
