type status = "online" | "idle" | "dnd" | "offline" | undefined;

export default function statusToColor(status: status) {
  return `#${
    status == "online"
      ? "3ba55d"
      : status == "idle"
      ? "faa819"
      : status == "dnd"
      ? "ed4043"
      : status == "offline"
      ? "737e8c"
      : "737e8c"
  }`;
}
