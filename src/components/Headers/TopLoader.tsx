import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
    color="#F57903"
    initialPosition={0.08}
    crawlSpeed={800}
    height={4}
    crawl={true}
    showSpinner={true}
    easing="ease"
    speed={200}
    shadow="0 0 10px #2299DD,0 0 10px #2299DD"
  />
  );
}