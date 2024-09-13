import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/notePage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const notesRes = await response.json(); //get as a json cause when we write controller we return notes as a json object
        setNotes(notesRes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        alert(error);
      }
    }

    fetchNotes();
  }, []); //put [] to avoid useEffect execute every render

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} key={note._id} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
