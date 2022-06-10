import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/login-bg.svg";
import logo from "../../assets/logo.svg";
import { loginUser } from "../../redux/slices/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const data = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    // Route to groups page if login is successful
    if (data.payload.user) {
      navigate("/groups");
    }
  };

  const isDisabled = !!loading || !email || !password;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "white",
          boxShadow: "rgb(0 0 0 / 5%) 0px 2px 4px 0px",
          color: "black",
        }}
      >
        <Stack direction="row" justifyContent="space-between" py={2} px={6}>
          <img src={logo} />
        </Stack>
      </AppBar>

      <Stack mt={16} justifyContent="center" direction="row">
        <Stack direction="row" spacing={12} width="100%" maxWidth="940px">
          <Stack
            onSubmit={handleSubmitLogin}
            component="form"
            width="100%"
            maxWidth={380}
          >
            <Typography
              fontSize={42}
              component="h1"
              textAlign="center"
              fontWeight="bold"
            >
              Sign In to Your Organization
            </Typography>

            <Typography
              fontWeight="600"
              mt={4}
              fontSize={18}
              textAlign="center"
            >
              Kisi test task
            </Typography>
            <TextField
              fullWidth
              sx={{ mt: 4, borderRadius: 8 }}
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              sx={{ mt: 4, borderRadius: 8 }}
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              variant="outlined"
            />

            {error && (
              <Box
                px={2}
                py={1}
                bgcolor={red[50]}
                border="1px solid"
                borderColor={red[100]}
                color={red[700]}
                fontSize={14}
                borderRadius={1.5}
                mt={2}
              >
                {error.errorMessage}
              </Box>
            )}

            <Button
              size="large"
              sx={{
                mt: 3,
                borderRadius: 2,
                height: 55,
                textTransform: "unset",
              }}
              variant="contained"
              disabled={isDisabled}
              disableElevation
              type="submit"
            >
              Sign in
            </Button>
          </Stack>
          <Stack width="100%" alignItems="flex-end" justifyContent="flex-end">
            <img src={loginBg} alt="login background" />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
