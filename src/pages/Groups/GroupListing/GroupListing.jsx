import {
  Box,
  Card,
  Divider,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import { fetchGroups } from "../../../redux/slices/groupSlice";
import GroupListItem from "./components/GroupListItem";
import Pagination from "../../../components/Pagination/Pagination";

export default function GroupListing() {
  const { groups, loading } = useSelector((state) => state.groups);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleFetchGroups = async (overrides) => {
    await dispatch(
      fetchGroups({ limit: 10, offset: 0, query: searchQuery, ...overrides })
    );
  };

  // Fetch groups once the component mounts
  useEffect(() => {
    handleFetchGroups();
  }, []);

  // delay handle fetch function for 500 milliseconds
  const debouncedOnChange = useCallback(
    debounce((query) => {
      handleFetchGroups({ query });
    }, 500),
    []
  );

  return (
    <Box pb={12}>
      <Stack direction="row" spacing={1}>
        <Typography fontWeight="bold" fontSize={30}>
          Groups
        </Typography>
        <Typography fontWeight="bold" color="gray" fontSize={30}>
          {groups.pagination?.count}
        </Typography>
      </Stack>
      <Typography mb={3} color="gray" fontSize={14}>
        Add users to groups and assign different access rights
      </Typography>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <Stack direction="row" px={3.5} py={2} justifyContent="space-between">
          <TextField
            size="small"
            sx={{
              fontSize: 14,
              borderRadius: 12,
              width: "100%",
              maxWidth: 480,
            }}
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              debouncedOnChange(event.target.value);
            }}
            placeholder="Search Groups..."
            variant="outlined"
            type="search"
          />
        </Stack>
        <Divider />
        <Stack px={3.5} py={1.5}>
          {loading && <Spinner />}
          {groups.data && !groups.data.length && (
            <Typography>No groups here</Typography>
          )}
          <List>
            {groups.data &&
              groups.data.map((group) => (
                <GroupListItem key={group.id} group={group} />
              ))}
          </List>
        </Stack>
        <Divider />
        {groups.pagination && (
          <Pagination
            pagination={groups.pagination}
            handlePageChange={handleFetchGroups}
          />
        )}
      </Card>
    </Box>
  );
}
