import log from 'npmlog';
import fakeData from './FakeData';
import db from '../../models';

const validAdmin = fakeData.validAdmin,
  regulerUser1 = fakeData.regulerUser1,
  regulerUser2 = fakeData.regulerUser2,
  regulerUser3 = fakeData.regulerUser3;
/**
 * @class SeedDb
 */
class SeedDb {
/**
 * @desc initializes thes seeding of data into the db.
 * @static
 * @returns {promise} returns a promise
 * @memberof SeedDb
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
   * @memberof SeedDb
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
   * @memberof SeedDb
   */
  static populateUserTable() {
    return db.User.create(validAdmin)
     .then(() => db.User.create(regulerUser1)
       .then(() => db.User.create(regulerUser2)
         .then(() => db.User.create(regulerUser3))));
  }
  /**
   * @desc it popultes the document table
   * @static
   * @returns {promise} returns a promise
   * @memberof SeedDb
   */
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
