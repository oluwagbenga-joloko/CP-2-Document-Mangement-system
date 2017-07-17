import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../src/components/dashboard/Footer';

const wrapper = shallow(<Footer />);
const url = 'https://github.com/andela-ojoloko/CP-2-Document-Mangement-system';

chai.use(chaiEnzyme());
describe('footer component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it(`should contain a link with href 
   "${url}"`, () => {
    const link = wrapper.find('a').get(0);
    expect(link.props.href).to.eql(url);
  });
});
