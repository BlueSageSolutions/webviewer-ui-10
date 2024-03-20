import React from 'react';
import TabPanel from './TabPanel';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { panelMinWidth } from 'constants/panel';

export default {
  title: 'ModularComponents/TabPanel',
  component: TabPanel,
};

const initialState = {
  viewer: {
    disabledElements: {},
    customElementOverrides: {},
    bookmarkIconShortcutVisibility: false,
    openElements: {
      signatureModal: false
    },
    toolbarGroup: 'toolbarGroup-Insert',
    genericPanels: [
      {
        render: 'thumbnailsPanel',
        dataElement: 'thumbnailsPanel',
      },
      {
        render: 'bookmarksPanel',
        dataElement: 'bookmarksPanel',
      },
      {
        render: 'notesPanel',
        dataElement: 'notesPanel',
      },
      {
        render: 'layersPanel',
        dataElement: 'layersPanel',
      },
      {
        render: 'signaturePanel',
        dataElement: 'signaturePanel',
      },
      {
        'render': 'tabPanelIconsOnly',
        'dataElement': 'tabPanelIconsOnly',
        'panelsList': [
          {
            'render': 'thumbnailsPanel'
          },
          {
            'render': 'bookmarksPanel'
          },
          {
            'render': 'notesPanel'
          },
          {
            'render': 'layersPanel'
          },
          {
            'render': 'signaturePanel',
          }
        ]
      },
      {
        'render': 'tabPanelLabelsOnly',
        'dataElement': 'tabPanelLabelsOnly',
        'panelsList': [
          {
            'render': 'label1'
          },
          {
            'render': 'label2'
          },
          {
            'render': 'label3'
          },
        ]
      },
      {
        'render': 'tabPanelIconsAndLabels',
        'dataElement': 'tabPanelIconsAndLabels',
        'panelsList': [
          {
            'render': 'icon-label1'
          },
          {
            'render': 'icon-label2'
          },
          {
            'render': 'icon-label3'
          },
        ]
      },
      {
        dataElement: 'label1',
        title: 'Tab 1',
        label: 'Tab 1',
        render: {},
      },
      {
        dataElement: 'label2',
        title: 'Tab 2',
        label: 'Tab 2',
        render: {},
      },
      {
        dataElement: 'label3',
        title: 'Tab 3',
        label: 'Tab 3',
        render: {},
      },
      {
        dataElement: 'icon-label1',
        icon: 'ic_bookmarks_black_24px',
        title: 'Tab 1',
        label: 'Tab 1',
        render: {},
      },
      {
        dataElement: 'icon-label2',
        icon: 'ic_annotation_cloudy_rectangular_area_black_24px',
        title: 'Tab 2',
        label: 'Tab 2',
        render: {},
      },
      {
        dataElement: 'icon-label3',
        icon: 'ic_thumbnails_grid_black_24px',
        title: 'Tab 3',
        label: 'Tab 3',
        render: {},
      },
    ],
    lastPickedToolGroup: '',
    activeCustomPanel: 'thumbnailsPanel',
    flyoutMap: {},
    customPanels: []
  },
  document: {
    bookmarks: [],
  }
};

const store = configureStore({ reducer: () => initialState });


export const TabPanelWithIconsOnly = () => (
  <Provider store={store}>
    <div style={{ width: '258px' }}>
      <TabPanel dataElement='tabPanelIconsOnly' />
    </div>
  </Provider>
);

export const TabPanelWithLabelsOnly = () => (
  <Provider store={store}>
    <div style={{ width: '204px' }}>
      <TabPanel dataElement='tabPanelLabelsOnly' />
    </div>
  </Provider>
);

export const TabPanelIconsAndLabels = () => (
  <Provider store={store}>
    <div style={{ width: '246px' }}>
      <TabPanel dataElement='tabPanelIconsAndLabels' />
    </div>
  </Provider>
);

const initialStateThumbnailsOnly = {
  viewer: {
    disabledElements: {},
    customElementOverrides: {},
    bookmarkIconShortcutVisibility: false,
    openElements: {
      signatureModal: false
    },
    toolbarGroup: 'toolbarGroup-Insert',
    genericPanels: [
      {
        'render': 'tabPanelIconsAndLabels',
        'dataElement': 'tabPanelIconsAndLabels',
        'panelsList': [
          {
            'render': 'icon-label1'
          },
        ]
      },
      {
        dataElement: 'icon-label1',
        icon: 'ic_bookmarks_black_24px',
        title: 'Tab 1',
        label: 'Tab 1',
        render: 'thumbnailsPanel',
      },
    ],
    lastPickedToolGroup: '',
    flyoutMap: {},
    customPanels: [],
    activeCustomPanel: {
      'tabPanelIconsAndLabels': 'icon-label1',
    },
    selectedThumbnailPageIndexes: [],
    thumbnailSelectingPages: true,
    panelWidths: {
      'tabPanelIconsAndLabels': panelMinWidth,
    }
  },
  document: {
    bookmarks: [],
    totalPages: {
      1: 0,
    }
  }
};

const storeThumbnailsOnly = configureStore({ reducer: () => initialStateThumbnailsOnly });

export const TabPanelWithThumbnailPanelMinWidth = () => (
  <Provider store={storeThumbnailsOnly}>
    <div style={{ display: 'flex' }}>
      <div style={{ width: `${panelMinWidth}px`, height: '75%' }}>
        <TabPanel dataElement="tabPanelIconsAndLabels"/>
      </div>
    </div>
  </Provider>
);

const initialStateThumbnailsOnlyMaxWidth = {
  ...initialStateThumbnailsOnly,
  viewer: {
    ...initialStateThumbnailsOnly.viewer,
    panelWidths: {
      'tabPanelIconsAndLabels': 600,
    }
  }
};
const storeThumbnailsOnlyMaxWidth = configureStore({ reducer: () => initialStateThumbnailsOnlyMaxWidth });
export const TabPanelWithThumbnailPanelMaxWidth = () => (
  <Provider store={storeThumbnailsOnlyMaxWidth}>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '600px', height: '75%' }}>
        <TabPanel dataElement="tabPanelIconsAndLabels"/>
      </div>
    </div>
  </Provider>
);

