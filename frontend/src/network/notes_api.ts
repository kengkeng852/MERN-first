import { ConflictError, UnauthorizedError } from "../errors/http_error";
import { Note as NoteModel } from "../models/notes";
import { User as UserModel } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage); //add new for our custom error
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed with status: " +
          response.status +
          " message: " +
          errorMessage
      );
    }
  }
}

export async function getLoggedInUser(): Promise<UserModel> {
  const response = await fetchData("/api/users", {
    method: "GET",
  });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(
  credentials: SignUpCredentials
): Promise<UserModel> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<UserModel> {
  const response = await fetchData("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("/api/users/logout", {
    method: "POST",
  });
}

export async function fetchNotes(): Promise<NoteModel[]> {
  const response = await fetchData("/api/notes", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json(); //get as a json cause when we write controller we return notes as a json object
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<NoteModel> {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<NoteModel> {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
}
