import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/notePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NoteApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false); //to set it to show modal or not

  useEffect(() => {
    async function loadNotes() {
      try {
        const notesRes = await NoteApi.fetchNotes();
        setNotes(notesRes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        alert(error);
      }
    }

    loadNotes();
  }, []); //put [] to avoid useEffect execute every render

  return (
    <Container>
      <Button
        className={`mb-4 mt-2 ${stylesUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} key={note._id} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]); //to add new note to existing notes list. newNote is argument for note in onNoteSaved: (note: NoteModel)
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
