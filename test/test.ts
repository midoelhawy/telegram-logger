import { Telegram } from "../lib/telegram";

const chatId = process.env.CHAT_ID as string;

const botToken = process.env.BOT_TOKEN as string;


(async () => {
    const logger = new Telegram({
        defaultBotToken: botToken,
        defaultChatId: chatId,
        ignoreSendingErrors: true
    })
/* 
    logger.configurateChannels({
        debug:{
            chatId:"-10000000",
            botToken
        }
    })
 */


    logger.i18nTranslation({
        type:"النوع",
        priority:"الأولوية"
    })


    logger.transaltePriorites({
        critical: "⚫️⚫️ شائك ⚫️⚫️",
        high: "🔴🔴 مرتفع 🔴🔴",
        low: "🔵🔵 منخفض 🔵🔵",
        medium: "🟠🟠 متوسط 🟠🟠",
    })



    logger.transalteTypes({
        error: "❌ خطأ ",
        debug: "💤 عام ",
        info: "❕ معلومة ",
        success: "✅ نجاح ",
        warning: "⚠️ تحذير ",
    })


    logger.info(`هذا هو مجرد نص غير قابل للهندلة`, {
        priority: "low"
    })



})().catch(console.error)


