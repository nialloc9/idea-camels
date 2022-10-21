/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import Tabs, { TabPane } from "rc-tabs";
import SectionHeading from "../components/section-heading";
import Image from "../components/image";
import TabButton from "../components/tabs/tab-button";
import { addValueToArray } from "../../common/utils";
import EditableImageContainer from "../../common/EditableImageContainer";

const Dashboard = ({ content, onSetContent }) => {
  return (
    <section sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={content.dashboard.title}
          description={content.dashboard.description}
          onEdit={(dashboard) =>
            onSetContent({
              dashboard: { ...content.dashboard, ...dashboard },
            })
          }
        />
        <Tabs sx={styles.dashboardTabs} animated={{ tabPane: true }}>
          {content.dashboard.items.map((tab, i) => (
            <TabPane
              key={tab.id}
              tab={
                <TabButton
                  tab={tab}
                  onEdit={(title) =>
                    onSetContent({
                      dashboard: {
                        items: addValueToArray(
                          content.dashboard.items,
                          { ...tab, title },
                          i
                        ),
                      },
                    })
                  }
                />
              }
            >
              <EditableImageContainer
                src={tab.image}
                alt={tab.title}
                component={Image}
                height={643}
                onSubmit={(src) =>
                  onSetContent({
                    dashboard: {
                      items: addValueToArray(
                        content.dashboard.items,
                        { ...tab, image: src },
                        i
                      ),
                    },
                  })
                }
              />
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </section>
  );
};

export default Dashboard;

const styles = {
  section: {
    variant: "dashboard",
  },
  heading: {
    marginBottom: [6, null, null, 12],
    maxWidth: ["none", null, null, 565, null, "none"],
    p: {
      color: "#02073E",
      maxWidth: 445,
    },
  },
  dashboardTabs: {
    border: 0,
    ".rc-tabs-nav-wrap": {
      justifyContent: "center",
      marginBottom: 8,
      overflow: "unset",
    },
    ".rc-tabs-ink-bar": {
      display: "none",
    },
    ".rc-tabs-tabpane, .rc-tabs-tab-btn": {
      outline: 0,
    },
    ".rc-tabs-nav-list": {
      flexWrap: ["wrap", null, null, "unset"],
    },
    ".rc-tabs-tab": {
      backgroundColor: "transparent",
      ":nth-of-type(1),:nth-of-type(2)": {
        mb: [4, null, null, 0],
      },
      ":nth-of-type(2)": {
        ml: [4, null, null, 0],
      },
      ":nth-of-type(4)": {
        ml: [2, null, null, 0],
      },
      "+ .rc-tabs-tab": {
        ml: [null, null, null, 4, 8],
      },
    },
    ".rc-tabs-tab-active": {
      backgroundColor: "white",
      fontWeight: [400, null, null, 500],
      boxShadow: "0px 4px 6px #7d80aa",
      borderRadius: 5,
      padding: ["10px 10px", null, null, "10px 18px"],
    },
  },
};
