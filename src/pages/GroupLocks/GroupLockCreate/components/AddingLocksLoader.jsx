import { Stack, Typography } from "@mui/material";
import React from "react";
import Spinner from "../../../../components/Spinner/Spinner";

export default function AddingLocksLoader({ doorsToAdd }) {
  return (
    <Stack alignItems="center" sx={{ width: 600 }}>
      <Spinner />
      <Typography my={4}>{doorsToAdd.length} doors remaining</Typography>
    </Stack>
  );
}
