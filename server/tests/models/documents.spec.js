import { expect } from 'chai';
import fakeData from '../testUtils/fakeData';
import db, { Document } from '../../models';
import seeder from '../testUtils/seeder';

const sampleDocument = fakeData.firstPublicDocument;
const updateDocument = fakeData.secondPublicDocument;
const invalidAccessDocument = fakeData.invalidAccessDocument;
const emptyTitleDocument = fakeData.emptyTitleDocument;
const emptyContentDocument = fakeData.emptyContentDocument;
let sampleDocumentId;

describe('Models', () => {
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
  describe('Document', () => {
    it('should create a document', (done) => {
      Document.create(sampleDocument).then((document) => {
        sampleDocumentId = document.id;
        expect(sampleDocument.title).to.equal(document.title);
        expect(sampleDocument.access).to.equal(document.access);
        expect(sampleDocument.content).to.equal(document.content);
        done();
      });
    });
    it('should not create document with invalid access', (done) => {
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
      Document.findById(sampleDocumentId).then((document) => {
        document.update(updateDocument).then((updatedDocument) => {
          expect(updatedDocument.title).to.equal(updateDocument.title);
          expect(updatedDocument.content).to.equal(updateDocument.content);
          done();
        });
      });
    });
    it('should delete a Document', (done) => {
      Document.findById(sampleDocumentId).then((document) => {
        document.destroy().then((res) => {
          expect(res).to.eql([]);
          done();
        });
      });
    });
  });
});
