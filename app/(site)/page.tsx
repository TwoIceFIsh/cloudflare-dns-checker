"use client";

import React, { useState } from "react";

const DomainList = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={"h-full"}>
      {loading ? (
        <div className={"flex h-full flex-col items-center justify-center"}>
          <div className={""}>Select One Domain</div>
        </div>
      ) : (
        <>
          <div>Loaded</div>
        </>
      )}
    </div>
  );
};

export default DomainList;
