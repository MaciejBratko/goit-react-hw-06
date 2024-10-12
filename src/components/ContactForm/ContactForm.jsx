import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const AddContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
  number: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    onAdd(newContact);
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={AddContactSchema}
    >
      <Form className={css.form}>
        <div>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={css.field}
          ></Field>
          <ErrorMessage name="name" as="span" />
        </div>

        <div>
          <label htmlFor={numberId}>Number</label>
          <Field
            type="text"
            name="number"
            id={numberId}
            className={css.field}
          ></Field>
          <ErrorMessage name="number" as="span" />
        </div>

        <button type="submit" className={css.addContact}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
