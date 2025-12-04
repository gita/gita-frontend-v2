import type { Metadata } from "next";

import { Chat } from "@/components/features/chat-sdk";

// Dynamic rendering for chat functionality
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GitaGPT Chat | Bhagavad Gita AI Chatbot",
  description:
    "Continue your conversation with GitaGPT. Get wisdom from the Bhagavad Gita.",
};

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Chat chatId={id} />;
}

