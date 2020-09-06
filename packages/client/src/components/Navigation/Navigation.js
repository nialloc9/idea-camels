import React, { useState } from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { remCalc } from "../../utils/style";
import { items } from "./utils";
import { theme } from "../../config";

const AnalyticsMenuItem = withAnalytics(Item);

export default () => {
    const [{ activeItem }, setState] = useState({ activeItem: "home" });

    const handleItemClick = (e, { name }) => setState({ activeItem: name });

    return (
        <Menu
            display="none" secondary size="huge" backgroundColor={theme.colors.main000} color={theme.colors.white000} anchorColor={theme.colors.white000}
            fontFamily={theme.defaultFont.fontFamily}
        >
            <AnalyticsMenuItem
                name="logo"
                active={activeItem === "logo"}
                onClick={handleItemClick}
                action="navigation-logo-click"
                href="/"
            >
                <Image
                    maxWidth={remCalc(23)}
                    alt="idea camels logo"
                    src={theme.logos.main000}
                />
            </AnalyticsMenuItem>
            <MenuMenu position="right">
                {items.map((o) => (
                    <AnalyticsMenuItem
                        key={o}
                        name={o}
                        href="/coming-soon"
                        active={activeItem === o}
                        onClick={handleItemClick}
                        action={`${o.replace(" ", "-")}-click`.toLowerCase()}
                    />
                ))}
            </MenuMenu>
        </Menu>
    );
};
