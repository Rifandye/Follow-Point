"use client";

import { useSearchParams } from "next/navigation";

const ErrorComponent = () => {
  const searchParam = useSearchParams();
  const errorMessage = searchParam.get("error");

  return (
    <>
      {errorMessage && (
        <div className="rounded-sm text-red-500 hover:cursor-pointer italic text-center py-2 mb-9">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default ErrorComponent;
