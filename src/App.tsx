import './styles.css';
import { Section, Theme, ThemePanel } from '@radix-ui/themes';
import { WizardFormDemo } from './FormDemo.tsx';
import { DrawerDemo } from './DrawerDemo.tsx';
import { Feedback } from './ui/feedback.tsx';

const App = () => {
  return (
    <Theme>
      <Section>
        <Feedback />
      </Section>

      <Section>
        <WizardFormDemo />
      </Section>

      <Section>
        <DrawerDemo />
      </Section>

      <ThemePanel defaultOpen={false} />
    </Theme>
  );
};

export default App;
