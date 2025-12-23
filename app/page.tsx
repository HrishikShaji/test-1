import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">test-1</h1>
          <p className="text-lg text-gray-600">test-1</p>
          <p className="text-sm text-gray-500 mt-2">test-1</p>
        </div>
        <ChatInterface />
      </div>
    </main>
  );
}
