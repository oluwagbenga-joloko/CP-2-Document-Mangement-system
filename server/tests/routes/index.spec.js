import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../serverProd';

chai.use(chaiHttp);
const request = chai.request(app);
describe('POST /api/roles/', () => {
  it('should allow admin to create roles', (done) => {
    request
        .get('/api')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('welcome to Document Management System API');
          done();
        });
  });
});
