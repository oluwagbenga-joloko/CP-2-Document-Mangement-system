import log from 'npmlog';
import fakeData from './fakeData';
import db from '../../models';

const validAdmin = fakeData.validAdmin;
const firstRegularUser = fakeData.firstRegularUser;
const secondRegularUser = fakeData.secondRegularUser;
const thirdRegularUser = fakeData.thirdRegularUser;
/**
 * @class seeder
 */
class Seeder {
/**
 * @desc initializes thes seeding of data into the db.
 * @static
 * @returns {promise} returns a promise
 * @memberof seeder
 */
  static init() {
    log.info('message', 'seeding Datatbase');
    return db.sequelize.sync({ force: true })
    .then(() => this.populateRoleTable()
      .then(() => this.populateUserTable()
        .then(() => this.populateDocumentTable()
          .then(() => {
            log.info('message', 'seed complete ');
          })
          .catch((err) => {
            log.error('error', err);
          }))
        .catch((err) => {
          log.error('error', err);
        }))
      .catch((err) => {
        log.error('error', err);
      }))
    .catch((err) => {
      log.error('error', err);
    });
  }
  /**
   * @desc it populates the role table
   * @static
   * @returns {promise} returns a promise
   * @memberof seeder
   */
  static populateRoleTable() {
    const roles = [
      fakeData.adminRole, fakeData.regularRole, fakeData.fellowRole
    ];
    return db.Role.bulkCreate(roles);
  }
  /**
   * @desc it populates the user table
   * @static
   * @returns {promise} returns a promise
   * @memberof seeder
   */
  static populateUserTable() {
    return db.User.create(validAdmin)
     .then(() => db.User.create(firstRegularUser)
       .then(() => db.User.create(secondRegularUser)
         .then(() => db.User.create(thirdRegularUser))));
  }
  /**
   * @desc it popultes the document table
   * @static
   * @returns {promise} returns a promise
   * @memberof seeder
   */
  static populateDocumentTable() {
    const documents = [
      fakeData.firstPrivateDocument,
      fakeData.secondPrivateDocument,
      fakeData.thirdPrivateDocument,
      fakeData.firstPublicDocument,
      fakeData.secondPublicDocument,
      fakeData.thirdPublicDocument,
      fakeData.fourthPublicDocument,
      fakeData.firstRoleDocument,
      fakeData.secondRoleDocument,
      fakeData.thirdRoleDocument,
    ];
    return db.Document.bulkCreate(documents);
  }
}
export default Seeder;
