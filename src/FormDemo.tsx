'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Flex, Grid, Heading, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import * as WizardForm from './ui/wizard-form';
import { createStepSchema, useWizardFormContext } from './ui/wizard-form';
import React from 'react';
import * as Drawer from './ui/drawer';

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
    <WizardForm.Root schema={FormSchema} form={form} onSubmit={onSubmit}>
      <WizardForm.Header>
        <Drawer.Title>Create your account</Drawer.Title>

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

      <Grid columns="2" gap="2">
        <span aria-hidden={'true'}></span>
        <Button onClick={nextStep} disabled={!isStepValid()}>
          Next
        </Button>
      </Grid>
    </Flex>
  );
}

function ProfileStep() {
  const {
    form: { control },
    nextStep,
    prevStep,
  } = useWizardFormContext();

  return (
    <Flex direction={'column'} gap={'3'}>
      <Controller
        name="profile.password"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Field name={field.name}>
            <Grid gap={'1'}>
              <Form.Label asChild>
                <Text weight="bold" size="2">
                  Password
                </Text>
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root type={'password'} {...field}></TextField.Root>
              </Form.Control>
              {fieldState.error && <Form.Message />}
            </Grid>
          </Form.Field>
        )}
      />

      <Controller
        name="profile.age"
        control={control}
        render={({ field, fieldState }) => {
          const filledInputProps = { ...field, value: field.value ?? '' };
          return (
            <Form.Field name={field.name}>
              <Grid gap={'1'}>
                <Form.Label asChild>
                  <Text weight="bold" size="2">
                    Age
                  </Text>
                </Form.Label>
                <Form.Control asChild>
                  <TextField.Root
                    type={'number'}
                    {...filledInputProps}
                  ></TextField.Root>
                </Form.Control>
                {fieldState.error && <Form.Message />}
              </Grid>
            </Form.Field>
          );
        }}
      />

      <Grid columns="2" gap="2">
        <Button variant={'surface'} onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </Grid>
    </Flex>
  );
}

function ReviewStep() {
  const { prevStep, form } = useWizardFormContext<typeof FormSchema>();
  const values = form.getValues();

  return (
    <Flex direction={'column'} gapY={'3'}>
      <Flex direction={'column'} gapY={'3'}>
        <div>Great! Please review the values.</div>
        <Flex direction={'column'} gapY={'2'}>
          <div>
            <span>Username</span>: <span>{values.account.username}</span>
          </div>
          <div>
            <span>Email</span>: <span>{values.account.email}</span>
          </div>
          <div>
            <span>Age</span>: <span>{values.profile.age}</span>
          </div>
        </Flex>
      </Flex>

      <Grid columns="2" gap="2">
        <Button variant={'outline'} onClick={prevStep}>
          Back
        </Button>
        <Button type={'submit'}>Create Account</Button>
      </Grid>
    </Flex>
  );
}
