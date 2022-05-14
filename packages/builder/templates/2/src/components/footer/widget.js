/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui';
import { Link } from 'components/link';
import { rgba } from 'polished';
import { config } from 'config';

const Widget = ({ title, items }) => {
  return (
    <Box sx={styles.footerWidget}>
      <Heading as="h4">{title}</Heading>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Link path={config.experiment.comingSoonUrl} key={i} label={item} variant="footer" />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Widget;

const styles = {
  footerWidget: {
    h4: {
      color: 'white',
      fontFamily: 'body',
      fontSize: 3,
      fontWeight: 500,
      lineHeight: 1.68,
      letterSpacing: 'heading',
    },
    ul: {
      listStyle: 'none',
      margin: '28px 0 0',
      padding: 0,
      li: {
        display: 'flex',
        alignItems: 'center',
        img: {
          mr: '15px',
        },
      },
      a: {
        fontSize: '15px',
        color: rgba('white', 0.8),
        textDecoration: 'none',
        lineHeight: 2.5,
      },
    },
  },
};
