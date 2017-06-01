import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';

chai.use(chaiHttp);
const request = chai.request(app);
describe('test for default app route', () => {
  it('it should return return respone 200', (done) => {
    request
    .get('/')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal(
        'welcome to Document Management System API'
      );
      expect(res.body).to.not.eql(undefined);
      expect(res.body).to.be.an('object');
      done();
    });
  });
});
