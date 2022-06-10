import { Stack } from "@mui/material";
import React from "react";
import spinnerIcon from "../../assets/spinner.svg";

/** Renders a spinner svg
 * @param {number} size
 * @default 128
 */
export default function Spinner({ size }) {
  const dimension = size || 128;

  return (
    <Stack justifyContent="center" alignItems="center">
      <img
        width={dimension}
        height={dimension}
        src={spinnerIcon}
        alt="spinner"
      />
    </Stack>
  );
}
