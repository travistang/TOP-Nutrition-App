import { useEffect } from "react";
import bus, { EventBusName } from "../domain/EventBus";

export default function useEventBus(
  busName: EventBusName,
  onEvent: () => void
) {
  useEffect(() => {
    return bus.subscribe(busName, onEvent);
  });
}
