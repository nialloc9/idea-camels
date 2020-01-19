import React, { useState } from 'react'
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

export default ({ theme: { navigation } }) => {

  const [{activeItem}, setState] = useState({ activeItem: 'home' });

  const handleItemClick = (e, { name }) => setState({ activeItem: name })

  return(
      <StyledMenu secondary size={navigation.size}>
        <MenuItem
          name='logo'
          active={activeItem === 'logo'}
          onClick={handleItemClick}
        >
          <StyledImage src={navigation.logo} />
        </MenuItem>
        <MenuMenu position='right'>
          {items.map(o => (
            <MenuItem
              key={o}
              name={o}
              active={activeItem === o}
              onClick={handleItemClick}
            />
          ))}
        </MenuMenu>
      </StyledMenu>
    )
}