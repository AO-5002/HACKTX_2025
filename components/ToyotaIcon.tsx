import React from "react";
import Image from "next/image";

function ToyotaIcon() {
  return (
    <Image
      src="/toyota_icon.png" // ✅ path relative to /public
      alt="Toyota Logo"
      width={36}
      height={36}
      className="rounded object-contain"
    />
  );
}

export default ToyotaIcon;
