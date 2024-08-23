import { signInWithGoogle } from "../persistence/firebasePersistence";
import LoginView from "../views/loginView";

export default function LoginPresenter() {
  const logGoogleUser = async () => {
    await signInWithGoogle();
  };

  return <LoginView logGoogleUser={logGoogleUser} />;
}
