const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const program = new Command();

program
  .option("-a, --action <type>", "Choose action")
  .option("-i, --id <type>", "User id")
  .option("-n, --name <type>", "User name")
  .option("-e, --email <type>", "User email")
  .option("-p, --phone <type>", "User phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
