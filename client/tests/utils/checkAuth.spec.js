import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import checkAuth from
 '../../../client/src/utils/checkAuth';

const validToken = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  id: 2
}, 'secret');
const expiredToken = jwt.sign({
  exp: Math.floor(Date.now() / 1000) - 1,
  id: 2
}, 'secret');

describe('checkAuth', () => {
  it('should return null when no token exists', () => {
    expect(checkAuth().userId).to.equal(null);
  });
  it('should return null when token is invalid', () => {
    expect(checkAuth('45fggv7676').userId).to.equal(null);
  });
  it('should return null when token has expired', () => {
    expect(checkAuth(expiredToken).userId).to.equal(null);
  });
  it('should return userId when token is valid', () => {
    expect(checkAuth(validToken).userId).to.equal(2);
  });
});
