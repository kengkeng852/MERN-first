import { Container } from "react-bootstrap";
import styles from "./styles/notePage.module.css";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NoteApi from "./network/notes_api";
import { set } from "mongoose";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser();
        setLoggedInUser(user); //set user to the state
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []); //put [] to execute one time when open the page

  return (
    <div>
      <NavBar
        loggedInUser={null}
        onLoginClicked={() => {
          setShowLoginModal(true);
        }}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onloginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
