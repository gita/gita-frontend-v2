function useEnvironment() {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";
  return [isProduction, isDevelopment];
}

export default useEnvironment;
