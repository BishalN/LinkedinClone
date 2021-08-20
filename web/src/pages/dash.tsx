import { useRouter } from "next/dist/client/router";
import React from "react";
import { useIsAuth } from "../hooks/useIsAuthenticated";

const dash = () => {
  useIsAuth();
  const router = useRouter();
  const query = router.query;
  //he
  return (
    <div>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </div>
  );
};

export default dash;
