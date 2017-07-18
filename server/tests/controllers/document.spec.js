import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../serverProd';
import fakeData from '../testUtils/fakeData';
import db from '../../models';
import seeder from '../testUtils/seeder';

chai.use(chaiHttp);
const request = chai.request(app);
const adminUser = fakeData.validAdmin;
const firstRegularUser = fakeData.firstRegularUser;
const secondRegularUser = fakeData.secondRegularUser;
const emtptyTitleDocument = fakeData.emtptyTitleDocument;
const emptyContentDocument = fakeData.emptyContentDocument;
const privateDocument = fakeData.generateRandomDocument('private');
const firstPublicDocument = fakeData.generateRandomDocument('public');
const secondPublicDocument = fakeData.generateRandomDocument('public');
const roleDocument = fakeData.generateRandomDocument('role');
const updateDocument = fakeData.generateRandomDocument('role');
const invalidAccessDocument = fakeData.generateRandomDocument('radnom');

let adminToken;
let firstUserToken;
let secondUserToken;
let privateDocumentId;
let roleDocumentId;
let publicDocumentId;

describe('Document controller', () => {
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
        .send({ email: firstRegularUser.email,
          password: firstRegularUser.password })
        .end((err, res) => {
          firstUserToken = res.body.token;
        });
      request
        .post('/api/users/login')
        .send({ email: secondRegularUser.email,
          password: secondRegularUser.password })
        .end((err, res) => {
          secondUserToken = res.body.token;
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
  describe('POST /api/documents/', () => {
    it('should allow users to create private access documents', (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': firstUserToken })
        .send(privateDocument)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.document.title).to.equal(privateDocument.title);
          privateDocumentId = res.body.document.id;
          done();
        });
    });
    it(`should not allow users with invalid
    token to create a document`, (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': 'invalid token' })
        .send(secondPublicDocument)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should not allow users without token to create a document', (done) => {
      request
        .post('/api/documents')
        .send(secondPublicDocument)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should allow users to create a public access document', (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': secondUserToken })
        .send(firstPublicDocument)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.document.title).to.equal(firstPublicDocument.title);
          publicDocumentId = res.body.document.id;
          done();
        });
    });
    it('should allow users to create a role access document', (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': firstUserToken })
        .send(roleDocument)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.document.title).to.equal(roleDocument.title);
          roleDocumentId = res.body.document.id;
          done();
        });
    });

    it(`should not allow users to create a 
       document with invalid access`, (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': firstUserToken })
        .send(invalidAccessDocument)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            'access can either be public, private or role'
          );
          done();
        });
    });
    it('should not allow users to create'
    + ' a document with empty title', (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': firstUserToken })
        .send(emtptyTitleDocument)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please enter a title');
          done();
        });
    });
    it('should not allow users to create a'
    + ' document with empty content', (done) => {
      request
        .post('/api/documents')
        .set({ 'x-access-token': firstUserToken })
        .send(emptyContentDocument)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please enter content');
          done();
        });
    });
  });
  describe('GET /api/documents/', () => {
    it('should allow Admin to get all documents', (done) => {
      request
        .get('/api/documents')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it(`should allow regular
        user to get all documents`, (done) => {
      request
        .get('/api/documents')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
  });
  describe('GET /api/documents/:id', () => {
    it('should not allow admin retrieve private documents', (done) => {
      request
        .get(`/api/documents/${privateDocumentId}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
    it(`should not allow regular user retrieve a
       private document that he did not create`, (done) => {
      request
        .get(`/api/documents/${privateDocumentId}`)
        .set({ 'x-access-token': secondUserToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
    it(`should allow a regular user retrieve 
        private documents he/she created`, (done) => {
      request
        .get(`/api/documents/${privateDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document.title).to.equal(privateDocument.title);
          done();
        });
    });
    it('should allow regular users retrieve public documents', (done) => {
      request
        .get(`/api/documents/${publicDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document.title).to.equal(firstPublicDocument.title);
          done();
        });
    });
    it(`should allow allow regular 
       users retrieve role documents`, (done) => {
      request
        .get(`/api/documents/${roleDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document.title).to.equal(roleDocument.title);
          done();
        });
    });
    it(`should allow allow regular users
       retrieve a non-existent document`, (done) => {
      request
        .get('/api/documents/233333')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('document not found');
          done();
        });
    });
  });
  describe('PUT /api/documents/:id', () => {
    it(`should not allow users update
     documents they did not create`, (done) => {
      request
        .put(`/api/documents/${publicDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .send(updateDocument)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
    it('should not allow users update documents that don`t exist', (done) => {
      request
        .put('/api/documents/44444')
        .set({ 'x-access-token': firstUserToken })
        .send(updateDocument)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('document not found');
          done();
        });
    });
    it('should allow users update documents they created', (done) => {
      request
        .put(`/api/documents/${privateDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .send(updateDocument)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document.title).to.equal(updateDocument.title);
          done();
        });
    });
  });
  describe('DELETE /api/documents/:id', () => {
    it(`should not allow users delete a
      document they did not create`, (done) => {
      request
        .delete(`/api/documents/${publicDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
        });
    });
    it('it should not allow users delete documents that dont exist', (done) => {
      request
        .delete('/api/documents/44444')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('document not found');
          done();
        });
    });
    it('should allow users delete documents created by them', (done) => {
      request
        .delete(`/api/documents/${privateDocumentId}`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should allow admin delete any users document', (done) => {
      request
        .delete(`/api/documents/${publicDocumentId}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('GET /api/users/:id/documents/', () => {
    it('should allow user get all his documents', (done) => {
      request
        .get('/api/users/1/documents')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it('should allow user get other users documents', (done) => {
      request
        .get('/api/users/1/documents')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
