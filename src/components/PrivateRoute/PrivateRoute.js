import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  // console.log(loginUser);
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          loginUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
