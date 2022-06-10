import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { withAuth } from "../../hooks/withAuth";
import logoWhite from "../../assets/logo-white.svg";
import theme from "../../theme";
import { grey } from "@mui/material/colors";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink, Outlet } from "react-router-dom";

function DashboardLayout({ children }) {
  return (
    <Box minHeight="100vh" bgcolor={grey[100]}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          py={2}
          px={6}
          pr={12}
        >
          <img src={logoWhite} />

          <Button
            size="large"
            sx={{ textTransform: "initial", color: "white" }}
          >
            Log out
          </Button>
        </Stack>
      </AppBar>

      <Container sx={{ pt: 16 }} maxWidth="md">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component={RouterLink}
            to="/groups"
            underline="always"
            key="1"
            color="primary"
          >
            Groups
          </Link>
        </Breadcrumbs>
        <Outlet />
      </Container>
    </Box>
  );
}

export default withAuth(DashboardLayout);
