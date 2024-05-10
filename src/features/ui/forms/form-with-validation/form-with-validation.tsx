import { Form } from 'tamagui';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { FormWithValidationProps } from './types';
import { FormField } from '@/features/ui/inputs/input-with-label/form-input';
import { SubmitButton } from '@/features/ui/buttons/submit-button/submit-button';

export const FormWithValidation = ({
  formName,
  validationSchema,
  initialValues,
  onSubmit,
  title,
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
            <FormField
              key={key}
              label={label}
              name={`${key}-${formName}}`}
              value={values[key]}
              error={errors[key] as string | undefined}
              onChangeText={handleChange(key)}
              onBlur={handleBlur(key)}
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
              }>
              {title}
            </SubmitButton>
          </Form.Trigger>
        </Form>
      )}
    </Formik>
  );
};
