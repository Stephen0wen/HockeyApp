import { IconButton, useTheme } from "react-native-paper";
import { useState } from "react";
import UserOptions from "./UserOptions";

export default function UserAvatar() {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(!visible);

    const theme = useTheme();

    return (
        <>
            <UserOptions visible={visible} setVisible={setVisible} />
            <IconButton
                icon="account-circle"
                iconColor={theme.colors.primaryContainer}
                size={46}
                onPress={showModal}
            />
        </>
    );
}
