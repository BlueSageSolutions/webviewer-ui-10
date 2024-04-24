import React from 'react';
import Button from 'components/Button';
import '../LeftPanelPageTabs/LeftPanelPageTabsContainer.scss';

function LeftPanelPageTabsOperations({ onInsert, onReplace, onExtractPages, onDeletePages }) {
  return (
    <>
      <Button
        className={'button-hover'}
        dataElement="thumbnailsControlDelete"
        img="icon-delete-line"
        onClick={onDeletePages}
        title="action.delete"
      />
    </>
  );
}

export default LeftPanelPageTabsOperations;
