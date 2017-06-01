import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import fakeData from '../testUtils/FakeData';
import db from '../../models';
import Seeddb from '../testUtils/SeedDb';

chai.use(chaiHttp);

const request = chai.request(app),
  adminUser = fakeData.validAdmin,
  validUser = fakeData.generateRandomUser(),
  invalidEmailUser = fakeData.invalidEmailUser,
  invalidPasswordUser = fakeData.invalidPasswordUser,
  regulerUser1 = fakeData.regulerUser1,
  regulerUser5 = fakeData.regulerUser3,
  regulerUser4 = fakeData.regulerUser4;
  // regulerUser2 =
//   randomRole1 = fakeData.generateRandomRole(),
//   randomRole2 = fakeData.generateRandomRole(),
//   invalidRole = fakeData.invalidRole,
//   emptyRole = fakeData.emptyRole,
//   updateRole = fakeData.generateRandomRole();
let adminToken, regularToken;

describe('Routes : Users', () => {
  before((done) => {
    Seeddb.init().then(() => {
      request
        .post('/api/users/login')
        .send({ email: adminUser.email, password: adminUser.password })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });
  });
  after((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      console.log('data base reset succesful');
      done();
    });
  });
  describe('POST /api/users/', () => {
    it('it should allows users signup and return a token.', (done) => {
      request
        .post('/api/users')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.user.firstName).to.equal(validUser.firstName);
          expect(res.body.user.lastName).to.equal(validUser.lastName);
          expect(res.body.user.email).to.equal(validUser.email);
          expect(res.body.token).to.not.equal(undefined);
          expect(res.body.msg).to.equal('user created succesfully');
          done();
        });
    });
    it('it should not allow existing user signup.', (done) => {
      request
        .post('/api/users')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.msg).to.equal('user email already used');
          done();
        });
    });
    it('it should not allow users with invalid email to signup.', (done) => {
      request
        .post('/api/users')
        .send(invalidEmailUser)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.msg).to.equal('invalid email');
          done();
        });
    });
    it('it should not allow users with invalid password to signup.', (done) => {
      request
        .post('/api/users')
        .send(invalidPasswordUser)
        .end((err, res) => {
            // console.log(res.body)
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.msg).to.equal('password cannot be empty');
          done();
        });
    });
  });
  describe('POST /api/users/login', () => {
    it('it should allows users registered users login and return a token.', (done) => {
      request
        .post('/api/users/login')
        .send({ email: regulerUser1.email, password: regulerUser1.password })
        .end((err, res) => {
          regularToken = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user.firstName).to.equal(regulerUser1.firstName);
          expect(res.body.user.lastName).to.equal(regulerUser1.lastName);
          expect(res.body.user.email).to.equal(regulerUser1.email);
          expect(res.body.token).to.not.equal(undefined);
          expect(res.body.msg).to.equal('login succesful');
          done();
        });
    });
    it('it should not allow registered users with invalid password login.', (done) => {
      request
        .post('/api/users/login')
        .send({ email: regulerUser1.email, password: 'invalid' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.msg).to.equal('invalid password');
          done();
        });
    });
    it('it should not allow user with non registered email login.', (done) => {
      request
        .post('/api/users/login')
        .send({ email: 'blah.blah@blah.blah', password: 'invalid' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.msg).to.equal('email not found');
          done();
        });
    });
  });
  describe('GET /api/users/', () => {
    it('it should admin to view all users', (done) => {
      request
        .get('/api/users/')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.users).to.not.equal(undefined);
          expect(res.body.users).to.be.an('array');
          done();
        });
    });
    it('it should not allow regular user to view all users', (done) => {
      request
        .get('/api/users/')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('unauthorized');
          expect(res.body.users).to.equal(undefined);
          done();
        });
    });
  });
  describe('Get /api/users/:id', () => {
    it('it should admin to view any users profile', (done) => {
      request
        .get('/api/users/2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user).to.not.equal(undefined);
          expect(res.body.user.email).to.equal(regulerUser1.email);
          expect(res.body.user).to.be.a('object');
          done();
        });
    });
    it('it should admin to view invalid users profile', (done) => {
      request
        .get('/api/users/788787')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.msg).to.equal('user not found');
          done();
        });
    });
    it('it should allow regular user to view his profile', (done) => {
      request
        .get('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user).to.not.equal(undefined);
          expect(res.body.user.email).to.equal(regulerUser1.email);
          expect(res.body.user).to.be.a('object');
          done();
        });
    });
    it('it should not allow regular user to view other users profile', (done) => {
      request
        .get('/api/users/4')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('unauthorized');
          expect(res.body.users).to.equal(undefined);
          done();
        });
    });
  });
  describe('PUT /api/users/', () => {
    it('it should allow all users to edit their profile', (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .send(regulerUser4)
        .end((err, res) => {
          console.log(res.body);
          // regularToken = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user.firstName).to.equal(regulerUser4.firstName);
          expect(res.body.user.lastName).to.equal(regulerUser4.lastName);
          done();
        });
    });
    it('it should  not allow users to edit other users profile', (done) => {
      request
        .put('/api/users/3')
        .set({ 'x-access-token': regularToken })
        .send({ regulerUser5 })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('unauthorized');
          done();
        });
    });
    it('it should  allow admin update user role only', (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'bola', lastName: 'mark', roleId: 3 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user.roleId).to.equal(3);
          expect(res.body.user.firstName).to.equal(regulerUser4.firstName);
          expect(res.body.user.lastName).to.equal(regulerUser4.lastName);
          expect(res.body.user.fistName).to.not.equal('bola');
          expect(res.body.user.lastName).to.not.equal('mark');
          done();
        });
    });
    it('it should  allow admin update user make any user Admin', (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'bola', lastName: 'mark', roleId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.msg).to.equal('cannot make user admin');
          done();
        });
    });
  });
  describe('DELETE /api/users/:id', () => {
    it('it should admin to delete any user profile', (done) => {
      request
        .delete('/api/users/3')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    it('it should not allow admin to delete his own profile', (done) => {
      request
        .delete('/api/users/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('cannot delete admin profile');
          done();
        });
    });
    it('it should not allow not allow regular user delete other users profile', (done) => {
      request
        .get('/api/users/4')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('unauthorized');
          done();
        });
    });
    it('it should not allow not allow regular user his  profile', (done) => {
      request
        .get('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    it('it should not allow not allow adming to delete non existent user profile', (done) => {
      request
        .get('/api/users/28888')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('user not found');
          done();
        });
    });



  });
});
