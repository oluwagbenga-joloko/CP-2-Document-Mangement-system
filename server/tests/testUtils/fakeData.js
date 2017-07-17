import faker from 'faker';

const fakeData = {
  adminRole: {
    title: 'Admin'
  },
  fellowRole: {
    title: 'Fellow'
  },
  regularRole: {
    title: 'Regular user'
  },
  invalidRole: {
    title: '%%$$#@(++'
  },
  emptyRole: {
    title: ''
  },
  invalidEmailUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'lorem ipsum',
    roleId: 2,
    password: faker.internet.password(),
  },
  invalidPasswordUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: '',
  },
  noPasswordUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '',
    roleId: 2,
  },
  validAdmin: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 1,
    password: faker.internet.password()
  },
  firstRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  secondRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  thirdRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  fourthRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  emtptyTitleDocument: {
    title: '',
    content: faker.lorem.paragraphs(),
    access: 'public',
  },
  emptyContentDocument: {
    title: faker.lorem.word(),
    content: '',
    access: 'public',
  },
  invalidAccessDocument: {
    ownerRoleId: 2,
    userId: 2,
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'fakeAccess',
  },
  firstPublicDocument: {
    userId: 2,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'public',
    ownerRoleId: 2
  },
  secondPublicDocument: {
    userId: 2,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'public',
    ownerRoleId: 2
  },
  thirdPublicDocument: {
    userId: 2,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'public',
    ownerRoleId: 2,
  },
  fourthPublicDocument: {
    userId: 1,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'public',
    ownerRoleId: 1
  },
  firstRoleDocument: {
    userId: 3,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'role',
    ownerRoleId: 2
  },
  secondRoleDocument: {
    userId: 3,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'role',
    ownerRoleId: 2,
  },
  thirdRoleDocument: {
    userId: 1,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'role',
    ownerRoleId: 1
  },
  firstPrivateDocument: {
    userId: 4,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'private',
    ownerRoleId: 2
  },
  secondPrivateDocument: {
    userId: 4,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'private',
    ownerRoleId: 2
  },
  thirdPrivateDocument: {
    userId: 1,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    access: 'private',
    ownerRoleId: 1,
  },
  generateRandomUser(roleId) {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      roleId,
      password: faker.internet.password()
    };
  },
  generateRandomRole() {
    return {
      title: faker.lorem.word()
    };
  },
  generateRandomDocument(access) {
    return {
      title: faker.lorem.word(),
      content: faker.lorem.paragraphs(),
      access,
    };
  },
};
export default fakeData;
