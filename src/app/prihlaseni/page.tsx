"use client";

import InputField from "@/components/forms/InputField";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function Page() {
  const formValidationSchema = z.object({
    email: z
      .string({
        required_error: "Vyplňte prosím e-mail",
        invalid_type_error: "Neplatný typ",
      })
      .email("Neplatný e-mail"),

    password: z
      .string({
        required_error: "Vyplňte prosím e-mail",
        invalid_type_error: "Neplatný typ",
      })
      .min(6, "Heslo příliš krátké"),
  });

  const formik = useFormik({
    // Field names should match `name` prop in InputField component
    initialValues: {
      email: "",
      password: "",
    },
    // Function to handle form submission
    onSubmit: async (values, actions) => {
      console.log(values);

      return await (
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
      ).json();
    },

    // Connect validation schema to formik
    validationSchema: toFormikValidationSchema(formValidationSchema),

    // Validation behavior setup
    validateOnChange: false,
    validateOnBlur: true,
  });

  const formWasTouched = formik.submitCount > 0;

  return (
    <Container className="my-16 flex justify-center py-20 pt-24 text-black sm:my-32 xl:my-64">
      <div className="w-full space-y-4 rounded-2xl border-2 border-primary-200 bg-white p-8 sm:w-2/3 xl:w-1/3">
        <Heading size="md">Přihlášení</Heading>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            type="email"
            name="email"
            placeholder="Email@email.com"
            value={formik.values.email}
            errorText={
              formWasTouched && formik.touched.email && formik.errors.email
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></InputField>
          <InputField
            type="password"
            name="password"
            placeholder="Heslo"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={
              formWasTouched &&
              formik.touched.password &&
              formik.errors.password
            }
            onBlur={formik.handleBlur}
          ></InputField>
          <div className="flex items-start justify-between border-b border-primary-200 pb-6">
            <StyledLink>Zapomenuté heslo?</StyledLink>
            <Button
              className="items-end"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Přihlásit se
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-end gap-1">
          <p>Nemáte účet?</p>
          <StyledLink href="registrace" className="font-bold">
            Zaregistrujte se
          </StyledLink>
        </div>
      </div>
    </Container>
  );
}
