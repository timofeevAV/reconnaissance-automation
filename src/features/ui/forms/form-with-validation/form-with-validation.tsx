import { Form } from "tamagui";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWithValidationProps } from "./types";
import { FormInput } from "@features/ui/inputs/input-with-label/form-input";
import { SubmitButton } from "@features/ui/buttons/submit-button/submit-button";

export const FormWithValidation = (props: FormWithValidationProps) => {
  const { formName, validationSchema, initialValues, onSubmit, title } = props;

  return (
    <Formik
      validationSchema={toFormikValidationSchema(validationSchema)}
      initialValues={Object.fromEntries(
        initialValues.map(({ key, value }) => [key, value])
      )}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isSubmitting,
        errors,
      }) => (
        <Form onSubmit={handleSubmit} paddingHorizontal="$3">
          {initialValues.map(({ key, label, additionalProps }) => (
            <FormInput
              key={key + formName}
              label={label}
              name={key + formName}
              value={values[key]}
              error={errors[key] as string | undefined}
              handleChangeText={handleChange(key)}
              handleBlur={handleBlur(key)}
              rest={additionalProps}
            />
          ))}
          <Form.Trigger
            mt="$5"
            disabled={
              isSubmitting ||
              Object.values(values).some((v) => !v) ||
              Object.values(errors).some(Boolean)
            }
            asChild
          >
            <SubmitButton isSubmitting={isSubmitting} variant="outlined">
              {title}
            </SubmitButton>
          </Form.Trigger>
        </Form>
      )}
    </Formik>
  );
};
