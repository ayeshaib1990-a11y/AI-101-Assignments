import React, { useState, useRef, useEffect } from "react";
import { Pet } from "../types";
import { TRANSLATIONS } from "../utils";
import { 
  Send, 
  User, 
  Bot, 
  HelpCircle, 
  Sparkles, 
  AlertCircle, 
  RefreshCcw,
  Volume2,
  Info
} from "lucide-react";

interface AiAdvisorProps {
  activePet: Pet;
  lang: string;
}

interface Message {
  role: "user" | "assistant";
  text: string;
  isFallback?: boolean;
}

export default function AiAdvisor({ activePet, lang }: AiAdvisorProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];
  
  // States
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: lang === "en" 
        ? `Assalam-o-Alaikum! I am Dr. Anees, your dedicated PakPet AI health consultant. I see your gorgeous pet is ${activePet.name}, a beautiful ${activePet.breed} from ${activePet.city}. How can I assist you today? (You can type in English, Urdu or Romanized Urdu!)`
        : `السلام علیکم! میں ڈاکٹر انیس ہوں، آپ کا پاک پیٹ اے آئی ہیلتھ مشیر۔ مجھے خوشی ہے کہ آپ کے پاس ${activePet.name} ہے، جو ${activePet.city} سے ایک خوبصورت پپ/کٹی ہے۔ میں آج آپ کی کیا مدد کر سکتا ہوں؟`
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRomanUrdu, setIsRomanUrdu] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Quick preset questions corresponding to regional issues in Pakistan
  const QUICK_PROMPTS = [
    {
      label: "Karachi Heat Protection",
      prompt: `Suggest a heatwave protection diet and hydration checklist for my ${activePet.breed} in Karachi.`
    },
    {
      label: "Monsoon Tick Dosage",
      prompt: `What is the safety dose of Frontline spot-on for a ${activePet.weight} kg ${activePet.type} in Pakistan during monsoon?`
    },
    {
      label: "Stomach Cure (Home Remedy)",
      prompt: `My pet has mild loose motions. Is curd (dahi) or boiled pumpkin soup safe? Give feeding ratios.`
    },
    {
      label: "Urdu translation toggle",
      prompt: `Give me guidance in Romanized Urdu on safe foods alternatives for ${activePet.type} breeds in Pakistan.`
    }
  ];

  // Auto Scroll Chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: textToSend,
          // Slice history for performance, preserving last 4 conversational turns in context
          history: messages.slice(-4).map(m => ({ role: m.role, text: m.text })),
          // Contextual prompt additions tailored to current pet variables
          sysInstruction: `You are PakPet AI Dr. Anees, an expert veterinarian in Pakistan. Customize medical/nutrition recommendations for client pet named "${activePet.name}", Category: "${activePet.type}", Breed: "${activePet.breed}", Weight: "${activePet.weight} kg", located in "${activePet.city}". Keep suggestions highly practical for Pakistan store markets and home cooked remedies.`
        })
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages(prev => [...prev, { role: "assistant", text: data.text }]);
      } else {
        throw new Error(data.error || "Model error negotiating response.");
      }
    } catch (err: any) {
      console.warn("AI Response failed, using smart doctor rule-based fallback advice", err);
      
      // Calculate realistic veterinarian rule-based fallback advice based on prompt tokens keyword
      const normalizedPrompt = textToSend.toLowerCase();
      let fallbackText = "";

      if (normalizedPrompt.includes("heat") || normalizedPrompt.includes("humid") || normalizedPrompt.includes("karachi")) {
        fallbackText = lang === "en"
          ? `[PREVIEW ADVICE] Regarding Heat Protection: During hot periods, protect ${activePet.name} of high humidity. Mix 1 cup boiled skinless shredded chicken with 2 tbsp of unsweetened Curd (Dahi) to cool their systems. Keep active pets in ventilated shade and add minor electrolytes (ORS) to drinking cups. Note: Please configure your GEMINI_API_KEY in the Settings > Secrets panel for active live chat consulting.`
          : `[مفت طبی مشورہ - ویب کیم fallback] شدید گرمی میں اپنے پالتو جانور Sherry کے لیے دہی کا استعمال کریں۔ ٹھنڈا کدو ابال کر دہی میں ملائیں اور دھوپ میں ہر گز نہ نکالیں۔ لائیو چیٹ سروس فعال کرنے کے لیے ترتیبات میں اپنا جیمنی اے پی آئی کلید درج کریں۔`;
      } else if (normalizedPrompt.includes("tick") || normalizedPrompt.includes("flea") || normalizedPrompt.includes("fev")) {
        fallbackText = lang === "en"
          ? `[PREVIEW ADVICE] Tick Prevention: In monsoon conditions in ${activePet.city}, ensure Bravecto or Frontline spot-on doses are measured according to ${activePet.name}'s weight (${activePet.weight} kg). Check ear canals and paws. Never pull active ticks manually as the heads break inside causing severe infection.`
          : `[مفت طبی مشورہ] پسو مٹانے کے لیے ان کے پنجوں کا معائنہ کریں۔ مناسب مقدار میں فرنٹ لائن سپرے استعمال کریں اور پالتو کتے کی خواب گاہ کو خشک اور پاک رکھیں۔`;
      } else {
        fallbackText = lang === "en"
          ? `[PREVIEW OFF-LINE CLINIC ADVICE] Thank you for your inquiry about ${activePet.name}. For optimal pet health, guarantee a diet rich in proteins, keep an eye on active ticks/fleas in ${activePet.city}, and update deworming cycles every 3 months. Note: Ensure your GEMINI_API_KEY is configured in the Settings > Secrets panel to unlock liveness GPT vet consults!`
          : `[مفت طبی مشورہ] آپ کی انکوائری کا بہت شکریہ۔ ${activePet.name} کو صحت مند رکھنے کے لئے روزانہ ورزش، صاف پانی اور ابلا ہوا مرغی چاول فراہم کریں۔ لائیو اے آئی مشورے کے لئے جیمنی کلید کو کنفیگر کریں۔`;
      }

      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: fallbackText,
        isFallback: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[650px]" id="advisor-view">
      
      {/* 1. HEADER BRANDING */}
      <div className="bg-indigo-900 text-white p-5 rounded-t-3xl flex items-center justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-800 rounded-full -mr-12 -mt-12 opacity-40" />
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-800/80 border border-indigo-700/60 flex items-center justify-center text-lg font-bold shadow-md select-none shrink-0">
            🩺
          </div>
          <div>
            <h4 className="font-sans font-black text-sm flex items-center gap-1.5 leading-tight">
              <span>Dr. Anees Malik</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block animate-pulse border border-white" />
            </h4>
            <p className="text-[10px] text-indigo-200">PakPet AI Vet Expert • Online</p>
          </div>
        </div>

        {/* Floating badge info */}
        <div className="inline-flex gap-1.5 items-center bg-indigo-800 px-3 py-1 rounded-xl text-[10px] border border-indigo-700 font-mono">
          <Sparkles className="w-3 h-3 text-rose-400 fill-rose-400" />
          <span>Gemini 3.5 Flash Active</span>
        </div>
      </div>

      {/* API Configuration alert instruction if assistant returns a fallback flag */}
      {messages.some(m => m.isFallback) && (
        <div className="bg-amber-50 border-b border-amber-200 p-3 flex items-start gap-2.5 text-[11px] text-amber-800">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Missing Gemini API Key:</strong> The chat is currently operating in localized offline veterinary simulation mode. To enable active live consultations with Gemini, go to the <strong>Settings &gt; Secrets</strong> panel in Google AI Studio and enter your key. No code edits are required!
          </div>
        </div>
      )}

      {/* 2. CHAT FEED BLOCK */}
      <div 
        id="advisor-chat-log"
        ref={chatContainerRef} 
        className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50"
      >
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 max-w-[85%] ${message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {/* Avatar circle */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 ${
              message.role === "user" 
                ? "bg-indigo-600 text-white" 
                : "bg-white border border-slate-200 text-indigo-900"
            }`}>
              {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Content text bubbles */}
            <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs font-sans ${
              message.role === "user"
                ? "bg-indigo-600 text-white rounded-tr-none font-bold"
                : "bg-white border border-slate-100 text-slate-800 rounded-tl-none font-medium"
            }`}>
              
              {/* Optional Roman Urdu/Urdu tag indication */}
              {message.role === "assistant" && message.isFallback && (
                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block mb-1">
                  💡 Rules-Based Diagnostic Fallback
                </span>
              )}

              {/* Render response text */}
              <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 animate-spin border-2 border-dashed border-indigo-600 shrink-0" />
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-xs text-xs text-slate-500 italic flex items-center gap-1.5 font-bold">
              <span>{t.loadingAdvisor}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick topics picker panel */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2 shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block w-full mb-1">
          {t.quickAsk}:
        </span>
        {QUICK_PROMPTS.map((q, idx) => (
          <button
            key={idx}
            type="button"
            id={`btn-preset-ask-${idx}`}
            onClick={() => handleSendMessage(q.prompt)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 text-[10px] font-bold shadow-xs hover:shadow-indigo-50 cursor-pointer"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* 3. INPUT BAR */}
      <div className="p-4 bg-white border-t border-slate-100 rounded-b-3xl shrink-0">
        <form
          id="advisor-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            id="advisor-message-input"
            disabled={isLoading}
            placeholder={t.placeholderMessage}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow rounded-xl border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          <button
            type="submit"
            id="btn-send-message-submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-indigo-650 hover:bg-indigo-800 text-white rounded-xl px-4 py-3 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-40"
            title="Submit question to veterinarian"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
