## **telegram-logger-ts**

simple library used to monitor your node application from your telegram channels



### HOW it works


Configure Library by replacing `botToken` with your default bot token and your `chatId`
*NOTE: YOU CAN SEPARATE LOGS LEVELS IN DIFFERENT CHANNELS BY DIFFERENT BOTS*
```typescript
    const logger = new Telegram({
        defaultBotToken: botToken,// this bot will be used by default to send logs for channels with out configuration
        defaultChatId: chatId, // this chat will be used by default to send logs for channels with out configuration
        ignoreSendingErrors: true // ignore sending error (NOTE: IN CASE OF ERROR FROM TELEGRAM THE MESSAGE WILL BE IGNORED)
    })


    logger.info(`This content will be delivered to Telegram as info log`, {
        priority: "low"
    })

    logger.success(`This content will be delivered to Telegram as success log`, {
        priority: "low"
    })

    logger.error(`This content will be delivered to Telegram as error log`, {
        priority: "critical"
    })



    logger.warning(`This content will be delivered to Telegram as warning log`, {
        priority: "high"
    })

```
*NOTE: Telegram frequently ban bots to send messages if the sending rate is to fast; to avoid this problem you can simply configure different bot for different channel*

```typescript

    logger.configureChannels({
        debug:{
            chatId:"YOUR_DEBUG_CHAT_ID",
            botToken:"YOUR_DEBUG_BOT_TOKEN"
        },
        error:{
            chatId:"YOUR_ERROR_CHAT_ID",
            botToken:"YOUR_ERROR_BOT_TOKEN"
        },
        info:{
            chatId:"YOUR_INFO_CHAT_ID",
            botToken:"YOUR_INFO_BOT_TOKEN"
        },
        success:{
            chatId:"YOUR_SUCCESS_CHAT_ID",
            botToken:"YOUR_SUCCESS_BOT_TOKEN"
        },
        warning:{
            chatId:"YOUR_WARNING_CHAT_ID",
            botToken:"YOUR_WARNING_BOT_TOKEN"
        }
    })

```

Else you can support different language by setting the default keyword

```typescript

    logger.i18nTranslation({
        type:"tipo",
        priority:"priorità"
    })


    logger.translatePriorities({
        critical: "⚫️⚫️ critico ⚫️⚫️",
        high: "🔴🔴 alto 🔴🔴",
        low: "🔵🔵 passo 🔵🔵",
        medium: "🟠🟠 medio 🟠🟠",
    })



    logger.translateTypes({
        error: "❌ Errore ",
        debug: "💤 Debug ",
        info: "❕ Info ",
        success: "✅ SUccess ",
        warning: "⚠️ Alarme ",
    })



```
