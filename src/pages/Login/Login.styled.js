import { createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const loginStyles = makeStyles(
  //Material UI Styling for the ShippingLabel
  ({ spacing, palette, breakpoints }) =>
    createStyles({
      appBar: {
        height: spacing(0.25),
        width: "100%",
        backgroundColor: palette.primary.main,
      },
      titleCard: {
        width: "640px",
        [breakpoints.down("xs")]: {
          width: "88vw",
        },
        borderRadius: 0,
        marginBottom: spacing(2),
      },
      iconWrapper: {
        marginTop: spacing(4),
      },
      price: {
        textAlign: "right",
      },
      priceWrapper: {
        marginTop: "-77px",
      },
      buttonStyle: {
        height: "45px",
        borderRadius: 0,
        "&:hover": {
          background: palette.primary.main,
        },
      },
      weight: {
        textAlign: "left",
      },
      successWrapper: {
        padding: spacing(2),
        textAlign: "center",
      },
      textCenter: {
        textAlign: "center",
      },
      labelWrapper: {
        padding: spacing(3, 3, 0, 3),
      },
      actionsWrapper: {
        textAlign: "right",
        padding: spacing(0, 3, 3, 3),
      },
    }),
  { name: "login" }
);
