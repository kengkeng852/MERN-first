import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NoteApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSucessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSucessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NoteApi.logout();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Sign in as: {user.username}</Navbar.Text>
      <Button onClick={logout}> Log Out</Button>
    </>
  );
};

export default NavBarLoggedInView;
