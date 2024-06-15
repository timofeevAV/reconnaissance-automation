import { Form } from 'tamagui';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { FormWithValidationProps } from './types';
import { InputWithLabel } from '@/features/ui/inputs/input-with-label/input-with-label';
import { SubmitButton } from '@/features/ui/buttons/submit-button/submit-button';

export const FormWithValidation = ({
  formName,
  validationSchema,
  initialValues,
  onSubmit,
  title,
  buttonProps,
  ...props
}: FormWithValidationProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(validationSchema)}
      initialValues={initialValues.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as { [key: string]: any },
      )}
      onSubmit={onSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isSubmitting,
        errors,
      }) => (
        <Form
          onSubmit={handleSubmit}
          {...props}>
          {initialValues.map(({ key, label, additionalProps }) => (
            <InputWithLabel
              key={key}
              label={label}
              name={`${key}-${formName}}`}
              value={values[key]}
              error={errors[key] as string | undefined}
              onChangeText={handleChange(key)}
              onBlur={handleBlur(key)}
              theme={'active'}
              {...additionalProps}
            />
          ))}
          <Form.Trigger
            mt="$6"
            asChild>
            <SubmitButton
              isSubmitting={isSubmitting}
              disabled={
                isSubmitting ||
                Object.values(values).some(v => !v) ||
                Object.values(errors).some(Boolean)
              }
              {...buttonProps}>
              {title}
            </SubmitButton>
          </Form.Trigger>
        </Form>
      )}
    </Formik>
  );
};
