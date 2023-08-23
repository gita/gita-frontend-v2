import Bookmarkcard from "../../components/Shared/BookmarkCard";

const Bookmark = () => {
  return (
    <div className="bg-gray-400">
      <div className="w-full bg-white p-12 md:w-1/2">
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
      </div>
    </div>
  );
};

export default Bookmark;
