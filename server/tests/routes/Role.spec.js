import log from 'npmlog';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../serverProd';
import fakeData from '../testUtils/fakeData';
import db from '../../models';
import seeder from '../testUtils/seeder';

chai.use(chaiHttp);
const request = chai.request(app),
  adminUser = fakeData.validAdmin,
  regulerUser1 = fakeData.regulerUser1,
  randomRole1 = fakeData.generateRandomRole(),
  randomRole2 = fakeData.generateRandomRole(),
  invalidRole = fakeData.invalidRole,
  emptyRole = fakeData.emptyRole,
  updateRole = fakeData.generateRandomRole();
let adminToken, regularToken;

describe('Routes : Roles', () => {
  before((done) => {
    seeder.init().then(() => {
      request
        .post('/api/users/login')
        .send({ email: adminUser.email, password: adminUser.password })
        .end((err, res) => {
          adminToken = res.body.token;
        });
      request
        .post('/api/users/login')
        .send({ email: regulerUser1.email, password: regulerUser1.password })
        .end((err, res) => {
          regularToken = res.body.token;
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
  describe('POST /api/roles/', () => {
    it('should allow admin to create roles', (done) => {
      request
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send(randomRole1)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it(`should not allow admin to create roles 
        with existing titles`, (done) => {
      request
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send(randomRole1)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal('Role already exists');
          done();
        });
    });
    it(`should not allow admin to create roles with 
        invalid characters to be created`, (done) => {
      request
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send(invalidRole)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal(
            'Only letter and numbers are allowed');
          done();
        });
    });
    it('should not allow admin to create roles with empty title', (done) => {
      request
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send(emptyRole)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal('title cannot be empty');
          done();
        });
    });
    it('should not allow regular user to create roles', (done) => {
      request
        .post('/api/roles')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          expect(res.body.role).to.equal(undefined);
          done();
        });
    });
  });
  describe('GET /api/roles/', () => {
    it('should allow admin to get all roles', (done) => {
      request
        .get('/api/roles')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.roles).to.be.an('array');
          expect(res.body.roles[0].title).to.be.equal('Admin');
          expect(res.body.roles[1].title).to.be.equal('Regular user');
          expect(res.body.roles[3].title).to.be.equal(randomRole1.title);
          done();
        });
    });
    it('should allow admin to get all roles with invalid token', (done) => {
      request
        .get('/api/roles')
        .set({ 'x-access-token': 'adminToken' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should not allow regular user to get all roles', (done) => {
      request
        .get('/api/roles')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          expect(res.body.roles).to.equal(undefined);
          done();
        });
    });
  });
  describe('GET /api/roles/:id', () => {
    it('should allow admin to get specified role', (done) => {
      request
        .get('/api/roles/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.role).to.be.an('object');
          expect(res.body.role.id).to.equal(1);
          done();
        });
    });
    it('should not allow admin to get invalid role', (done) => {
      request
        .get('/api/roles/dfdfd')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should not allow admin to get non existent role', (done) => {
      request
        .get('/api/roles/7888')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal('Role not found');
          done();
        });
    });
    it('should not allow regular user to get all role', (done) => {
      request
        .get('/api/roles/2')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          expect(res.body.roles).to.equal(undefined);
          done();
        });
    });
  });
  describe('PUT /api/roles/:id', () => {
    it('should not allow admin to update invalid role', (done) => {
      request
        .put('/api/roles/dfdfd')
        .set({ 'x-access-token': adminToken })
        .send(updateRole)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should not allow admin to update admin roles', (done) => {
      request
        .put('/api/roles/1')
        .set({ 'x-access-token': adminToken })
        .send(updateRole)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.be.equal('Cannot update Admin role');
          done();
        });
    });
    it(`should not allow admin to update 
       Regular user roles`, (done) => {
      request
        .put('/api/roles/2')
        .set({ 'x-access-token': adminToken })
        .send(updateRole)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.be.equal(
            'Cannot update Regular user role');
          done();
        });
    });
    it(`should allow not allow admin to 
    update non existent roles`, (done) => {
      request
        .put('/api/roles/56666')
        .set({ 'x-access-token': adminToken })
        .send(updateRole)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.be.equal('Role not found');
          done();
        });
    });
    it(`should not allow admin to update
     roles with existing titles`, (done) => {
      request
        .put('/api/roles/3')
        .set({ 'x-access-token': adminToken })
        .send(randomRole1)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal('Role already exists');
          done();
        });
    });
    it(`should  not allow admin to update 
    roles with invalid characters in title`, (done) => {
      request
        .put('/api/roles/4')
        .set({ 'x-access-token': adminToken })
        .send(invalidRole)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal(
            'Only letter and numbers are allowed');
          done();
        });
    });
    it('should not allow admin to update roles with empty title', (done) => {
      request
        .put('/api/roles/4')
        .set({ 'x-access-token': adminToken })
        .send(emptyRole)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.role).to.equal(undefined);
          expect(res.body.message).to.equal('title cannot be empty');
          done();
        });
    });
    it(`should allow admin to update roles that exists
     and are not admin or regular role`, (done) => {
      request
        .put('/api/roles/4')
        .set({ 'x-access-token': adminToken })
        .send(updateRole)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.role.title).to.equal(updateRole.title);
          done();
        });
    });
    it('should not allow regular users to update roles', (done) => {
      request
        .put('/api/roles/4')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
  });
  describe('DELETE /api/roles/:id', () => {
    it('should not allow admin to delete invalid role', (done) => {
      request
        .delete('/api/roles/dfdfd')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should allow not allow admin to delete admin roles', (done) => {
      request
        .delete('/api/roles/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.be.equal('Cannot delete Admin role');
          done();
        });
    });
    it(`it should allow not allow admin
        to delete Regular user roles`, (done) => {
      request
        .delete('/api/roles/2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.be.equal(
            'Cannot delete Regular user role');
          done();
        });
    });
    it(`it shouldnot allow admin to delete non
       existent roles`, (done) => {
      request
        .delete('/api/roles/56666')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.be.equal('Role not found');
          done();
        });
    });
    it(`it should allow admin to delete roles that exists 
       and are not admin or regular role`, (done) => {
      request
        .delete('/api/roles/3')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('it should not allow regular users to delete roles', (done) => {
      request
        .delete('/api/roles/4')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
  });
});

