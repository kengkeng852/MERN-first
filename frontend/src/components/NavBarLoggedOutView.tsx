import { Button, Navbar } from "react-bootstrap";
import * as NoteApi from "../network/notes_api";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}> Sign Up</Button>
      <Button onClick={onLoginClicked}> Login</Button>
    </>
  );
};

export default NavBarLoggedOutView;
