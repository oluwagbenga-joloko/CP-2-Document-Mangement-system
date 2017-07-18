import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { GeneralDocuments }
from '../../../src/components/documents/GeneralDocuments';
import { documents, pagination, user, location } from '../../testData';


const props = {
  user,
  userId: 20,
  documents,
  pagination,
  location,
  loading: false,
  searchDocuments: sinon.spy(() => new Promise((resolve) => { resolve(); })),
  deleteDocument: sinon.spy(() => new Promise((resolve) => { resolve(); })),
  history: { replace: sinon.spy() }
};
let wrapper;

wrapper = shallow(<GeneralDocuments {...props} />);
chai.use(chaiEnzyme());
describe('GeneralDocuments component', () => {
  it('should renders without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call searchDocuments action on mount', () => {
    expect(props.searchDocuments.called).to.equal(true);
  });
  it('should change state.access on props.access change', () => {
    wrapper.setProps({ location: {
      search: '?query=test&access=role&page=3',
      pathname: ''
    }, });
    wrapper.update();
    expect(wrapper.instance().state.access).to.equal('role');
    expect(wrapper.instance().state.query).to.equal('test');
  });
  it('should change state.document on props.document change', () => {
    wrapper.setProps({ documents,
      location: {
        search: '?query=test&access=role&page=3',
        pathname: ''
      }, });
    expect(wrapper.instance().state.documents).to.eql(documents);
  });
  it('should set state.access as "all" when location.search is empty', () => {
    wrapper.setProps({ location: {
      search: '',
      pathname: ''
    }, });
    wrapper.update();
    expect(wrapper.instance().state.access).to.equal('all');
  });
  it('should change state on select change', () => {
    const newProps = { ...props, location: { search: '', pathname: '' } };
    wrapper = shallow(<GeneralDocuments {...newProps} />);
    const select = wrapper.find('select');
    select.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'role', name: 'access' } });
    expect(wrapper.instance().state.access).to.eql('role');
    expect(wrapper.find('.progress')).not.to.be.present();
  });
  it('should show progess bar when loading is true', () => {
    wrapper.setProps({ loading: false, documents: [] });
    wrapper.setProps({ loading: true });
    expect(wrapper.find('.progress')).to.be.present();
  });
});

