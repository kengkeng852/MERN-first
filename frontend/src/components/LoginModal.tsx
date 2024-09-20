import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { login, LoginCredentials } from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface loginModelProps {
  onDismiss: () => void; //for closing the modal
  onloginSuccessful: (User: User) => void; //for updating the UI
}

const LoginModal = ({ onDismiss, onloginSuccessful }: loginModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const newUser = await login(credentials);
      onloginSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error("Error signing up:", error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
