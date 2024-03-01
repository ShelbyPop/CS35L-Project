import React, { useState } from 'react';
import { TextInput, Button, Group, Container, Paper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import './LoginInput.css'; // Import CSS file

export default function LoginInput() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => (/^\S+$/.test(value) ? null : 'Invalid username (has whitespace or is empty)'),
      password: (value) => (/^\S{6}\S*$/.test(value) ? null : 'Invalid password (has whitespace or less than 6 characters)')
    }
  });

  const handleSubmit = async (values) => {
    setUsername(values.username);
    setPassword(values.password);
    setIsOpen(false);
    console.log(values);
    const response = await fetch(
      `http://localhost:5050/users/create?${new URLSearchParams(values)}`,
      {method: 'POST'}
    );
    if (response.ok) {
      const values = await response.json();
      console.log(values);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };


<div class="navbar">
  <button class="login-button cat-login-button"><span>Login</span></button>
</div>



  return (
    <Container size="xl">
      <div className="navbar cat-login-button" onClick={handleClick}>
        <h3>Login</h3>
      </div>
      <div className={`content ${isOpen ? 'content-open' : ''}`}>
        {isOpen && (
          <Paper className="login-paper" padding="md">
            <Text className="login-heading" size="xl" align="center" weight={700}>
              Login
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Username"
                placeholder="your username"
                {...form.getInputProps('username')}
              />
              <TextInput
                type="password"
                label="Password"
                placeholder="your password"
                {...form.getInputProps('password')}
              />
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Paper>
        )}
        {username && password && (
          <Text align="center" mt="md">
            
          </Text>
        )}
      </div>
    </Container>
  );
}



