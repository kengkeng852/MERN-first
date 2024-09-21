import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NoteApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotePage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/app.module.css";

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => {
            setShowLoginModal(true);
          }}
          onSignUpClicked={() => {
            setShowSignUpModal(true);
          }}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotePage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
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
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
