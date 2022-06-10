import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RetryAddingLocks({ doorsToAdd, removeFromDoorsToAdd }) {
  return (
    <Stack px={3} sx={{ width: 600 }}>
      <Typography fontSize={14}>
        The following locks could not be added. Try again.
      </Typography>

      <Stack flexWrap="wrap" direction="row" mt={2} spacing={1}>
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
    </Stack>
  );
}
