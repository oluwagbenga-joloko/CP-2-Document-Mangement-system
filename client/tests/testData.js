const user = { firstName: 'bola', lastName: 'yemi', email: 'bola@gmail.com', roleId: 1, id: 20 };
const document = {
  title: 'test',
  content: 'test',
  access: 'public',
  userId: 20,
  id: 10,
  creator: 'bola',
};
const documents = [
  {
    id: 90,
    title: 'test',
    content: 'test',
    access: 'public',
    userId: 20,
    User: { firstName: 'bola', lastName: 'bola' }
  },
  {
    id: 91,
    title: 'test',
    content: 'test',
    access: 'role',
    userId: 20,
    User: { firstName: 'bola', lastName: 'bola' }
  }
];
const pagination = {
  pageCount: 10,
  page: 2,
  pageSize: 10,
  totalCount: 20,
};
const match = { params: { id: 12 } };
const location = {
  search: '?access=public&query=test&page=4',
  pathname: ''
};
const users = [
  {
    firstName: 'bola',
    lastName: 'shola',
    email: 'bola@gmail.com',
    id: 22,
    Role: { title: 'regular user' },
    roleId: 2,
  },
  {
    firstName: 'bola',
    lastName: 'shola',
    email: 'bola@gmail.com',
    id: 22,
    Role: { title: 'regular user' },
    roleId: 2,
  }
];
const search = {
  query: '',
  access: '',
  limit: 1,
  offset: 1,
};
export { user, document, documents, pagination, match, location, users, search };

