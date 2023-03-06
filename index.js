const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(`${id}`);
      console.log("Contact by ID:", contact);
      break;

    case "add":
      const newContact = await addContact(id, name, email, phone);
      console.log("New contact added:", newContact);
      break;

    case "remove":
      const result = await removeContact(id);
      console.log("Remove contact result:", result);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
