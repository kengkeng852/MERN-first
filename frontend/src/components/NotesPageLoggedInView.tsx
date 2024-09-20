import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { FaPlus } from "react-icons/fa";
import Note from "./Note";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { useEffect, useState } from "react";
import * as NoteApi from "../network/notes_api";
import styles from "./styles/notePage.module.css";
import stylesUtils from "./styles/utils.module.css";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false); //to set it to show modal or not
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notesRes = await NoteApi.fetchNotes();
        setNotes(notesRes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    loadNotes();
  }, []); //put [] to avoid useEffect execute every render

  async function deleteNote(note: NoteModel) {
    try {
      await NoteApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id)); //keep only the notes that are not equal to the note we want to delete
    } catch (error) {
      console.error("Error deleting note:", error);
      alert(error);
    }
  }

  return (
    <>
      <Button
        className={`mb-4 mt-2 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page </p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {/* show notes in gird*/}
          {notes.length > 0 ? (
            <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
              {notes.map((note) => (
                <Col key={note._id}>
                  <Note
                    note={note}
                    className={styles.note}
                    onDeleteNoteClicked={deleteNote}
                    onNoteClicked={setNoteToEdit}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p>No notes available. Add a new note to get started!</p>
          )}
        </>
      )}

      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]); //to add new note to existing notes list. newNote is argument for note in onNoteSaved: (note: NoteModel)
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            ); //if the note is the one we edited, we replace it with the updated note
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
