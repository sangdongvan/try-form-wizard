'use client';

import React, {
  HTMLProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import * as PrimitiveForm from '@radix-ui/react-form';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { Path, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import './wizard-form.css';

interface WizardFormProps<T extends z.ZodType> {
  schema: T;
  form: UseFormReturn<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  useStepTransition?: boolean;
  className?: string;
}

type StepProps = React.PropsWithChildren<
  {
    name: string;
    asChild?: boolean;
  } & React.HTMLProps<HTMLDivElement>
>;

const WizardFormContext = createContext<ReturnType<
  typeof useWizardForm
> | null>(null);

function WizardFormRoot<T extends z.ZodType>({
  schema,
  form,
  onSubmit,
  children,
  className,
}: React.PropsWithChildren<WizardFormProps<T>>) {
  const steps = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<StepProps> =>
          React.isValidElement(child) && child.type === WizardFormStep,
      ),
    [children],
  );

  const header = useMemo(() => {
    return React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === WizardFormHeader,
    );
  }, [children]);

  const footer = useMemo(() => {
    return React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === WizardFormFooter,
    );
  }, [children]);

  const stepNames = steps.map((step) => step.props.name);
  const wizardFormStep = useWizardForm(schema, form, stepNames);

  return (
    <WizardFormContext.Provider value={wizardFormStep}>
      <PrimitiveForm.Root
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
      >
        {header}

        <div>
          {steps.map((step, index) => {
            const isActive = index === wizardFormStep.currentStepIndex;
            return isActive ? (
              <AnimatePresence key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {step}
                </motion.div>
              </AnimatePresence>
            ) : undefined;
          })}
        </div>

        {footer}
      </PrimitiveForm.Root>
    </WizardFormContext.Provider>
  );
}

WizardFormRoot.displayName = 'WizardForm.Root';

export function WizardFormContextProvider(props: {
  children: (context: ReturnType<typeof useWizardForm>) => React.ReactNode;
}) {
  const ctx = useWizardFormContext();

  if (Array.isArray(props.children)) {
    const [child] = props.children;

    return (
      child as (context: ReturnType<typeof useWizardForm>) => React.ReactNode
    )(ctx);
  }

  return props.children(ctx);
}

const WizardFormStep = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function WizardFormStep({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';

  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});

WizardFormStep.displayName = 'WizardForm.Step';

export function useWizardFormContext<Schema extends z.ZodType>() {
  const context = useContext(WizardFormContext) as ReturnType<
    typeof useWizardForm<Schema>
  >;

  if (!context) {
    throw new Error('useWizardFormContext must be used within a WizardForm');
  }

  return context;
}

/**
 * @name useWizardForm
 * @description Hook for wizard forms
 * @param schema
 * @param form
 * @param stepNames
 */
export function useWizardForm<Schema extends z.ZodType>(
  schema: Schema,
  form: UseFormReturn<z.infer<Schema>>,
  stepNames: string[],
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>();

  const isStepValid = useCallback(() => {
    const currentStepName = stepNames[currentStepIndex] as Path<
      z.TypeOf<Schema>
    >;

    if (schema instanceof z.ZodObject) {
      const currentStepSchema = schema.shape[currentStepName] as z.ZodType;

      // the user may not want to validate the current step
      // or the step doesn't contain any form field
      if (!currentStepSchema) {
        return true;
      }

      const currentStepData = form.getValues(currentStepName) ?? {};
      const result = currentStepSchema.safeParse(currentStepData);

      return result.success;
    }

    throw new Error(`Unsupported schema type: ${schema.constructor.name}`);
  }, [schema, form, stepNames, currentStepIndex]);

  const nextStep = useCallback(
    <Ev extends React.SyntheticEvent>(e: Ev) => {
      // prevent form submission when the user presses Enter
      // or if the user forgets [type="button"] on the button
      e.preventDefault();

      const isValid = isStepValid();

      if (!isValid) {
        const currentStepName = stepNames[currentStepIndex] as Path<
          z.TypeOf<Schema>
        >;

        if (schema instanceof z.ZodObject) {
          const currentStepSchema = schema.shape[currentStepName] as z.ZodType;

          if (currentStepSchema) {
            const fields = Object.keys(
              (currentStepSchema as z.ZodObject<never>).shape,
            );
            const keys = fields.map((field) => `${currentStepName}.${field}`);

            // trigger validation for all fields in the current step
            for (const key of keys) {
              void form.trigger(key as Path<z.TypeOf<Schema>>);
            }

            return;
          }
        }
      }

      if (isValid && currentStepIndex < stepNames.length - 1) {
        setDirection('forward');
        setCurrentStepIndex((prev) => prev + 1);
      }
    },
    [isStepValid, currentStepIndex, stepNames, schema, form],
  );

  const prevStep = useCallback(
    <Ev extends React.SyntheticEvent>(e: Ev) => {
      // prevent form submission when the user presses Enter
      // or if the user forgets [type="button"] on the button
      e.preventDefault();

      if (currentStepIndex > 0) {
        setDirection('backward');
        setCurrentStepIndex((prev) => prev - 1);
      }
    },
    [currentStepIndex],
  );

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < stepNames.length && isStepValid()) {
        setDirection(index > currentStepIndex ? 'forward' : 'backward');
        setCurrentStepIndex(index);
      }
    },
    [isStepValid, stepNames.length, currentStepIndex],
  );

  const isValid = form.formState.isValid;
  const errors = form.formState.errors;

  return useMemo(
    () => ({
      form,
      currentStep: stepNames[currentStepIndex] as string,
      currentStepIndex,
      totalSteps: stepNames.length,
      isFirstStep: currentStepIndex === 0,
      isLastStep: currentStepIndex === stepNames.length - 1,
      nextStep,
      prevStep,
      goToStep,
      direction,
      isStepValid,
      isValid,
      errors,
    }),
    [
      form,
      stepNames,
      currentStepIndex,
      nextStep,
      prevStep,
      goToStep,
      direction,
      isStepValid,
      isValid,
      errors,
    ],
  );
}

const WizardFormHeader = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function WizardFormHeader({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';

  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});

WizardFormHeader.displayName = 'WizardForm.Header';

const WizardFormFooter = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function WizardFormFooter({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';

  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});
WizardFormFooter.displayName = 'WizardForm.Footer';

/**
 * @name createStepSchema
 * @description Create a schema for a wizard form
 * @param steps
 */
export function createStepSchema<T extends Record<string, z.ZodType>>(
  steps: T,
) {
  return z.object(steps);
}

export {
  WizardFormRoot as Root,
  WizardFormHeader as Header,
  WizardFormFooter as Footer,
  WizardFormStep as Step,
};
