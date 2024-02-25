// src/LoginInput.js
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginInput() {
  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },

    // Validate input fields using regex
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
      const values = await response.json();
      console.log(values);
    }
  };

  return (
    <Box maw={340} mx="auto">
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
    </Box>
  );
}