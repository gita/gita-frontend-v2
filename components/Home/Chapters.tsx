import Image from "next/image";
import Card from "./Card";

const Chapters = ({ chapters }: ChaptersProps) => {
  return (
    <div className="my-14 relative">
      <Image
        src="/bg-verses-fixed.png"
        alt="BG Chapters Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="z-[-1]"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 z-50">
        <div>
          <h1 className="text-5xl dark:text-white font-bold">Chapters</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
              <Card key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
