import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserInfo() {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      {/* <h1>{user.name}</h1> */}
    </div>
  );
}
