/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Button } from 'theme-ui';
import Masonry from 'react-masonry-component';
import SectionHeading from 'components/section-heading';
import FaqItem from 'components/cards/faq-item';
import {Link} from 'components/link';
import {content, config} from 'config';

const masonryOptions = { originTop: true };

const Faq = () => {
  return (
    <section id="faq" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={{ mb: [8, null, null, 15] }}
          description={content.faq.description}
          title={content.faq.title}
        />
        <Masonry options={masonryOptions} sx={styles.grid}>
          {content.faq.questions.map((item, i) => {
            return <FaqItem key={i} faq={item} className="faq-item" />;
          })}
        </Masonry>
        <Box sx={styles.loadMore}>
          <Link path={config.experiment.comingSoonUrl} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button variant="text">{content.faq.button.text}</Button>
          </Link>
        </Box>
      </Container>
    </section>
  );
};

export default Faq;

const styles = {
  section: {
    pt: [6, null, null, null, 10, 14],
    pb: [10, null, null, 7, null, 14, 17],
  },
  grid: {
    mx: [null, null, null, -6, -8, 'unset'],
  },
  loadMore: {
    paddingTop: [null, null, null, 3],
    textAlign: 'center',
    button: {
      backgroundColor: '#ECF2F7',
      color: '#738295',
      minHeight: 50,
      px: '22px',
      ':hover': {
        backgroundColor: 'primary',
        color: 'white',
      },
    },
  },
};
