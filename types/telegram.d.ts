export {};

type TelegramHapticImpactStyle = "light" | "medium" | "heavy" | "rigid" | "soft";

interface TelegramWebAppMainButton {
  setText?: (text: string) => void;
  show?: () => void;
  hide?: () => void;
  onClick?: (callback: () => void) => void;
  offClick?: (callback: () => void) => void;
}

interface TelegramWebApp {
  MainButton?: TelegramWebAppMainButton;
  HapticFeedback?: {
    impactOccurred?: (style: TelegramHapticImpactStyle) => void;
    selectionChanged?: () => void;
  };
  sendData?: (data: string) => void;
  showPopup?: (params: {
    title?: string;
    message: string;
    buttons?: Array<{ id: string; type: "default" | "destructive" | "close"; text: string }>;
  }) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}
