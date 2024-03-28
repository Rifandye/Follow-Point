"use client";

import { useSearchParams } from "next/navigation";

export function FormError() {
  const params = useSearchParams();
  const message = params.get("error");

  return (
    <>
      {message && (
        <div className="rounded-sm text-red-500 hover:cursor-pointer italic text-center py-2 mb-9">
          {message}
        </div>
      )}
    </>
  );
}
