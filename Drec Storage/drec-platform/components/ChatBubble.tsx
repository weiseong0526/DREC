import clsx from "clsx";
import type { ChatMessage } from "@/lib/types";

export function ChatBubble({ msg }: { msg: ChatMessage }) {
  const mine = msg.sender !== "patient";
  return (
    <div className={clsx("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[70%] rounded-2xl px-3.5 py-2 text-sm shadow-card",
          mine ? "bg-brand text-white" : "bg-white text-ink border border-line"
        )}
      >
        {msg.photoUrl && (
          <div className="mb-1 h-32 w-48 rounded-lg bg-line bg-cover bg-center" />
        )}
        <div className="whitespace-pre-wrap">{msg.text}</div>
        <div className={clsx("mt-1 text-[10px]", mine ? "text-white/75" : "text-muted")}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
