"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Loader2, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { WELCOME_MESSAGE } from "@/config";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

const STORAGE_KEY = "chat-messages";

type StorageData = {
  messages: UIMessage[];
  durations: Record<string, number>;
};

const loadMessagesFromStorage = (): {
  messages: UIMessage[];
  durations: Record<string, number>;
} => {
  if (typeof window === "undefined") return { messages: [], durations: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { messages: [], durations: {} };

    const parsed = JSON.parse(stored);
    return {
      messages: parsed.messages || [],
      durations: parsed.durations || {},
    };
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
    return { messages: [], durations: {} };
  }
};

const saveMessagesToStorage = (
  messages: UIMessage[],
  durations: Record<string, number>
) => {
  if (typeof window === "undefined") return;
  try {
    const data: StorageData = { messages, durations };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save messages from localStorage:", error);
  }
};

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  const stored =
    typeof window !== "undefined"
      ? loadMessagesFromStorage()
      : { messages: [], durations: {} };
  const [initialMessages] = useState<UIMessage[]>(stored.messages);

  const { messages, sendMessage, status, stop, setMessages} = useChat({
    messages: initialMessages,
  });

  useEffect(() => {
    setIsClient(true);
    setDurations(stored.durations);
    setMessages(stored.messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isClient) {
      saveMessagesToStorage(messages, durations);
    }
  }, [durations, messages, isClient]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prevDurations) => {
      const newDurations = { ...prevDurations };
      newDurations[key] = duration;
      return newDurations;
    });
  };

  // Removed the automatic welcome message effect to show the Hero section instead
  // when there are no messages.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage({ text: data.message });
    form.reset();
  }

  function clearChat() {
    const newMessages: UIMessage[] = [];
    const newDurations = {};
    setMessages(newMessages);
    setDurations(newDurations);
    saveMessagesToStorage(newMessages, newDurations);
    toast.success("Chat cleared");
    welcomeMessageShownRef.current = false;
  }

  const handleSuggestionClick = (text: string) => {
  // send the suggestion as if the user typed it
  sendMessage({ text });
};


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header onClearChat={clearChat} />

      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 scroll-smooth">
            <div className="flex flex-col items-center min-h-full">
              {isClient ? (
                messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center w-full">
                    <Hero onSuggestionClick={handleSuggestionClick} />
                  </div>
                ) : (
                  <>
                    <MessageWall
                      messages={messages}
                      status={status}
                      durations={durations}
                      onDurationChange={handleDurationChange}
                    />
                    {status === "submitted" && (
                      <div className="flex justify-start max-w-3xl w-full mt-4 pl-1">
                        <div className="flex items-center gap-2 text-sm text-slate-400 animate-pulse">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    )}
                  </>
                )
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-slate-50 bg-white/80 backdrop-blur p-4 sm:p-6">
            <div className="max-w-3xl mx-auto w-full">
              <form id="chat-form" onSubmit={form.handleSubmit(onSubmit)} className="relative group">
                <FieldGroup>
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel htmlFor="chat-form-message" className="sr-only">
                          Message
                        </FieldLabel>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            id="chat-form-message"
                            className="h-14 w-full pl-6 pr-14 rounded-full bg-slate-50 border-slate-200 text-base shadow-sm transition-all focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 placeholder:text-slate-400"
                            placeholder="Ask Mandy for last-minute hotel help…"
                            disabled={status === "streaming"}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                          />
                          <div className="absolute right-2">
                            {(status === "ready" || status === "error") && (
                              <Button
                                className="rounded-full h-10 w-10 bg-[#003580] hover:bg-[#002860] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                                type="submit"
                                disabled={!field.value.trim()}
                                size="icon"
                              >
                                <ArrowUp className="w-5 h-5" />
                              </Button>
                            )}
                            {(status === "streaming" || status === "submitted") && (
                              <Button
                                className="rounded-full h-10 w-10 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                                size="icon"
                                variant="ghost"
                                onClick={() => stop()}
                              >
                                <Square className="w-4 h-4 fill-current" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
