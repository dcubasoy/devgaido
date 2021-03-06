import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Legend from './Legend';
import Results from './Results';
import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';
import TabbedContent from '../shared/TabbedContent';
import Checkbox from '../shared/Checkbox';

import actions from '../../actions';

const {
  setLibraryTopic,
  setLibrarySearchTerm,
  setCurrentLibraryTab,
  toggleLibraryShowCompleted,
  toggleLibraryShowIncomplete,
} = actions;

const Library = ({ curriculum, uiState, user }) => (
  <div>
    <Helmet title="Library" />
    <PageHero bgColorClass="bg-primary" bgUrl="/img/library.jpg" title="Library">
      <Legend />
    </PageHero>
    <PageDivider>
      <div className="search-bar flex flex-1 margin-bottom-tiny-below-t">
        <i className="fa icon-search libIcon c-accent h4 margin-right-tiny margin-right-tiny-below-t" />
        <input className="margin-right-small margin-right-0-below-t h5 thin" type="text" name="pathSearch" defaultValue={uiState.libSearchTerm} placeholder="Search" onChange={e => setLibrarySearchTerm(e.target.value)} />
      </div>
      <div className="topics-dropdown relative flex items-center">
        <i className="fa icon-tags libIcon h4 margin-right-tiny c-accent" />
        <select className="h5 thin" defaultValue={uiState.libTopic} onChange={e => setLibraryTopic(e.target.value)} >
          <option value="All Tags" key="AllTags">All Tags</option>
          {Object.keys(curriculum.subjects).map(
            subjectId => <option value={subjectId} key={subjectId}>{subjectId}</option>,
          )}
        </select>
      </div>
      <div className="checkboxes flex margin-top-tiny-below-t justify-center">
        { user.authenticated ? <Checkbox checked={uiState.libShowCompleted} onChange={toggleLibraryShowCompleted}>Completed</Checkbox> : null }
        { user.authenticated ? <Checkbox checked={uiState.libShowIncomplete} onChange={toggleLibraryShowIncomplete}>Incomplete</Checkbox> : null }
      </div>
    </PageDivider>
    <TabbedContent
      content={[{
        caption: 'Paths',
        content: <Results category="paths" />,
        buttonClass: 'button--primary',
        icon: <i className="fa icon-map-signs margin-right-tiny" />,
      }, {
        caption: 'Lessons',
        content: <Results category="lessons" />,
        buttonClass: 'button--accent',
        icon: <i className="fa icon-graduation-cap margin-right-tiny" />,
      }]}
      tabIndex={uiState.curLibraryTab}
      onClick={index => setCurrentLibraryTab(index)}
    />
  </div>
);

Library.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  uiState: store.uiState,
  curriculum: store.curriculum,
}))(Library);

