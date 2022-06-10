import React from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function Pagination({ pagination, handlePageChange }) {
  const { count, limit, offset } = pagination;

  const onPageChange = (offset) => {
    handlePageChange({
      offset,
    });
  };

  const numberOfPages = Math.ceil(count / limit);
  const isPreviousDisabled = offset === 0;
  const isNextDisabled = offset + limit >= count;
  const currentPageNumber = (offset + limit) / limit;

  if (!count) return null;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      py={2}
      px={3}
      alignItems="center"
    >
      <Button
        onClick={() => onPageChange(offset - limit)}
        disabled={isPreviousDisabled}
        sx={{ textTransform: "initial" }}
      >
        Previous Page
      </Button>
      <Typography fontSize={14}>
        Page {currentPageNumber} of {numberOfPages}
      </Typography>
      <Button
        onClick={() => onPageChange(offset + limit)}
        disabled={isNextDisabled}
        sx={{ textTransform: "initial" }}
      >
        Next Page
      </Button>
    </Stack>
  );
}
