import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NoteApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NoteApi.logout();
      onLogoutSuccessful();
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
