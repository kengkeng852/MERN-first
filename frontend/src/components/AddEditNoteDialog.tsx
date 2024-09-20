import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { useForm } from "react-hook-form";
import TextInputField from "./form/TextInputField";
import { createNote, NoteInput, updateNote } from "../network/notes_api";

interface AddEditNoteDialogProps {
  noteToEdit?: NoteModel;
  onDismiss: () => void;
  onNoteSaved: (note: NoteModel) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmitNote(input: NoteInput) {
    try {
      let noteResponse: NoteModel;
      if (noteToEdit) {
        noteResponse = await updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await createNote(input);
      }

      onNoteSaved(noteResponse);
    } catch (error) {
      console.error("Error creating note:", error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmitNote)}>
          <TextInputField
            name="title"
            label="Title"
            register={register}
            type="text"
            placeholder="Note title"
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />
          <TextInputField
            name="text"
            label="Text"
            register={register}
            as="textarea"
            rows={3}
            placeholder="Note content"
            registerOptions={{ required: "Required" }}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
