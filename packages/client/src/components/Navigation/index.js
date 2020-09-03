import React from 'react'
import { withTheme } from '../../utils/style'
import Navigation from './Navigation';
import Mobile from './Mobile';

export default withTheme(({ theme }) => [<Navigation  theme={theme} />, <Mobile theme={theme} />]);