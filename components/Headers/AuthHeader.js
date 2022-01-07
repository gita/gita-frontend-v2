import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function AuthHeader() {
  return (
    <div className="bg-auth-bg">
      <Link href="/">
        <div className="flex justify-center md:justify-start items-center py-8 px-8 lg:flex-1">
          <a
            href="#"
            className="font-bold text-3xl flex  gap-3 items-center focus:outline-none"
          >
            <Image
              src="/bhagavad-gita.png"
              height="44"
              width="36"
              alt="gita logo"
            />
            <span className="sr-only">Workflow</span>
            Bhagavad Gita
          </a>
        </div>
      </Link>
    </div>
  );
}
