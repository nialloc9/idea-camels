import React, { useState } from 'react'
import { Menu, MenuItem, MenuMenu } from '../Menu'
import {  styled, createMediaQuery } from 'utils/style'
import { items } from './utils';

const StyledMenu = styled(Menu)`
    font-family: ${({ theme: { navigation } }) => navigation.fontFamily} !important;
    background-color: ${({ theme: { navigation } }) => navigation.backgroundColor} !important;
    color: ${({ theme: { navigation } }) => navigation.color} !important;
    display: none !important;

    a {
        color: ${({ theme: { navigation } }) => navigation.color} !important;
    }
    
    ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
        display: flex !important;
    }
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
        />
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