import React, { useState } from "react";
import { Menu, Item } from "../Styled/Menu";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { items } from "./utils";
import { theme } from "../../config";
import withAnalytics from "../../hoc/withAnalytics";

const AnalyticsMenuItem = withAnalytics(Item);

export default () => {
    const [{ isOpen, activeItem }, setState] = useState({
        activeItem: "home",
        isOpen: false,
    });

    const handleItemClick = (e, { name }) => setState({ activeItem: name });

    const handleMenuClick = () => setState({ isOpen: !isOpen });

    return (
        <Menu
            secondary
            size="huge"
            stackable
            backgroundColor={theme.colors.main000}
            color={theme.colors.white000}
            anchorColor={theme.colors.white000}
            fontFamily={theme.defaultFont.fontFamily}
            tabletDisplay="none"
        >
            <Item>
                <Button
                    fluid
                    onClick={handleMenuClick}
                    icon="align justify"
                    backgroundColor={theme.colors.main001}
                    color={theme.colors.white000}
                />
            </Item>
            {isOpen &&
                items.map((o) => (
                    <AnalyticsMenuItem
                        key={o}
                        name={o}
                        active={activeItem === { o }}
                        onClick={handleItemClick}
                        action="navigation-logo-click"
                        href="/coming-soon"
                    >
                        <Block textAlign="center" width="100%">
                            {o}
                        </Block>
                    </AnalyticsMenuItem>
                ))}
        </Menu>
    );
};
