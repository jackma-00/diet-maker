import { Button, Typography } from "@mui/material";
import GoogleLogo from "../google.png";
import Logo from "../../dist/favicon.ico";
export default function LoginView({ logGoogleUser }) {
  return (
    <div className="login">
      <img className="logo" src={Logo} alt="Logo" />
      <Typography variant="h3">Sign in with</Typography>
      <Button
        onClick={logGoogleUser}
        variant="outlined"
        style={{ margin: "5%" }}
      >
        <img className="googlePicture" src={GoogleLogo} alt="GooglePicture" />
        Google
      </Button>
      <Typography variant="h5">to access your personal diet maker</Typography>
    </div>
  );
}
