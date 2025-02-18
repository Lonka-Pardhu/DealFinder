import { Stack } from "expo-router";
import "../global.css";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Deal Finder",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default _layout;
