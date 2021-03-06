import React from 'react';
import NProgress from 'nprogress';

import Loader from './Loader';
import { personalDataLink } from '../config';
import useAsyncHook from '../helpers/useAsyncHook';
import renderAboutField from '../helpers/renderAboutField';

const PersonalInfo = () => {
  NProgress.start();
  const [CVData, loading] = useAsyncHook({ link: personalDataLink });

  if (loading) {
    return <Loader />;
  }

  NProgress.done();

  if (CVData.length === 0) {
    return <>Something went wrong...</>;
  }

  const { contacts } = CVData;

  return (
    <>
      <h2>Personal info</h2>
      {Object.keys(contacts).map(field => renderAboutField(contacts[field]))}
    </>
  );
};

export default PersonalInfo;
