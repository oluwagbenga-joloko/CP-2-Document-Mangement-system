import { expect } from 'chai';
import fakeData from '../testUtils/fakeData';
import db, { Role } from '../../models';


const sampleRole = fakeData.generateRandomRole();
const updateRole = fakeData.generateRandomRole();
const emptyRole = fakeData.emptyRole;
let sampleRoleId;

describe('Models', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
  after((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
  describe('Role', () => {
    it('should create a role', (done) => {
      Role.create(sampleRole).then((role) => {
        sampleRoleId = role.id;
        expect(role.title).to.equal(sampleRole.title);
        done();
      });
    });
    it('should fail if role title is empty', (done) => {
      Role.create(emptyRole).then()
       .catch((error) => {
         expect(error.errors[0].message).to.equal('title cannot be empty');
         done();
       });
    });
    it('should update role', (done) => {
      Role.findById(sampleRoleId).then((role) => {
        role.update(updateRole).then((updatetedRole) => {
          expect(updatetedRole.title).to.equal(updateRole.title);
          done();
        });
      });
    });
    it('should delete a role', (done) => {
      Role.findById(sampleRoleId).then((role) => {
        role.destroy().then((res) => {
          expect(res).to.eql([]);
          done();
        });
      });
    });
  });
});
