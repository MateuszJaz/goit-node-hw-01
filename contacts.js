const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const contact = contacts.find((c) => c.id.toString() === contactId);
  return contact;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const updatedContacts = contacts.filter((c) => c.id !== contactId.toString());
  if (updatedContacts.length === contacts.length) {
    throw new Error(`Contact with id ${contactId} not found.`);
  }
  const updatedContactsJSON = JSON.stringify(updatedContacts);
  await fs.writeFile(contactsPath, updatedContactsJSON);
  return `Contact with id ${contactId} deleted.`;
}

async function addContact(_, name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const newContact = {
    id: (contacts.length + 1).toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  const updatedContacts = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, updatedContacts);
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
