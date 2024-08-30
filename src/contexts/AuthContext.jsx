import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import AuthApi from "../api/AuthApi";

export const AuthContext = createContext(null);

const AuthContextProvider = AuthContext.Provider; // Component

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const decodeAndSetUser = (access_tokenParam) => {
    const jwtPayload = jwtDecode(access_tokenParam);

    const newUser = {
      id: jwtPayload.sub,
      username: jwtPayload.username,
      email: jwtPayload.email,
      name: jwtPayload.name,
      role: jwtPayload.role,
      profilePictureUrl: jwtPayload.profilePictureUrl,
    };

    setUser(newUser);
    setIsLoading(false);
  };

  const loadUser = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      decodeAndSetUser(access_token);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    const { access_token, refreshToken } = await AuthApi.login(
      username,
      password
    );
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refreshToken", refreshToken);
    decodeAndSetUser(access_token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const isAuthenticated = !!user;

  if (isLoading) return <div>Loading ...</div>;

  return (
    <AuthContextProvider value={{ logout, user, isAuthenticated, login }}>
      {children}
    </AuthContextProvider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
