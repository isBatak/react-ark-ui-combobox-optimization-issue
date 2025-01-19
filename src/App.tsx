import { CommandMenuSlow } from "./CommandMenuSlow";
import LagRadar from "react-lag-radar";
import { LagInducer } from "./LagIntroducer";
import { Stack } from "styled-system/jsx";
import { CommandMenuDeferred } from "./CommandMenuDeferred";
import { CommandMenuFast } from "./CommandMenuFast";

function App() {
  return (
    <>
      <LagRadar />
      <Stack gap="4" p="4" align="start">
        <CommandMenuFast />
        <CommandMenuSlow />
        <CommandMenuDeferred />
      </Stack>
      <LagInducer />
    </>
  );
}

export default App;
