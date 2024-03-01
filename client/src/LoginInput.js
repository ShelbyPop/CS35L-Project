import { useState } from 'react';
import { TextInput, Button, Group, Box, Container, Text, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import './LogIninput.css'; 

export default function LoginInput() {
  const [isOpen, setIsOpen] = useState(true); // State to track if the login form is open

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
        username: (value) => (/^\S+$/.test(value) ? null : 'Invalid username (has whitespace or is empty)'),
        password: (value) => (/^\S{6}\S*$/.test(value) ? null : 'Invalid password (has whitespace or less than 6 characters)')
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await fetch(
      `http://localhost:5050/users/create?${new URLSearchParams(values)}`,
      {method: 'POST'}
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setIsOpen(false); // CLOSE the login form after successful submission
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen); // CHANGE the login form state when the button is clicked
  };

  return (
    <Container size="xl">
      <div className="navbar cat-login-button" onClick={handleClick}>
        <h3>Login</h3>
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
                {...form.getInputProps('password')}
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
