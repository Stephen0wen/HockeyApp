import { Button } from "react-native-paper";
import { useState } from "react";
import LoginPopup from "./LoginPopup";

export default function LoginButton() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(!visible);

  return (
    <>
      <LoginPopup visible={visible} setVisible={setVisible} />
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </>
  );
}
