import { expect } from 'chai';
import fakeData from '../testUtils/fakeData';
import db, { Role } from '../../models';


const role1 = fakeData.generateRandomRole();
const role2 = fakeData.generateRandomRole();
const emptyRole = fakeData.emptyRole;
let role1Id;

describe('Role Model', () => {
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
  describe('Role Model', () => {
    it('should create a role', (done) => {
      Role.create(role1).then((role) => {
        role1Id = role.id;
        expect(role.title).to.equal(role1.title);
        done();
      });
    });
    it('should fail if title is empty', (done) => {
      Role.create(emptyRole).then()
       .catch((error) => {
         expect(error.errors[0].message).to.equal('title cannot be empty');
         done();
       });
    });
    it('should update role', (done) => {
      Role.findById(role1Id).then((role) => {
        role.update(role2).then((updateRole) => {
          expect(updateRole.title).to.equal(role2.title);
          done();
        });
      });
    });
    it('should delete a role', (done) => {
      Role.findById(role1Id).then((role) => {
        role.destroy().then((res) => {
          expect(res).to.eql([]);
          done();
        });
      });
    });
  });
});
