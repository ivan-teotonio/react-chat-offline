export type Sender = "user" | "robot";

export type Message = {
  id: string;
  text: string;
  sender: Sender;
  createdAt: string;
};

export type ChatState = {
  messages: Message[];
};
