import { expect } from 'chai';
import fakeData from '../testUtils/fakeData';
import db, { Document } from '../../models';
import seeder from '../testUtils/seeder';

const document1 = fakeData.publicDocument1,
  document2 = fakeData.publicDocument2,
  invalidAccessDocument = fakeData.invalidAccessDocument,
  emptyTitleDocument = fakeData.emptyTitleDocument,
  emptyContentDocument = fakeData.emptyContentDocument;

let document1Id;

describe('Document Model', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      seeder.populateRoleTable().then(() => {
        seeder.populateUserTable().then(() => {
          done();
        });
      });
    });
  });
  after((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
  describe('docuemt model', () => {
    it('should create a document', (done) => {
      Document.create(document1).then((document) => {
        document1Id = document.id;
        expect(document1.title).to.equal(document.title);
        expect(document1.access).to.equal(document.access);
        expect(document1.content).to.equal(document.content);
        done();
      });
    });
    it('should not create document invalid access', (done) => {
      Document.create(invalidAccessDocument)
       .catch((error) => {
         expect(error.errors[0].message).to.equal(
             'access can either be public, private or role');
         done();
       });
    });
    it('should not create document with empty title', (done) => {
      Document.create({ ...emptyTitleDocument, userId: 2, ownerRoleId: 2 })
       .catch((error) => {
         expect(error.errors[0].message).to.equal('title cannot be null');
         done();
       });
    });
    it('should not create document with empty content', (done) => {
      Document.create({ ...emptyContentDocument, userId: 2, ownerRoleId: 2 })
       .catch((error) => {
         expect(error.errors[0].message).to.equal('please enter content');
         done();
       });
    });
    it('should not create document with empty userId', (done) => {
      Document.create({ ...emptyContentDocument, ownerRoleId: 2 })
       .catch((error) => {
         expect(error.errors[0].message).to.equal('userId cannot be null');
         done();
       });
    });
    it('should not create document with empty ownerRoleId', (done) => {
      Document.create({ ...emptyContentDocument, userId: 2 })
       .catch((error) => {
         expect(error.errors[0].message).to.equal('ownerRoleId cannot be null');
         done();
       });
    });
    it('should update a Document', (done) => {
      Document.findById(document1Id).then((document) => {
        document.update(document2).then((updateDocument) => {
          expect(updateDocument.title).to.equal(document2.title);
          expect(updateDocument.content).to.equal(document2.content);
          done();
        });
      });
    });
    it('should delete a Document', (done) => {
      Document.findById(document1Id).then((document) => {
        document.destroy().then((res) => {
          expect(res).to.eql([]);
          done();
        });
      });
    });
  });
});
