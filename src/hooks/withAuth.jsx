import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStates, fetchUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const withAuth = (Component) => {
  return function Auth(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (localStorage.getItem("kisi_authentication_token")) {
        // Check if token exists in localStorage, then fetch userDetails with it
        setIsAuthorized(true);
        if (!user) dispatch(fetchUserDetails());
      } else {
        navigate("/login"); // Otherwise, if token doesn't exist, re-route to login
      }
    }, []);

    return isAuthorized ? <Component {...props} /> : null; // While waiting, show loading animation
  };
};
