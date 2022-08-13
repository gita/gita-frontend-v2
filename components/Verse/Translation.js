import React from "react";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

export default function Translation({ translationData }) {
  const styles = useMyStyles();

  return (
    <div>
      <h1 className={classNames("font-extrabold dark:text-gray-50", styles.fontSize.heading)}>Translation</h1>
      <p className={classNames("mt-4 mx-auto text-justify dark:text-gray-50 ", styles.fontSize.para,styles.lineHeight)}>
        {translationData?.description}
      </p>
    </div>
  );
}
