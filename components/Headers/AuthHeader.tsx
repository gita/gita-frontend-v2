import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <Link
      href="/"
      className="font-bold text-3xl flex gap-3 items-center focus:outline-none"
    >
      <div className="flex justify-center md:justify-start items-center py-8 px-8 lg:flex-1">
        <Image
          src="/bhagavad-gita.png"
          height={44}
          width={36}
          alt="gita logo"
        />
        <span className="sr-only">Workflow</span>
        <p className="pl-3">Bhagavad Gita</p>
      </div>
    </Link>
  );
}
