const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const readContactsData = async () => {
  try {
    const fileData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(fileData.toString());

    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const listContacts = async () => {
  console.table(await readContactsData());
};

const getContactById = async (contactId) => {
  if (isNaN(parseInt(contactId)))
    return console.error(`Invalid ID - ${contactId}`);

  const contactsData = await readContactsData();

  const resultContact = contactsData.filter(
    (contact) => contact.id === contactId.toString()
  );

  if (!resultContact.length)
    return console.error(`There is no contact with ID - ${contactId}.`);

  console.table(resultContact);
};

const removeContact = (contactId) => {
  // ...твой код
};

const addContact = (name, email, phone) => {
  // ...твой код
};

module.exports = { listContacts, getContactById, removeContact, addContact };
