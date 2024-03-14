import { useState } from 'react';
import { TextInput, Button, Group, Checkbox, Container, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import './LoginInput.css';
import '@mantine/core/styles/Checkbox.css';

/**
 *
 * This function is used to validate a user's username and password
 * The username must not contain whitespace or be empty
 * The password must not contain whitespace or less than 6 characters
 * A user must check the checkbox if they are a new user, otherwise leave it unchecked
 * 
 * @export
 * @param {*} { setUsername }
 * @return {*} 
 */
export default function LoginInput({ setUsername }) {
  const [isOpen, setIsOpen] = useState(false); 

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      firstTime: false
    },
    validate: {
        username: (value) => (/^\S+$/.test(value) ? null : 'Invalid username'), 
        password: (value) => (/^\S{6}\S*$/.test(value) ? null : 'Invalid password') 
    },
  });

  /**
   * This function manages requests for logging in as a user or creating a new account
   *
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    console.log(values);
    let response = null;
    if (values.firstTime) {
      // Create a new account
      response = await fetch(
        `http://localhost:5050/users/create?${new URLSearchParams(values)}`,
        {method: 'POST'}
      );
    } else {
      // Log in as an existing user
      response = await fetch(
        `http://localhost:5050/users/login?${new URLSearchParams(values)}`
      );
    }

    if (response.ok) {
      if (values.firstTime) {
        const data = await response.json();
        console.log(data);
      }
      values.firstTime
        ? console.log("Signup success")
        : console.log("Login success");
      setUsername(values.username);
      setIsOpen(false); // CLOSE the login form after successful submission
    } else {
      values.firstTime 
        ? alert("Username is already taken, please try again")
        : alert("Incorrect username or password, please try again");
    }
    form.reset(); // Reset form values
  };

  /**
   * Changes the login form state when the button is clicked
   *
   */
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container size="xl">
      <div className="navbar cat-login-button" onClick={handleClick}>
      <h3 style={{ fontFamily: 'Frankfurter Std', paddingBottom: '60px' }}>Login</h3>
      </div>
      <div className={`content ${isOpen ? 'content-open' : ''}`}>
        {isOpen && (
          <Paper className="login-paper" padding="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Username"
                placeholder="your username"
                {...form.getInputProps('username')}
              />
              <TextInput
                label="Password"
                placeholder="your password"
                type={form.values.firstTime ? "text" : "password"}
                {...form.getInputProps('password')}
              />
              <Checkbox
                mt="md"
                color="pink"
                label="First-time user"
                {...form.getInputProps('firstTime', { type: 'checkbox' })}      
              />
              <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Paper>
        )}
      </div>
    </Container>
  );
}
