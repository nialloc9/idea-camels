/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { jsx, Box } from "theme-ui";
import { Icon, Modal, Input, Header, Button } from "semantic-ui-react";
import { styled, remCalc } from "../../../../utils/style";

const StyledIcon = styled(Icon)`
  margin-left: ${remCalc(5)} !important;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const TabButton = ({ tab, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(tab.title);

  return (
    <Box sx={styles.tabButton} className="tab-button">
      {tab.icon}
      {newTitle}
      <Modal
        closeIcon
        open={open}
        trigger={<StyledIcon name="edit" size="small" />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="edit" content={`Edit "${tab.title}"`} />
        <Modal.Content>
          <Input
            fluid
            defaultValue={newTitle}
            onChange={(e, { value }) => setNewTitle(value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            color="green"
            onClick={() => {
              onEdit(newTitle);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </Box>
  );
};

export default TabButton;

const styles = {
  tabButton: {
    display: "flex",
    alignItems: "center",
    fontSize: [1, null, null, null, 2],
    lineHeight: 1,
    svg: {
      // mr: ["7px", , null, null, "12px"], --> did not know what extra , was for
      mr: ["7px", null, null, "12px"],
      height: 20,
      width: 20,
    },
  },
};
