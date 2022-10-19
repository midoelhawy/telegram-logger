"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_1 = require("../lib/telegram");
const chatId = process.env.CHAT_ID;
const botToken = process.env.BOT_TOKEN;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new telegram_1.Telegram({
        defaultBotToken: botToken,
        defaultChatId: chatId,
        ignoreSendingErrors: true
    });
    /*
        logger.configurateChannels({
            debug:{
                chatId:"-10000000",
                botToken
            }
        })
     */
    logger.i18nTranslation({
        type: "النوع",
        priority: "الأولوية"
    });
    logger.transaltePriorites({
        critical: "⚫️⚫️ شائك ⚫️⚫️",
        high: "🔴🔴 مرتفع 🔴🔴",
        low: "🔵🔵 منخفض 🔵🔵",
        medium: "🟠🟠 متوسط 🟠🟠",
    });
    logger.transalteTypes({
        error: "❌ خطأ ",
        debug: "💤 عام ",
        info: "❕ معلومة ",
        success: "✅ نجاح ",
        warning: "⚠️ تحذير ",
    });
    logger.info(`هذا هو مجرد نص غير قابل للهندلة`, {
        priority: "low"
    });
}))().catch(console.error);
