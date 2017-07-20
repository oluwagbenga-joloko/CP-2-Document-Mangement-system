import chai, { expect } from 'chai';
import log from 'npmlog';
import chaiHttp from 'chai-http';
import app from '../../../serverProd';
import fakeData from '../testUtils/fakeData';
import db from '../../models';
import seeder from '../testUtils/seeder';

chai.use(chaiHttp);
const request = chai.request(app);
const adminUser = fakeData.validAdmin;
const validUser = fakeData.generateRandomUser();
const noPasswordUser = fakeData.noPasswordUser;
const invalidEmailUser = fakeData.invalidEmailUser;
const invalidPasswordUser = fakeData.invalidPasswordUser;
const firstRegularUser = fakeData.firstRegularUser;
const secondRegularUser = fakeData.thirdRegularUser;
const thirdRegularUser = fakeData.fourthRegularUser;
let adminToken;
let regularToken;

describe('User controller', () => {
  before((done) => {
    seeder.init().then(() => {
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
    log.info('message :  ', 'resseting Database.......');
    db.sequelize.sync({ force: true }).then(() => {
      log.info('message :  ', 'Database reset succesful');
      done();
    });
  });
  describe('POST /api/users/', () => {
    it('should allows users signup and return a token.', (done) => {
      request
        .post('/api/users')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.token).to.not.equal(undefined);
          expect(res.body.message).to.equal('user created succesfully');
          done();
        });
    });
    it('should not allow existing user signup.', (done) => {
      request
        .post('/api/users')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal('user email already used');
          done();
        });
    });
    it('should not allow users with invalid email to signup.', (done) => {
      request
        .post('/api/users')
        .send(invalidEmailUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal('invalid email');
          done();
        });
    });
    it('should not allow users with invalid password to signup.', (done) => {
      request
        .post('/api/users')
        .send(invalidPasswordUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal('password cannot be empty');
          done();
        });
    });
  });
  describe('POST /api/users/login', () => {
    it('should registered users login and return a token.', (done) => {
      request
        .post('/api/users/login')
        .send({ email: firstRegularUser.email,
          password: firstRegularUser.password })
        .end((err, res) => {
          regularToken = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body.token).to.not.equal(undefined);
          expect(res.body.message).to.equal('login succesful');
          done();
        });
    });
    it(`should not allow registered users with 
       invalid password login.`, (done) => {
      request
        .post('/api/users/login')
        .send({ email: firstRegularUser.email, password: 'invalid' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal('invalid password');
          done();
        });
    });
    it('should not allow user with non registered email login.', (done) => {
      request
        .post('/api/users/login')
        .send({ email: 'blah.blah@blah.blah', password: 'invalid' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal('email not found');
          done();
        });
    });
    it('should not allow user without pasword or email login.', (done) => {
      request
        .post('/api/users/login')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal('email and password required');
          done();
        });
    });
  });
  describe('GET /api/users/', () => {
    it('should allow admin to view all users', (done) => {
      request
        .get('/api/users/')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.not.equal(undefined);
          expect(res.body.users).to.be.an('array');
          done();
        });
    });
    it('should not allow regular user to view all users', (done) => {
      request
        .get('/api/users/')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          expect(res.body.users).to.equal(undefined);
          done();
        });
    });
  });
  describe('Get /api/users/:id', () => {
    it('should allow admin to view any users profile', (done) => {
      request
        .get('/api/users/2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user).to.not.equal(undefined);
          expect(res.body.user.email).to.equal(firstRegularUser.email);
          expect(res.body.user).to.be.a('object');
          done();
        });
    });
    it('should not allow admin to view any invalid user profile', (done) => {
      request
        .get('/api/users/abc')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should admin to view non existent user profile', (done) => {
      request
        .get('/api/users/788787')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.message).to.equal('user not found');
          done();
        });
    });
    it('should allow regular user to view his profile', (done) => {
      request
        .get('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user).to.not.equal(undefined);
          expect(res.body.user.email).to.equal(firstRegularUser.email);
          expect(res.body.user).to.be.a('object');
          done();
        });
    });
    it('should not allow regular user to view other users profile', (done) => {
      request
        .get('/api/users/4')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          expect(res.body.users).to.equal(undefined);
          done();
        });
    });
  });
  describe('PUT /api/users/', () => {
    it(`should not allow users to edit 
      their profile with invalid details`, (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .send(invalidEmailUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it(`should allow all users to edit their 
       profile without changing their password`, (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .send(noPasswordUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('profile update success');
          done();
        });
    });
    it('should allow all users to edit their profile', (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .send(thirdRegularUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('profile update success');
          done();
        });
    });
    it('should not allow users to edit other users profile', (done) => {
      request
        .put('/api/users/3')
        .set({ 'x-access-token': regularToken })
        .send({ secondRegularUser })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
    it('should allow admin update user role', (done) => {
      request
        .put('/api/users/abc')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'bola', lastName: 'mark', roleId: 3 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it(`should not allow admin update user
      role only for non existent user`, (done) => {
      request
        .put('/api/users/56656')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'bola', lastName: 'mark', roleId: 3 })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('should allow admin update user role only', (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'bola', lastName: 'mark', roleId: 3 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user.roleId).to.equal(3);
          expect(res.body.user.firstName).to.equal(thirdRegularUser.firstName);
          expect(res.body.user.lastName).to.equal(thirdRegularUser.lastName);
          expect(res.body.user.fistName).to.not.equal('bola');
          expect(res.body.user.lastName).to.not.equal('mark');
          done();
        });
    });
    it('should not allow admin update a regular user to an Admin', (done) => {
      request
        .put('/api/users/2')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'bola', lastName: 'mark', roleId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.equal('cannot make user admin');
          done();
        });
    });
  });
  describe('DELETE /api/users/:id', () => {
    it('should allow admin to delete any user profile', (done) => {
      request
        .delete('/api/users/3')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should not allow admin to delete non existent user profile', (done) => {
      request
        .delete('/api/users/9000')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('user not found');
          done();
        });
    });
    it('should not allow admin to delete his own profile', (done) => {
      request
        .delete('/api/users/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.equal('cannot delete admin profile');
          done();
        });
    });
    it(`should not allow regular user delete 
       other users profile`, (done) => {
      request
        .delete('/api/users/4')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
    it('it should allow regular user to get his  profile', (done) => {
      request
        .get('/api/users/2')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it(`it should not not allow admin to
        delete non existent user profile`, (done) => {
      request
        .get('/api/users/28888')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('user not found');
          done();
        });
    });
  });
  describe('POST /api/users/logout', () => {
    it('should send a response on logout', (done) => {
      request
        .post('/api/users/logout')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
