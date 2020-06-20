import React, { useState } from 'react'
import withAnalytics from 'hoc/withAnalytics';
import { Menu, MenuItem, MenuMenu } from '../Menu'
import { Image } from '../Image'
import { styled, createMediaQuery, remCalc } from 'utils/style'
import { items } from './utils';

const StyledMenu = styled(Menu)`
    font-family: ${({ theme: { navigation } }) => navigation.fontFamily} !important;
    background-color: ${({ theme: { navigation } }) => navigation.backgroundColor} !important;
    color: ${({ theme: { navigation } }) => navigation.color} !important;
    display: none !important;
    margin: 0 !important;

    a {
        color: ${({ theme: { navigation } }) => navigation.color} !important;
    }
    
    ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
        display: flex !important;
    }
`;

const StyledImage = styled(Image)`
  max-width: ${({ theme: { navigation } }) => remCalc(navigation.logoSize)} !important;
`;

const AnalyticsMenuItem = withAnalytics(MenuItem);

export default ({ theme: { navigation } }) => {

  const [{activeItem}, setState] = useState({ activeItem: 'home' });

  const handleItemClick = (e, { name }) => setState({ activeItem: name })

  return(
      <StyledMenu secondary size={navigation.size}>
        <AnalyticsMenuItem
          name='logo'
          active={activeItem === 'logo'}
          onClick={handleItemClick}
          action='navigation-logo-click'
          href="/"
        >
          <StyledImage alt="idea camels logo" src={navigation.logo} />
        </AnalyticsMenuItem>
        <MenuMenu position='right'>
          {items.map(o => (
            <AnalyticsMenuItem
              key={o}
              name={o}
              href="/coming-soon"
              active={activeItem === o}
              onClick={handleItemClick}
              action={`${o.replace(' ', '-')}-click`.toLowerCase()}
            />
          ))}
        </MenuMenu>
      </StyledMenu>
    )
}