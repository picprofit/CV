import React from 'react';
import NProgress from 'nprogress';
import { Row, Col } from 'react-materialize';
import 'font-awesome/css/font-awesome.min.css';

import Loader from './Loader';
import { personalDataLink } from '../config';
import useAsyncHook from '../helpers/useAsyncHook';

const Footer = () => {
  const year = new Date().getFullYear();

  NProgress.start();
  const [CVData, loading] = useAsyncHook({ link: personalDataLink });

  if (loading) {
    return <Loader />;
  }

  NProgress.done();
  if (CVData.length === 0) {
    return <>Something went wrong...</>;
  }

  const { name, surname, contacts } = CVData;

  return (
    <footer>
      <Row>
        <Col s={12} m={8}>
          &copy; 2010 - {year} {name} {surname}
        </Col>
        <Col s={12} m={4} className="footer-social">
          <a
            href={contacts.github.link}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social__icon-link"
          >
            <i className="fa fa-github" />
          </a>
          <a
            href={contacts.linkedin.link}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social__icon-link"
          >
            <i className="fa fa-linkedin" />
          </a>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
