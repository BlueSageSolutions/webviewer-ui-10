import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Bookmark from 'components/Bookmark';
import Button from 'components/Button';
import DataElementWrapper from 'components/DataElementWrapper';
import DataElements from 'constants/dataElement';

import actions from 'actions';
import selectors from 'selectors';

import '../../constants/bookmarksOutlinesShared.scss';
import './BookmarksPanel.scss';

const BookmarksPanel = () => {
  const [isDisabled, bookmarks, currentPageIndex, pageLabels] = useSelector(
    state => [
      selectors.isElementDisabled(state, DataElements.BOOKMARK_PANEL),
      selectors.getBookmarks(state),
      selectors.getCurrentPage(state) - 1,
      selectors.getPageLabels(state),
    ],
    shallowEqual,
  );

  const [isAddingNewBookmark, setAddingNewBookmark] = useState(false);
  const [isMultiSelectionMode, setMultiSelectionMode] = useState(false);
  const [selectingBookmarks, setSelectingBookmarks] = useState([]);

  const [t] = useTranslation();
  const dispatch = useDispatch();

  const pageIndexes = Object.keys(bookmarks).map(pageIndex => parseInt(pageIndex, 10));

  useEffect(() => {
    // if bookmark is deleted from the shortcut, should also remove from selectingBookmarks
    selectingBookmarks.forEach(index => {
      if (!pageIndexes.includes(index)) {
        setSelectingBookmarks(selectingBookmarks.filter(bm => bm !== index))
      }
    });
  }, [bookmarks]);

  const onRemoveBookmarks = (pageIndexes) => {
    const title = t('warning.deleteBookmark.title');
    const message = t('warning.deleteBookmark.message');
    const confirmationWarning = {
      message,
      title,
      onConfirm: () => {
        pageIndexes.forEach(pageIndex => dispatch(actions.removeBookmark(pageIndex)));
        setSelectingBookmarks([]);
      },
      confirmBtnText: t('action.delete'),
    };
    dispatch(actions.showWarningMessage(confirmationWarning));
  }

  if (isDisabled) {
    return null;
  }

  return (
    <div
      className="Panel BookmarksPanel bookmark-outline-panel"
      data-element={DataElements.BOOKMARK_PANEL}
    >
      <div className="bookmark-outline-panel-header">
        <div className="header-title">
          {t('component.bookmarksPanel')}
        </div>
        {!isMultiSelectionMode &&
          <Button
            className="bookmark-outline-control-button header-edit-button"
            label={t('action.edit')}
            disabled={isAddingNewBookmark || pageIndexes.length === 0}
            onClick={() => setMultiSelectionMode(true)}
          />
        }
        {isMultiSelectionMode &&
          <Button
            className="bookmark-outline-control-button header-edit-button"
            label={t('option.bookmarkOutlineControls.done')}
            disabled={isAddingNewBookmark}
            onClick={() => {
              setMultiSelectionMode(false);
              setSelectingBookmarks([]);
            }}
          />
        }
      </div>

      {!isAddingNewBookmark && pageIndexes.length === 0 && (
        <div className="msg msg-no-bookmark-outline">{t('message.noBookmarks')}</div>
      )}

      <div className="bookmark-outline-row">
        {isAddingNewBookmark &&
          <Bookmark
            isAdding={true}
            label={`${t('component.bookmarkPage')} ${pageLabels[currentPageIndex]} - ${t('component.bookmarkTitle')}`}
            text={bookmarks[currentPageIndex] ?? ""}
            pageIndex={currentPageIndex}
            onSave={newText => {
              dispatch(actions.addBookmark(currentPageIndex, newText));
              setAddingNewBookmark(false);
            }}
            onCancel={() => setAddingNewBookmark(false)}
          />
        }

        {pageIndexes.map(pageIndex => (
          <Bookmark
            key={pageIndex}
            isMultiSelectionMode={isMultiSelectionMode}
            label={`${t('component.bookmarkPage')} ${pageLabels[pageIndex]} - ${t('component.bookmarkTitle')}`}
            defaultLabel={`${t('component.bookmarkPage')} ${pageLabels[pageIndex]}`}
            text={bookmarks[pageIndex]}
            pageIndex={pageIndex}
            onSave={newText => dispatch(actions.editBookmark(pageIndex, newText))}
            onRemove={index => onRemoveBookmarks([index])}
            setSelected={(index, val) => {
              if (selectingBookmarks.find(bm => bm === index)) {
                if (!val) {
                  setSelectingBookmarks(selectingBookmarks.filter(bm => bm !== index));
                }
              } else {
                if (val) {
                  setSelectingBookmarks([...selectingBookmarks, index]);
                }
              }
            }}
          />
        ))}
      </div>

      <DataElementWrapper
        className="bookmark-outline-footer"
        dataElement="addNewBookmarkButtonContainer"
      >
        {isMultiSelectionMode &&
          <>
            <Button
              dataElement="newBookmarkButton"
              className="multi-selection-button"
              img="icon-menu-add"
              disabled={selectingBookmarks.length > 0 || !!bookmarks[currentPageIndex]}
              onClick={() => setAddingNewBookmark(true)}
            />
            <Button
              dataElement="newBookmarkButton"
              className="multi-selection-button"
              img="icon-delete-line"
              disabled={selectingBookmarks.length === 0}
              onClick={() => onRemoveBookmarks(selectingBookmarks)}
            />
          </>
        }
        {!isMultiSelectionMode &&
          <Button
            dataElement="newBookmarkButton"
            className="bookmark-outline-control-button add-new-button"
            img="icon-menu-add"
            label={`${t('action.add')} ${t('component.bookmarkPanel')}`}
            disabled={isAddingNewBookmark || !!bookmarks[currentPageIndex]}
            onClick={() => setAddingNewBookmark(true)}
          />
        }
      </DataElementWrapper>
    </div>
  );
}

export default BookmarksPanel;
