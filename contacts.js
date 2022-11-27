const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const readContactsData = async () => {
  try {
    const fileData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(fileData.toString());

    return contacts;
  } catch (error) {
    console.warn("\x1B[31m " + error);
  }
};

const listContacts = async () => {
  console.table(await readContactsData());
};

const getContactById = async (contactId) => {
  if (isNaN(parseInt(contactId)))
    return console.warn(`\x1B[31m Invalid ID - ${contactId}.`);

  const contactsData = await readContactsData();

  const resultContact = contactsData.filter(
    (contact) => contact.id === contactId.toString()
  );

  if (!resultContact.length)
    return console.warn(`\x1B[31m There is no contact with ID - ${contactId}.`);

  console.table(resultContact);
};

const removeContact = async (contactId) => {
  if (isNaN(parseInt(contactId)))
    return console.warn(`\x1B[31m Invalid ID - ${contactId}.`);

  const contactsData = await readContactsData();

  const resultContacts = contactsData.filter(
    (contact) => contact.id !== contactId.toString()
  );

  if (resultContacts.length === contactsData.length)
    return console.warn(`\x1B[31m There is no contact with ID - ${contactId}.`);

  try {
    fs.writeFile(contactsPath, JSON.stringify(resultContacts));
    console.log(`Contact with ID - ${contactId} was successfully deleted.`);
  } catch (error) {
    console.warn("\x1B[31m " + error);
  }
};

const addContact = async (name, email, phone) => {
  if (!name) return console.warn("\x1B[31m Name is required.");
  if (!email) return console.warn("\x1B[31m Email is required.");
  if (!phone) return console.warn("\x1B[31m Phone is required.");

  const contactsData = await readContactsData();

  const nextId =
    Math.max(...contactsData.map((contact) => parseInt(contact.id))) + 1;

  const resultContactsData = [
    ...contactsData,
    { id: nextId.toString(), name, email, phone },
  ];

  try {
    fs.writeFile(contactsPath, JSON.stringify(resultContactsData));
    console.log(`Contact "${name}" was successfully added.`);
  } catch (error) {
    console.warn("\x1B[31m " + error);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
