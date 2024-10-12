import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addContact } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleNumberChange = useCallback((e) => setNumber(e.target.value), []);

  const isContactExist = useMemo(() => {
    return contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  }, [contacts, name]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isContactExist) {
        alert(`${name} is already in contacts.`);
        return;
      }
      dispatch(addContact({ id: nanoid(), name, number }));
      setName("");
      setNumber("");
    },
    [dispatch, isContactExist, name, number]
  );

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Phone number"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
