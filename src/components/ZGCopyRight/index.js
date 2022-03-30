import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const ZGCopyRight = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://zerogravity.photography/">
        Zero Gravity Photography
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};
