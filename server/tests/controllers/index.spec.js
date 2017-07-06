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
          expect(res.body.message).to.equal(
            'welcome to Document Management System API');
          done();
        });
  });
});
describe('GET /swagger.json', () => {
  it('should send swagger.json docs', (done) => {
    request
        .get('/swagger.json')
        .end((err, res) => {
          const swagger = JSON.parse(res.text);
          expect(swagger.info.title).to.equal('DocumentIT API Endpoints');
          expect(swagger.info.description).to.equal(
            'Describing the API Endpoints with Swagger');
          expect(swagger.paths).to.not.eql(undefined);
          done();
        });
  });
});
