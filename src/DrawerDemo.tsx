import {
  Button,
  Container,
  Dialog,
  Flex,
  Grid,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import * as Drawer from './ui/drawer';

export const dialog1 = (
  <Dialog.Root>
    <Dialog.Trigger>
      <Button variant="surface">Open Dialog</Button>
    </Dialog.Trigger>

    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to your profile.
      </Dialog.Description>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Name
          </Text>
          <TextField.Root
            defaultValue="Freja Johnsen"
            placeholder="Enter your full name"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            defaultValue="freja@example.com"
            placeholder="Enter your email"
          />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
);

export const drawerContent2 = (
  <Container size="1">
    <Flex direction="column" gap="3">
      <Drawer.Title>Edit profile</Drawer.Title>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <Grid columns="2" gap="2" mt="3">
        <Button variant="surface">Back</Button>
        <Button>Send</Button>
      </Grid>
    </Flex>
  </Container>
);

export const drawerContent3 = (
  <Container size="1">
    <Flex direction="column" gap="3">
      <Drawer.Title>Edit profile</Drawer.Title>
      <Grid gap="1">
        <Text as="div" weight="bold" size="2" mb="1">
          Feedback
        </Text>
        <TextArea placeholder="Write your feedback…" />
      </Grid>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <Grid gap="1">
        <Text as="div" weight="bold" size="2" mb="1">
          Feedback
        </Text>
        <TextArea placeholder="Write your feedback…" />
      </Grid>
      <Grid columns="2" gap="2" mt="3">
        <Button variant="surface">Back</Button>
        <Button>Send</Button>
      </Grid>
    </Flex>
  </Container>
);

export const drawer2 = (
  <Drawer.Root>
    <Drawer.Trigger asChild>
      <Button variant="surface">Open Drawer</Button>
    </Drawer.Trigger>
    <Drawer.Content>{drawerContent2}</Drawer.Content>
  </Drawer.Root>
);

export const drawer3 = (
  <Drawer.Root>
    <Drawer.Trigger asChild>
      <Button variant="surface">Open Drawer with Form</Button>
    </Drawer.Trigger>
    <Drawer.Content>{drawerContent3}</Drawer.Content>
  </Drawer.Root>
);

export const DrawerDemo = () => (
  <Flex wrap="wrap" gap={'2'}>
    {dialog1}
    {drawer2}
    {drawer3}
  </Flex>
);
