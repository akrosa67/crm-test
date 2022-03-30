import Button from "@mui/material/Button";

export const ZGButton = (props) => {
  const { onClick } = props;
  const handler = () => {
    onClick && onClick();
  };
  return (
    <Button onClick={handler} {...props}>
      {props.children}
    </Button>
  );
};
