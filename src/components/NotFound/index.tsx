type Props = {
  hint?: string;
};

function NotFound(props: Props) {
  const { hint } = props;

  return <h1 className="p-10 text-center">{hint || "Not found"}</h1>;
}

export default NotFound;
