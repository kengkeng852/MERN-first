import { Container } from "react-bootstrap";
import styles from "../styles/notePage.module.css";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/user";

interface NotePageProps {
  loggedInUser: User | null;
}

const NotePage = (loggedInUser: NotePageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
};

export default NotePage;
