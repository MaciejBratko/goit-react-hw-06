import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { deleteContact } from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteContact(id));
    },
    [dispatch]
  );

  return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <Contact key={contact.id} data={contact} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
