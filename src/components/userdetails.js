import React, { useEffect, useState } from "react";
import { auth } from "./firebase";

function UserDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  if (!user) {
    return <div>Not logged in</div>;
  }

  return <div>Hi {user.email}</div>;
}

export default UserDetails;
