import React, { useState } from 'react'
import { Menu, MenuItem } from '../Menu'
import { Button } from '../Button'
import { styled, createMediaQuery } from 'utils/style'
import { items } from './utils';

const StyledMenu = styled(Menu)`
    font-family: ${({ theme: { navigation } }) => navigation.fontFamily} !important;
    background-color: ${({ theme: { navigation } }) => navigation.backgroundColor} !important;
    color: ${({ theme: { navigation } }) => navigation.color} !important;

    a {
        color: ${({ theme: { navigation } }) => navigation.color} !important;
    }
    
    ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
        display: none !important;
    }
`;

const Item = styled.div`
    text-align: center;
    width: 100%;
`;

const StyledButton = styled(Button)`
    background-color: ${({theme: { navigation }}) => navigation.button.backgroundColor} !important;
    color: ${({theme: { navigation }}) => navigation.button.color} !important;

    &:hover {
        filter: brightness(0.96)
    }
`;

export default ({ theme: { navigation } }) => {
    
  const [{isOpen, activeItem}, setState] = useState({ activeItem: 'home', isOpen: false });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const handleMenuClick = () => setState({ isOpen: !isOpen });

  return(
      <StyledMenu secondary size={navigation.size} stackable>
        <MenuItem>
            <StyledButton fluid onClick={handleMenuClick} icon='align justify' />
        </MenuItem>
        {
            isOpen && items.map(o => (
                <MenuItem
                    key={o}
                    name={o}
                    active={activeItem === {o}}
                    onClick={handleItemClick}
                >
                    <Item>{o}</Item>
                </MenuItem>
            ))
        }
      </StyledMenu>
    )
}