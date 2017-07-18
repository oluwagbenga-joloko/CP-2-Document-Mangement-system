/* eslint-disable no-unused-vars*/
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../serverProd';
import fakeData from '../testUtils/fakeData';
import db from '../../models';
import seeder from '../testUtils/seeder';

chai.use(chaiHttp);
const request = chai.request(app);
const privateDocument = fakeData.firstPrivateDocument;
const publicDocument = fakeData.firstPublicDocument;
const roleDocument = fakeData.firstRoleDocument;
const adminUser = fakeData.validAdmin;
const firstRegularUser = fakeData.firstRegularUser;
const secondRegularUser = fakeData.secondRegularUser;

let adminToken;
let firstUserToken;
let secondUserToken;
describe('Search: document and user controller', () => {
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
  describe('GET /api/search/documents/?q={}', () => {
    it('should allow users search for documents', (done) => {
      request
        .get('/api/search/documents/?q=i')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it(`should allow users search 
      for documents public documents`, (done) => {
      request
        .get(`/api/search/documents/?q=${publicDocument.title}&access=public`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === publicDocument.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].title).to.equal(publicDocument.title);
          expect(searchDocument[0].content).to.equal(publicDocument.content);
          done();
        });
    });
    it(`should allow not allow users
       search for private document`, (done) => {
      request
        .get('/api/search/documents/?q=a')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === 'private') {
              return document;
            }
            return undefined;
          });
          const noPrivate = res.body.documents.filter((document) => {
            if (document.access === 'private') {
              return document;
            }
            return undefined;
          });
          expect(noPrivate).to.eql([]);
          expect(searchDocument).eql([]);
          done();
        });
    });
    it('should allow allow users search for role document', (done) => {
      request
        .get(`/api/search/documents/?q=${roleDocument.title}&access=role`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === roleDocument.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].ownerRoleId).to.eql(firstRegularUser.roleId);
          expect(searchDocument[0].title).to.eql(roleDocument.title);
          done();
        });
    });
    it('should return no documents found for invalid search query', (done) => {
      request
        .get('/api/search/documents/?q=98fdfdfbfdkfjafkajkfdhf')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('no documents found ');
          done();
        });
    });
    it('should not allow Admin search for private document', (done) => {
      request
        .get('/api/search/documents/?q=a')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === 'private') {
              return document;
            }
            return undefined;
          });
          expect(searchDocument).to.eql([]);
          expect(searchDocument[0]).to.equal(undefined);
          done();
        });
    });
  });
  describe('GET /api/search/users/?q={}', () => {
    it('should allow Admin search for users', (done) => {
      request
        .get(`/api/search/users/?q=${firstRegularUser.firstName}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.not.equal(undefined);
          expect(res.body.users).to.be.an('array');
          const searchUser = res.body.users.filter((user) => {
            if (user.firstName === firstRegularUser.firstName) {
              return user;
            }
            return undefined;
          });
          expect(searchUser[0].firstName).to.equal(firstRegularUser.firstName);
          expect(searchUser[0].lastName).to.equal(firstRegularUser.lastName);
          expect(searchUser[0].email).to.equal(firstRegularUser.email);
          done();
        });
    });
    it('should not allow regular user search for users', (done) => {
      request
        .get(`/api/search/users/?q=${secondRegularUser.firstName}`)
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
          expect(res.body.users).to.equal(undefined);
        });
    });
  });
  describe('GET /api/search/userdocuments/?q={}', () => {
    it('should allow users search for documents', (done) => {
      request
        .get('/api/search/userdocuments/?q=')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it(`should return no documents if no
     documents match the search`, (done) => {
      request
        .get('/api/search/userdocuments/?q=dfdfdfdfafdfafadfaf&access=public')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('no documents found ');
          done();
        });
    });
    it(`should allow users search for their 
    own public documents`, (done) => {
      request
        .get(`/api/search/userdocuments/?q=${publicDocument.title}`
        + '&access=public')
        .set({ 'x-access-token': firstUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === publicDocument.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].User.firstName)
          .to.equal(firstRegularUser.firstName);
          expect(searchDocument[0].title).to.equal(publicDocument.title);
          expect(searchDocument[0].content).to.equal(publicDocument.content);
          done();
        });
    });
  });
});
