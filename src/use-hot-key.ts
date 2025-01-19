import { useEnvironmentContext } from "@ark-ui/react";
import { useEffect } from "react";

export const useHotkey = (setOpen: (open: boolean) => void) => {
  const env = useEnvironmentContext();

  useEffect(() => {
    const document = env.getDocument();
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform);
    const hotkey = isMac ? "metaKey" : "ctrlKey";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === "k" && event[hotkey]) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeydown, true);
    return () => {
      document.removeEventListener("keydown", handleKeydown, true);
    };
  }, [env, setOpen]);
};
