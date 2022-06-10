import React from "react";
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import groupIcon from "../../../../assets/group.svg";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import theme from "../../../../theme";

const restrictions = [
  { icon: AccessTimeOutlinedIcon, value: "timeRestrictionEnabled" },
  { icon: FmdGoodOutlinedIcon, value: "geofenceRestrictionEnabled" },
  { icon: PhoneIphoneOutlinedIcon, value: "primaryDeviceRestrictionEnabled" },
  { icon: InsertDriveFileOutlinedIcon, value: "readerRestrictionEnabled" },
];

export default function GroupListItem({ group }) {
  const { id, name, description, membersCount, locksCount } = group;

  return (
    <Link
      style={{ textDecoration: "none", color: "initial" }}
      to={`/groups/${id}`}
    >
      <ListItem disablePadding>
        <ListItemButton sx={{ py: 2 }}>
          <ListItemIcon>
            <img src={groupIcon} alt="group" />
          </ListItemIcon>
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontWeight={500}>{name}</Typography>
              <Typography fontSize={13} color="gray">
                {description || "No group description"}
              </Typography>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box />
              <Stack spacing={2} alignItems="center" direction="row">
                <DoorBackOutlinedIcon
                  sx={{ fill: !locksCount ? red[800] : "gray" }}
                />
                <Typography
                  fontSize={13}
                  color={!locksCount ? red[800] : "gray"}
                >
                  {locksCount}
                </Typography>
                <GroupsOutlinedIcon
                  sx={{ fill: !membersCount ? red[800] : "gray" }}
                />
                <Typography
                  fontSize={13}
                  color={!membersCount ? red[800] : "gray"}
                >
                  {membersCount}
                </Typography>
              </Stack>
              <Stack spacing={2.5} alignItems="center" direction="row">
                {restrictions.map(({ icon: RestrictionIcon, value }) => {
                  const isEnabled = group[value];

                  return (
                    <Box position="relative">
                      <RestrictionIcon
                        sx={{ fill: isEnabled ? "gray" : "lightgray" }}
                      />

                      {isEnabled ? (
                        <CheckCircleIcon
                          sx={{
                            fill: theme.palette.primary.main,
                            fontSize: 12,
                            position: "absolute",
                            bottom: 4,
                            left: 16,
                          }}
                        />
                      ) : (
                        <CancelIcon
                          sx={{
                            fill: "gray",
                            fontSize: 12,
                            position: "absolute",
                            bottom: 4,
                            left: 16,
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
