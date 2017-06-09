import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getMydocuments, deleteDocument } from '../actions/DocumentActions';
import DocumentCard from './DocumentCard.jsx';
/**
 * @desc documentview component
 * @class DocumentView
 * @extends {Component}
 */
class DocumentView extends Component {
  /**
   * Creates an instance of DocumentView.
   * @param {any} props property of element
   * @memberof DocumentView
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
    };
    console.log(this.state);
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof DocumentView
   * @returns {*} has no return value;
   */
  componentWillMount() {
    this.props.getMydocuments(this.props.userId).then((res) => {
      console.log("iside vies",res)
      this.setState({ documents: this.props.documents });
    });
  }
  /**
   * @desc runs when compoent recieves new props;
   * @param {any} nextProps next property of element
   * @memberof DocumentView
   *  @returns {*} has no return value;
   */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.documents.length !== nextProps.documents.length) {
      console.log(nextProps.documents);
      // const documents =
      this.setState({ documents: nextProps.documents });
      console.log(this.state);
    }
  }
  /**
   * @desc hanldes delete of document
   * @param {number} id id of element to be deleted
   * @returns {*} has no return value;
   * @memberof DocumentView
   */
  handleDelete(id) {
    console.log(id);
    this.props.deleteDocument(id).then(() => {
      this.props.getMydocuments(this.props.userId);
    });
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof DocumentView
   */
  render() {
    const documents = this.state.documents.map((document) => {
      const props = {
        title: document.title,
        content: document.content,
        access: document.access,
        id: document.id,
        deleteDocument: this.handleDelete
      };
      return <DocumentCard {...props} />;
    });
    return (
      <div>
        <h1>Your documents</h1>
        <div className="row">
          {documents}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  getMydocuments,
  deleteDocument
}, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.Documents,
  userId: state.authReducer.user.id
});
DocumentView.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  userId: PropTypes.number.isRequired,
  getMydocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
