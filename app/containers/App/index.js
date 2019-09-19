/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from 'utils/history';

import HomePage from 'containers/HomePage/Loadable';
import DetailPage from 'containers/DetailPage/Loadable';
import VideoPlayer from 'containers/VideoPlayer/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} history={history} />
        <Route path="/features" component={HomePage} history={history} />
        <Route
          path="/detailPage/:videoId"
          component={DetailPage}
          history={history}
        />
        <Route
          path="/videoPlayer/:videoId"
          component={VideoPlayer}
          history={history}
        />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
