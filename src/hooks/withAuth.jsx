import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

/** This HOC takes in a component as a argument, then checks if
 *  there is a valid `kisiAuthenticationToken` in the localStorage
 *  before rendering the component.
 *
 *  If a valid `kisiAuthenticationToken` cannot be found in the localStorage,
 *  it re-routes the user to the login page.
 *
 * @param Component
 * @returns {JSX.Element} Component
 */
export const withAuth = (Component) => {
  return function Auth(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (localStorage.getItem("kisiAuthenticationToken")) {
        // Check if token exists in localStorage, then fetch userDetails with it
        setIsAuthorized(true);
        if (!user) dispatch(fetchUserDetails());
      } else {
        navigate("/login"); // Otherwise, if token doesn't exist, re-route to login
      }
    }, []);

    return isAuthorized ? <Component {...props} /> : null;
  };
};
