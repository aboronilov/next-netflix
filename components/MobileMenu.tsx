import { useRouter } from "next/router";
import React from "react";

type Props = {
  visible?: boolean;
};

const MobileMenu = ({ visible }: Props) => {
  const router = useRouter();
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex transition duration-500 ease-in">
      <div className="flex flex-col gap-4">
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/")}
        >
          Home
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/series")}
        >
          Series
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/films")}
        >
          Films
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/trending")}
        >
          New & Popular
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/favorites")}
        >
          My List
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
