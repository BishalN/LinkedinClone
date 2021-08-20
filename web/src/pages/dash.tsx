import { useRouter } from "next/dist/client/router";
import React from "react";

const dash = () => {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  return (
    <div>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </div>
  );
};

export default dash;
