import React from 'react';
import { useTranslation } from 'react-i18next';
import DataElementWrapper from 'components/DataElementWrapper';
import Button from 'components/Button';

function PageManipulationControls(props) {
  const { t } = useTranslation();
  const { deletePages, extractPages, insertPages, replacePages } = props;

  return (
    <>
      <DataElementWrapper
        dataElement="pageManipulationHeader"
        className="type"
      >
        {t('action.pageManipulation')}
      </DataElementWrapper>
      <DataElementWrapper
        dataElement="deletePage"
        className="row"
        onClick={deletePages}
      >
        <Button
          title="option.thumbnailPanel.delete"
          img="icon-delete-line"
          role="option"
          onClickAnnouncement={`${t('action.delete')} ${t('action.modal')} ${t('action.isOpen')}`}
        />
        <div className="title">{t('action.delete')}</div>
      </DataElementWrapper>
    </>
  );
}


export default PageManipulationControls;
