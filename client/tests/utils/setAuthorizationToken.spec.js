import axios from 'axios';
import { expect } from 'chai';
import setAuthorizationToken from
 '../../../client/src/utils/setAuthorizationToken';

describe('set authorization token', () => {
  it('should delete authorization token', () => {
    setAuthorizationToken();
    expect(axios.defaults.headers.common.Authorization).to.eql(undefined);
  });
  it('should set authorization token', () => {
    setAuthorizationToken('test');
    expect(axios.defaults.headers.common.Authorization).to.eql('test');
  });
});
