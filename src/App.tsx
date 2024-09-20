import './styles.css';
import {
  Button,
  Dialog,
  Flex,
  Section,
  Theme,
  ThemePanel,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Feedback } from './ui/feedback';
import * as Drawer from './ui/drawer/drawer';

const App = () => {
  const dialog1 = (
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

  const drawer2 = (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button variant="surface">Open Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
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
      </Drawer.Content>
    </Drawer.Root>
  );

  return (
    <Theme>
      <Section>
        <Feedback />
      </Section>

      <Section>
        <Flex gap={'2'}>
          {dialog1}
          {drawer2}
          <Button variant="surface">Open Dynamic Modal</Button>
        </Flex>
      </Section>

      <ThemePanel defaultOpen={false} />
    </Theme>
  );
};

export default App;
