import { expect } from 'chai';
import fakeData from '../testUtils/fakeData';
import db, { User } from '../../models';
import seeder from '../testUtils/seeder';

const user1 = fakeData.generateRandomUser(2);
const user2 = fakeData.generateRandomUser(2);
const invalidPasswordUser = fakeData.invalidPasswordUser;
const invalidEmailUser = fakeData.invalidEmailUser;
let user1Id;

describe('Models', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      seeder.populateRoleTable().then(() => {
        done();
      });
    });
  });
  after((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
  describe('User', () => {
    it('should create a user', (done) => {
      User.create(user1).then((user) => {
        user1Id = user.id;
        expect(user1.firstName).to.equal(user.firstName);
        expect(user1.lastName).to.equal(user.lastName);
        done();
      });
    });
    it('should fail if email exists', (done) => {
      User.create(user1).then()
       .catch((error) => {
         expect(error.errors[0].message).to.equal('email must be unique');
         done();
       });
    });
    it('should fail if email is invalid', (done) => {
      User.create(invalidEmailUser)
       .catch((error) => {
         expect(error.errors[0].message).to.equal('invalid email');
         done();
       });
    });
    it('should fail if password is empty', (done) => {
      User.create(invalidPasswordUser)
       .catch((error) => {
         expect(error.errors[0].message).to.equal('password cannot be empty');
         done();
       });
    });
    it('should update a user', (done) => {
      User.findById(user1Id).then((user) => {
        user.update(user2).then((updateuser) => {
          expect(updateuser.firstName).to.equal(user2.firstName);
          expect(updateuser.lastName).to.equal(user2.lastName);
          done();
        });
      });
    });
    it('should delete a user', (done) => {
      User.findById(user1Id).then((user) => {
        user.destroy().then((res) => {
          expect(res).to.eql([]);
          done();
        });
      });
    });
  });
});
