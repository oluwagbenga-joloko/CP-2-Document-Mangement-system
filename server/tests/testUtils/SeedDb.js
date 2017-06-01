import fakeData from './FakeData';

import db from '../../models';

const validAdmin = fakeData.validAdmin,
  regulerUser1 = fakeData.regulerUser1,
  regulerUser2 = fakeData.regulerUser2,
  regulerUser3 = fakeData.regulerUser3,
  regulerUser4 = fakeData.regulerUser4;

class SeedDb {

  static init() {
    return db.sequelize.sync({ force: true })
    .then(() => this.populateRoleTable()
      .then(() => this.populateUserTable()
        .then(() => this.populateDocumentTable()
          .then(() => {
            console.log('seed complete');
          })
          .catch((err) => {
            console.log(err);
          }))
        .catch((err) => {
          console.log(err);
        }))
      .catch((err) => {
        console.log(err);
      }))
    .catch((err) => {
      console.log(err);
    });
  }
  static populateRoleTable() {
    const roles = [
      fakeData.adminRole, fakeData.regularRole, fakeData.fellowRole
    ];
    return db.Role.bulkCreate(roles);
  }
  static populateUserTable() {
    const users = [
      validAdmin,
      regulerUser1,
      regulerUser2,
      regulerUser3,
      regulerUser4,
    ];
    return db.User.create(validAdmin)
     .then(() => db.User.create(regulerUser1)
       .then(() => db.User.create(regulerUser2)
         .then(() => db.User.create(regulerUser3))));
  }
  static populateDocumentTable() {
    const documents = [
      fakeData.document1,
      fakeData.document2,
      fakeData.document3,
      fakeData.document4,
      fakeData.document5,
      fakeData.document6,
      fakeData.document7,
      fakeData.document8,
      fakeData.document9,
      fakeData.document10,
    ];
    return db.Document.bulkCreate(documents);
  }
}
export default SeedDb;
