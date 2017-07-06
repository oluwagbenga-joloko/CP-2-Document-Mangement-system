/* eslint-disable no-unused-vars*/
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../serverProd';
import fakeData from '../testUtils/fakeData';
import db from '../../models';
import seeder from '../testUtils/seeder';


chai.use(chaiHttp);
const request = chai.request(app),
  privateDocument1 = fakeData.privateDocument1,
  publicDocument1 = fakeData.publicDocument1,
  roleDocument1 = fakeData.roleDocument1,
  adminUser = fakeData.validAdmin,
  regulerUser1 = fakeData.regulerUser1,
  regulerUser2 = fakeData.regulerUser2;

let adminToken,
  regular1Token,
  regular2Token;
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
        .send({ email: regulerUser1.email, password: regulerUser1.password })
        .end((err, res) => {
          regular1Token = res.body.token;
        });
      request
        .post('/api/users/login')
        .send({ email: regulerUser2.email, password: regulerUser2.password })
        .end((err, res) => {
          regular2Token = res.body.token;
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
    it('it should allow users search for documents', (done) => {
      request
        .get('/api/search/documents/?q=i')
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it(`it should allow users search 
      for documents public documents`, (done) => {
      request
        .get(`/api/search/documents/?q=${publicDocument1.title}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === publicDocument1.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].title).to.equal(publicDocument1.title);
          expect(searchDocument[0].content).to.equal(publicDocument1.content);
          done();
        });
    });
    it(`it should allow not allow users
       search for private document`, (done) => {
      request
        .get('/api/search/documents/?q=a')
        .set({ 'x-access-token': regular1Token })
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
    it('it should allow allow users search for role document', (done) => {
      request
        .get(`/api/search/documents/?q=${roleDocument1.title}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === roleDocument1.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].ownerRoleId).to.eql(regulerUser1.roleId);
          expect(searchDocument[0].title).to.eql(roleDocument1.title);
          done();
        });
    });
    it('should return no docuements found for invalid search query', (done) => {
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
    it('it should allow Admin search for users', (done) => {
      request
        .get(`/api/search/users/?q=${regulerUser1.firstName}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.not.equal(undefined);
          expect(res.body.users).to.be.an('array');
          const searchUser = res.body.users.filter((user) => {
            if (user.firstName === regulerUser1.firstName) {
              return user;
            }
            return undefined;
          });
          expect(searchUser[0].firstName).to.equal(regulerUser1.firstName);
          expect(searchUser[0].lastName).to.equal(regulerUser1.lastName);
          expect(searchUser[0].email).to.equal(regulerUser1.email);
          done();
        });
    });
    it('it should not allow regular user search for users', (done) => {
      request
        .get(`/api/search/users/?q=${regulerUser2.firstName}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('unauthorized');
          done();
          expect(res.body.users).to.equal(undefined);
        });
    });
  });
  describe('GET /api/search//userdocuments/?q={}', () => {
    it('it should allow users search for documents', (done) => {
      request
        .get('/api/search/userdocuments/?q=')
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it(`it should allow users search their 
    own documents documents public documents`, (done) => {
      request
        .get(`/api/search/userdocuments/?q=${publicDocument1.title}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === publicDocument1.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].User.firstName)
          .to.equal(regulerUser1.firstName);
          expect(searchDocument[0].title).to.equal(publicDocument1.title);
          expect(searchDocument[0].content).to.equal(publicDocument1.content);
          done();
        });
    });
  });
});
