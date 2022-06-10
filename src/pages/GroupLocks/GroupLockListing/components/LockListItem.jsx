import React from "react";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import lockIcon from "../../../../assets/lock.svg";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

// TODO: Show place restrictions for specific lock
const restrictions = [
  { icon: FmdGoodOutlinedIcon, value: "geofenceRestrictionEnabled" },
  { icon: InsertDriveFileOutlinedIcon, value: "readerRestrictionEnabled" },
];

export default function LockListItem({ groupLock, onDelete }) {
  const { id, lock, place } = groupLock;

  const handleDeleteGroupLock = async (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ py: 2 }}>
        <ListItemIcon>
          <img src={lockIcon} alt="lock" />
        </ListItemIcon>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography fontSize={15} fontWeight={500}>
              {lock.name}
            </Typography>
            <Typography fontSize={13} color="gray">
              {place.name} &nbsp; {lock.description || "No description"}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton onClick={handleDeleteGroupLock} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
