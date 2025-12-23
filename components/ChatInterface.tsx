
"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Bot, User } from "lucide-react";

export default function ChatInterface() {
	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({ api: "/api/chat" }),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const input = formData.get("input") as string;

		if (!input.trim()) return;

		sendMessage({
			text: input,
		}, {
			body: {
				model: "gpt-4o-mini"
			}
		});

		// Reset the form
		e.currentTarget.reset();
	};

	const isLoading = status === "submitted" || status === "streaming";

	return (
		<div className="flex flex-col h-[600px] border rounded-lg shadow-lg bg-white">
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length === 0 && (
					<div className="text-center text-gray-500 mt-8">
						<Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
						<p>Start a conversation!</p>
					</div>
				)}
				{messages.map((message) => (
					<div
						key={message.id}
						className="flex gap-3"
						style={{ justifyContent: message.role === "user" ? "end" : "start" }}
					>
						{message.role === "assistant" && (
							<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
								<Bot className="w-5 h-5 text-white" />
							</div>
						)}
						<div
							className="max-w-[70%] rounded-lg px-4 py-2"
							style={{
								color: message.role === "user" ? "white" : "black",
								background: message.role === "user" ? "blue" : "gray"
							}}
						>
							{message.parts.map((part, i) => {
								if (part.type === "text") {
									return (
										<p key={i} className="whitespace-pre-wrap">
											{part.text}
										</p>
									);
								}
								return null;
							})}
						</div>
						{message.role === "user" && (
							<div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
								<User className="w-5 h-5 text-white" />
							</div>
						)}
					</div>
				))}
				{isLoading && (
					<div className="flex gap-3 justify-start">
						<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
							<Bot className="w-5 h-5 text-white" />
						</div>
						<div className="bg-gray-100 rounded-lg px-4 py-2">
							<div className="flex gap-1">
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: "0ms" }}
								/>
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: "150ms" }}
								/>
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: "300ms" }}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			<form onSubmit={handleSubmit} className="border-t p-4">
				<div className="flex gap-2">
					<input
						name="input"
						className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Type your message..."
						disabled={isLoading}
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						<Send className="w-4 h-4" />
						Send
					</button>
				</div>
			</form>
		</div>
	);
}

