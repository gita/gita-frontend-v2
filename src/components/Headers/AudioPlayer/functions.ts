export const updateQueryString = (searchParams: URLSearchParams) => {
  const prefix = searchParams.size ? "?" : "";
  window.history.pushState(
    {},
    "",
    `${window.location.origin}${
      window.location.pathname
    }${prefix}${searchParams.toString()}`,
  );
};
