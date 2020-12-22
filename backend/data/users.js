import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Juan Suazo',
    email: 'juan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Delete Me Please',
    email: 'delete@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
