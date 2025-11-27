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
import { ArrowUp, Loader2, Plus, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



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

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-2 -ml-4 text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Chat
                        </Button>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Use</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="lead text-lg text-slate-600">
                        Welcome to LastMinuteMandy. Please read these terms carefully before using our service.
                    </p>

                    <h3>1. Beta Project Disclaimer</h3>
                    <p>
                        <strong>LastMinuteMandy is a beta project</strong> created for demonstration and experimental purposes. It is <strong>not</strong> a licensed travel agency, and it does not facilitate direct bookings or payments.
                    </p>

                    <h3>2. No Guarantees</h3>
                    <p>
                        While we strive to provide accurate information through our integration with hotel search providers, we cannot guarantee the availability, price, or quality of any hotel listed. All information is subject to change without notice.
                    </p>

                    <h3>3. User Responsibility</h3>
                    <p>
                        You are responsible for verifying all details directly with the hotel or booking platform before making any reservations. LastMinuteMandy is not liable for any issues arising from your use of the suggestions provided.
                    </p>

                    <h3>4. Safety Information</h3>
                    <p>
                        Safety assessments provided by the AI are based on general neighborhood data and user reviews. They should not be taken as a guarantee of safety. Always exercise personal caution while traveling.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-500 text-sm">
                    Last updated: November 2025
                </div>
            </div>
        </div>
    );
}

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  const stored =
    typeof window !== "undefined"
      ? loadMessagesFromStorage()
      : { messages: [], durations: {} };
  const [initialMessages] = useState<UIMessage[]>(stored.messages);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
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

  useEffect(() => {
    if (
      isClient &&
      initialMessages.length === 0 &&
      !welcomeMessageShownRef.current
    ) {
      const welcomeMessage: UIMessage = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        parts: [
          {
            type: "text",
            text: WELCOME_MESSAGE,
          },
        ],
      };
      setMessages([welcomeMessage]);
      saveMessagesToStorage([welcomeMessage], {});
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, initialMessages.length, setMessages]);

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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fb] via-[#fffdfb] to-[#ffe8dd] flex items-center justify-center px-4 py-6">
      <main className="w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Top brand bar (scrolls with content – not fixed) */}
       <header className="flex items-center justify-between px-6 py-5 border-b bg-white/95">
  <div className="flex items-center gap-4">
    {/* Logo tile */}
    <div className="relative w-14 h-14 rounded-2xl bg-[#003580]/5 flex items-center justify-center ring-2 ring-[#ffb35a]/60 shadow-sm">
      <div className="absolute inset-0 rounded-2xl bg-white/40" />
      <img
        src="/file.svg"  // make sure this file is in /public
        alt="LastMinuteMandy logo"
        className="relative w-9 h-9"
      />
    </div>

    {/* Brand text */}
    <div className="flex flex-col leading-tight">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold tracking-tight text-[#003580]">
          LastMinuteMandy
        </span>
        <span className="inline-flex items-center rounded-full border border-[#ffb35a]/60 bg-[#fff3dd] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b86a1f]">
          Beta
        </span>
      </div>
      <span className="mt-1 text-sm text-slate-600">
        Smart, safety-aware hotel picks when you’re in a rush.
      </span>
    </div>
  </div>

  {/* New chat button */}
  <Button
    variant="outline"
    size="sm"
    className="rounded-full text-xs font-medium gap-1 border-slate-200 bg-slate-50 hover:bg-slate-100"
    onClick={clearChat}
  >
    <Plus className="w-3 h-3" />
    New search
  </Button>
</header>


        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col items-center justify-end min-h-full">
            {isClient ? (
              <>
                <MessageWall
                  messages={messages}
                  status={status}
                  durations={durations}
                  onDurationChange={handleDurationChange}
                />
                {status === "submitted" && (
                  <div className="flex justify-start max-w-3xl w-full mt-2">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center max-w-2xl w-full">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Input + footer */}
        <footer className="border-t bg-white/90 px-5 pt-3 pb-2">
          <form id="chat-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="chat-form-message"
                      className="sr-only"
                    >
                      Message
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="chat-form-message"
                        className="h-12 pr-12 pl-4 rounded-full bg-slate-50 border-slate-200 focus-visible:ring-[#003580]"
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
                      {(status === "ready" || status === "error") && (
                        <Button
                          className="absolute right-1.5 top-1.5 rounded-full h-9 w-9 bg-[#003580] hover:bg-[#022347]"
                          type="submit"
                          disabled={!field.value.trim()}
                          size="icon"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                      )}
                      {(status === "streaming" || status === "submitted") && (
                        <Button
                          className="absolute right-1.5 top-1.5 rounded-full h-9 w-9"
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            stop();
                          }}
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <div className="mt-2 text-[11px] text-center text-muted-foreground">
            © {new Date().getFullYear()} {OWNER_NAME} ·{" "}
            <Link href="/terms" className="underline">
              Terms of Use
            </Link>{" "}
            · Powered by{" "}
            <Link href="https://ringel.ai/" className="underline">
              Ringel.AI
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
