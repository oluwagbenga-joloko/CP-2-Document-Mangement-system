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
  regulerUser1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  regulerUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  regulerUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  regulerUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    password: faker.internet.password()
  },
  regulerUser5: {
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
  emtptyContentDocument: {
    title: faker.lorem.word(),
    content: '',
    access: 'public',
  },
  publicDocument1: {
    userId: 2,
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerRoleId: 2
  },
  publicDocument2: {
    userId: 2,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'public',
    ownerRoleId: 2
  },
  publicDocument3: {
    userId: 2,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'public',
    ownerRoleId: 2,
  },
  publicDocument4: {
    userId: 1,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'public',
    ownerRoleId: 1
  },
  roleDocument1: {
    userId: 3,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'role',
    ownerRoleId: 2
  },
  roleDocument2: {
    userId: 3,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'role',
    ownerRoleId: 2,
  },
  roleDocument3: {
    userId: 1,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'role',
    ownerRoleId: 1
  },
  privateDocument1: {
    userId: 4,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'private',
    ownerRoleId: 2
  },
  privateDocument2: {
    userId: 4,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
    access: 'private',
    ownerRoleId: 2
  },
  privateDocument3: {
    userId: 1,
    title: faker.lorem.word(),
    content: faker.lorem.text(),
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
