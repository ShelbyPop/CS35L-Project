// src/LoginInput.js
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
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

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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