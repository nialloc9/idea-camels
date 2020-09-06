import React, { Fragment } from 'react'

import Footer from '../components/Footer';
import withPageAnalytics from '../hoc/withPageAnalytics';

export default withPageAnalytics(() => (
  <Fragment>
    Hello
    <Footer />
  </Fragment>
))
