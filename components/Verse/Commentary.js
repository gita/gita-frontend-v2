import React from "react";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

export default function Commentary({ commentaryData }) {
  const styles = useMyStyles();

  return (
    <div>
      <h1 className={classNames("font-extrabold mt-4 dark:text-gray-50", styles.fontSize.heading,styles.textColor)}>
        Commentary
      </h1>
      <p className={classNames("mt-4 mx-auto text-justify dark:text-gray-50", styles.fontSize.para,styles.lineHeight)}>
        {commentaryData?.description}
      </p>
    </div>
  );
}
