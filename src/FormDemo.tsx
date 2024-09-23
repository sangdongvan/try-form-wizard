'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { createStepSchema, useWizardFormContext } from './ui/wizard-form';
import * as WizardForm from './ui/wizard-form';

const FormSchema = createStepSchema({
  account: z.object({
    username: z.string().min(3),
    email: z.string().email(),
  }),
  profile: z.object({
    password: z.string().min(6),
    age: z.coerce.number().min(18),
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export function WizardFormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: {
        username: 'john.doe',
        email: 'john.doe@domain.com',
      },
      profile: {
        password: '',
      },
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <Box maxWidth="400px">
      <Card size="2">
        <WizardForm.Root schema={FormSchema} form={form} onSubmit={onSubmit}>
          <WizardForm.Header>
            <Heading as={'h2'} size={'5'} mb={'3'}>
              Create your account
            </Heading>

            {/*<WizardFormContextProvider>*/}
            {/*  {({ currentStepIndex }) => (*/}
            {/*    <Stepper*/}
            {/*      variant={'numbers'}*/}
            {/*      steps={['Account', 'Profile', 'Review']}*/}
            {/*      currentStep={currentStepIndex}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*</WizardFormContextProvider>*/}
          </WizardForm.Header>

          <WizardForm.Step name="account">
            <AccountStep />
          </WizardForm.Step>

          <WizardForm.Step name="profile">
            <ProfileStep />
          </WizardForm.Step>

          <WizardForm.Step name="review">
            <ReviewStep />
          </WizardForm.Step>
        </WizardForm.Root>
      </Card>
    </Box>
  );
}

function AccountStep() {
  const {
    form: { control },
    nextStep,
    isStepValid,
  } = useWizardFormContext();

  return (
    <Flex direction={'column'} gap={'3'}>
      <Controller
        name="account.username"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Field name={field.name}>
            <Grid gap={'1'}>
              <Form.Label asChild>
                <Text weight="bold" size="2">
                  Username
                </Text>
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root {...field}></TextField.Root>
              </Form.Control>
              {fieldState.error && <Form.Message />}
            </Grid>
          </Form.Field>
        )}
      />

      <Controller
        name="account.email"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Field name={field.name}>
            <Form.Label asChild>
              <Text weight="bold" size="2">
                Email
              </Text>
            </Form.Label>
            <Form.Control asChild>
              <TextField.Root type={'email'} {...field}></TextField.Root>
            </Form.Control>
            {fieldState.error && <Form.Message />}
          </Form.Field>
        )}
      />

      <Flex justify={'start'}>
        <Button onClick={nextStep} disabled={!isStepValid()}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
}

function ProfileStep() {
  const {
    form: { register },
    nextStep,
    prevStep,
  } = useWizardFormContext();

  return (
    <div>
      <div className={'flex flex-col gap-4'}>
        <Form.Field name="profile.password">
          <Form.Label>Password</Form.Label>
          <Form.Control asChild>
            <input type="password" {...register('profile.password')} />
          </Form.Control>
          <Form.Message />
        </Form.Field>
      </div>

      <Form.Field name="profile.age">
        <Form.Label>Age</Form.Label>
        <Form.Control asChild>
          <input {...register('profile.age')} />
        </Form.Control>
        <Form.Message />
      </Form.Field>

      <div className="flex justify-end space-x-2">
        <Button type={'button'} variant={'outline'} onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}

function ReviewStep() {
  const { prevStep, form } = useWizardFormContext<typeof FormSchema>();
  const values = form.getValues();

  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex flex-col space-y-4'}>
        <div>Great! Please review the values.</div>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <div>
            <span>Username</span>: <span>{values.account.username}</span>
          </div>
          <div>
            <span>Email</span>: <span>{values.account.email}</span>
          </div>
          <div>
            <span>Age</span>: <span>{values.profile.age}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type={'button'} variant={'outline'} onClick={prevStep}>
          Back
        </Button>

        <Button type={'submit'}>Create Account</Button>
      </div>
    </div>
  );
}
