import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Container, Row, Col } from 'react-materialize';

// components
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'nprogress/nprogress.css';

import Photo from './Photo';
import Links from './Links';
import Footer from './Footer';

import PagesRouter from './PagesRouter';

// data
import Loader from './Loader';
import { personalDataLink } from '../config';
import useAsyncHook from '../helpers/useAsyncHook';

const App = ({ location }) => {
  NProgress.start();
  useEffect(() => {
    NProgress.done();
  });

  NProgress.start();
  const [CVData, loading] = useAsyncHook({ link: personalDataLink });

  if (loading) {
    return <Loader />;
  }

  NProgress.done();
  if (CVData.length === 0) {
    return <>Something went wrong...</>;
  }

  const { photo, name, surname } = CVData;
  const fullName = `${name} ${surname}`;
  return (
    <Container>
      <Row>
        <Col s={12} m={3} className="sidebar">
          <Photo image={photo} alt={fullName} />
          <Links currentLocation={location.pathname} />
        </Col>
        <Col s={12} m={9} className="content-wrap">
          <TransitionGroup className="transition-group">
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames="fade"
            >
              <div className="content">
                <PagesRouter />
              </div>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
