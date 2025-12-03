import Image from "next/image";

interface FloralDividerProps {
  className?: string;
}

export function FloralDivider({ className = "" }: FloralDividerProps) {
  return (
    <div className={`flex justify-center py-8 ${className}`}>
      <Image
        src="/floral-divider.svg"
        alt=""
        width={200}
        height={40}
        className="opacity-60 dark:opacity-40"
        aria-hidden="true"
      />
    </div>
  );
}
