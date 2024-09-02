"use client";

export default function ErrorNotif({ error }: { error: string | null }) {
  return (
    <>
      {error && (
        <p className="text-red-800 bg-red-200 px-5 py-2 rounded my-3">
          {error}
        </p>
      )}
    </>
  );
}
