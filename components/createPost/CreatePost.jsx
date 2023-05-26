import { useState } from "react";
import {
  IconButton,
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
} from "react-native-paper";
import { ScrollView } from "react-native";

const CreatePost = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <>
      <IconButton icon="plus-circle-outline" size={25} onPress={showModal} />
      {visible && <NewPost visible={visible} hideModal={hideModal} />}
    </>
  );
};

const NewPost = ({ visible, hideModal }) => {
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "#333",
            height: "90%",
            width: "90%",
          }}
        >
          <ScrollView>
            <Text>A long chunk of text</Text>
            <Button onPress={hideModal} mode="contained" dark={true}>
              Cool!
            </Button>
          </ScrollView>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default CreatePost;
