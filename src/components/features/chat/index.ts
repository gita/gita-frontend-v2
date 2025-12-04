// Old chat components (deprecated - using chat-sdk components now)
// export { ChatContainer } from "./ChatContainer";
// export { ChatInput } from "./ChatInput";
// export { ChatMessage } from "./ChatMessage";
// export { ChatPage } from "./ChatPage";

// Re-export new chat-sdk components for backwards compatibility
export { Chat as ChatContainer } from "../chat-sdk/chat";
export { MultimodalInput as ChatInput } from "../chat-sdk/multimodal-input";
export { Message as ChatMessage } from "../chat-sdk/message";
export { Chat as ChatPage } from "../chat-sdk/chat";

// Keep ChatWidget for floating widget on other pages
export { ChatWidget } from "./ChatWidget";

