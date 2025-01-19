import { memo } from "react";
import { Center, Stack } from "styled-system/jsx";
import { Combobox } from "~/components/ui/combobox";
import { Text } from "~/components/ui/text";
import { Item } from "./types";

interface ListItemProps {
  query: string;
  item: Item;
  disableSlowdown?: boolean;
}

function ListItem({ query, item, disableSlowdown }: ListItemProps) {
  if (!disableSlowdown) {
    const startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // Do nothing for 1 ms per item to emulate extremely slow code
    }
  }

  return (
    <Combobox.Item
      key={item.value}
      item={item}
      persistFocus
      height="auto"
      px="4"
      py="3"
    >
      <Stack gap="0">
        <Text>{query}</Text>
        <Text fontWeight="medium">{item.label}</Text>
        <Text textStyle="sm" fontWeight="medium" color="colorPalette.default">
          {item.category}
        </Text>
        <Text textStyle="sm" color="fg.muted" mt="0.5" lineClamp={2}>
          {item.description}
        </Text>
      </Stack>
    </Combobox.Item>
  );
}

interface ListProps {
  matches: Array<Item>;
  query: string;
  disableSlowdown?: boolean;
}

export const List = memo(function List({
  matches,
  query,
  disableSlowdown,
}: ListProps) {
  // Log once. The actual slowdown is inside Item.
  console.log("[ARTIFICIALLY SLOW] Rendering many <Item />");

  return (
    <Combobox.List>
      {matches.length === 0 && (
        <Center p="3" minH="40">
          <Text color="fg.muted" textStyle="sm">
            No results found for <Text as="strong">{query}</Text>
          </Text>
        </Center>
      )}
      {matches.map((item) => (
        <ListItem
          key={item.value}
          query={query}
          item={item}
          disableSlowdown={disableSlowdown}
        />
      ))}
    </Combobox.List>
  );
});
