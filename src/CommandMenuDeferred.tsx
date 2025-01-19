"use client";
import { createListCollection } from "@ark-ui/react";
import { Portal } from "@ark-ui/react/portal";
import { SearchIcon } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Combobox } from "~/components/ui/combobox";
import { Dialog } from "~/components/ui/dialog";
import { IconButton } from "~/components/ui/icon-button";
import { Input } from "~/components/ui/input";
import { data } from "./data";
import { List } from "./List";
import { useFilteredItems } from "./use-filtered-items";

export const CommandMenuDeferred = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const matches = useFilteredItems(data, deferredQuery);

  const collection = createListCollection({ items: matches });

  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={(event) => setOpen(event.open)}
    >
      <Dialog.Trigger asChild>
        <IconButton
          variant="ghost"
          size={{ base: "md", md: "sm" }}
          css={{
            color: "fg.muted",
            _hover: { color: "fg.default" },
            "& svg": {
              width: "5",
              height: "5",
            },
          }}
        >
          <SearchIcon /> Deferred Menu
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Positioner alignItems="start" top="5%" bottom="5%">
          <Dialog.Content
            p="2"
            width={{ base: "100%", sm: "md" }}
            _closed={{ animationName: "fade-out", animationDuration: "50ms" }}
          >
            <Combobox.Root
              open
              disableLayer
              inputBehavior="autohighlight"
              placeholder="Search the docs"
              selectionBehavior="clear"
              loopFocus={false}
              collection={collection}
              onValueChange={() => {
                setOpen(false);
              }}
              onInputValueChange={({ inputValue }) => setQuery(inputValue)}
            >
              <Combobox.Control>
                <Combobox.Input asChild>
                  <Input />
                </Combobox.Input>
              </Combobox.Control>
              <Combobox.Content
                boxShadow="none"
                px="0"
                py="0"
                overflow="auto"
                maxH="68vh"
                overscrollBehavior="contain"
              >
                <List matches={matches} query={deferredQuery} />
              </Combobox.Content>
            </Combobox.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
