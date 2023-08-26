import { FC } from "react";

type SkeletonProps = {
  height: string;
  width: string;
  margin: string;
};

export const Skeleton: FC<SkeletonProps> = ({ height, width, margin }) => {
  return (
    <div
      className={`${height} ${width} ${margin} animate-pulse rounded-md bg-gray-300`}
    />
  );
};
