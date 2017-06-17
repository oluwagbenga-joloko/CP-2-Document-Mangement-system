import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../serverProd';
import fakeData from '../testUtils/FakeData';
import db from '../../models';
import Seeddb from '../testUtils/SeedDb';


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
  regular2Token,
  privateDocId1,
  roleDocId1,
  publicDocId2;

describe('Routes : Search', () => {
  before((done) => {
    Seeddb.init().then(() => {
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
          expect(res.body.success).to.equal(true);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          done();
        });
    });
    it('it should allow users search for documents public documents', (done) => {
      request
        .get(`/api/search/documents/?q=${publicDocument1.title}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          console.log(`boal${publicDocument1.title}boal`);
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === publicDocument1.title) {
              return document;
            }
            return undefined;
          });
          console.log(searchDocument);
          expect(searchDocument[0].title).to.equal(publicDocument1.title);
          expect(searchDocument[0].content).to.equal(publicDocument1.content);
          done();
        });
    });
    it('it should allow not allow users search for private document', (done) => {
      request
        .get(`/api/search/documents/?q=${privateDocument1.title}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === privateDocument1.title) {
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
          expect(res.body.success).to.equal(true);
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
    it('it should allow Admin search for private document', (done) => {
      request
        .get(`/api/search/documents/?q=${privateDocument1.title}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.documents).to.not.equal(undefined);
          expect(res.body.documents).to.be.an('array');
          const searchDocument = res.body.documents.filter((document) => {
            if (document.title === privateDocument1.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDocument[0].title).to.equal(privateDocument1.title);
          expect(searchDocument[0].content).to.equal(privateDocument1.content);
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
          expect(res.body.success).to.equal(true);
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
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('unauthorized');
          done();
          expect(res.body.users).to.equal(undefined);
        });
    });
  });
});
