import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { UserDocuments }
from '../../../src/components/documents/UserDocuments';
import { documents, pagination, location } from '../../testData';

const props = {
  userId: 20,
  documents,
  pagination,
  location,
  loading: false,
  getUserDocuments: sinon.spy(() => new Promise((resolve) => { resolve(); })),
  deleteDocument: sinon.spy(() => new Promise((resolve) => { resolve(); })),
  history: { replace: sinon.spy() }
};
let wrapper;
wrapper = shallow(<UserDocuments {...props} />);
chai.use(chaiEnzyme());
describe('UserDocuments component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('calls getUserDocuments action on mount', () => {
    expect(props.getUserDocuments.called).to.equal(true);
  });
  it('should change state on props change', () => {
    wrapper.setProps({ location: {
      search: '?query=test&access=private&page=3',
      pathname: ''
    }, });
    wrapper.update();
    expect(wrapper.instance().state.access).to.equal('private');
    expect(wrapper.instance().state.query).to.equal('test');
  });
  it('should change state.document on props.document change', () => {
    wrapper.setProps({ documents });
    expect(wrapper.instance().state.documents).to.eql(documents);
  });
  it('should set state.access to "" when location.search is empty', () => {
    wrapper.setProps({ location: {
      search: '',
      pathname: ''
    }, });
    wrapper.update();
    expect(wrapper.instance().state.access).to.equal('');
  });
  it('should change state on select change', () => {
    const newProps = { ...props, location: { search: '', pathname: '' } };
    wrapper = shallow(<UserDocuments {...newProps} />);
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
