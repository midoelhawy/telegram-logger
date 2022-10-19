## **telegram-logger-ts**

simple libreary used to monitor your node application from your telegram channels



### HOW it works


Configurate Library by replacing `botToken` with your default bot token and your `chatId`
*NOTE: YOU CAN SEPARETE LOGS LEVELS IN DIFFRENT CHANNELS BY DIFFRENT BOTS*
```typescript
    const logger = new Telegram({
        defaultBotToken: botToken,// this bot will be used by default to send logs for channels with out configuration
        defaultChatId: chatId, // this chat will be used by default to send logs for channels with out configuration
        ignoreSendingErrors: true// ignore catched errors 
    })


    logger.info(`This content will be delivired to as info log`, {
        priority: "low"
    })

    logger.success(`This content will be delivired to as success log`, {
        priority: "low"
    })

    logger.error(`This content will be delivired to as error log`, {
        priority: "critical"
    })



    logger.warning(`This content will be delivired to as warning log`, {
        priority: "high"
    })

```
*NOTE: Telegram frequently ban bots to send messeges if the sending rate is to fast; to avoid this problem you can semply configurate diffrent bot for diffrent channel*

```typescript

    logger.configurateChannels({
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

Else you can support diffrent language by setting the default keyword

```typescript

    logger.i18nTranslation({
        type:"tipo",
        priority:"priorità"
    })


    logger.transaltePriorites({
        critical: "⚫️⚫️ critico ⚫️⚫️",
        high: "🔴🔴 alto 🔴🔴",
        low: "🔵🔵 passo 🔵🔵",
        medium: "🟠🟠 medio 🟠🟠",
    })



    logger.transalteTypes({
        error: "❌ Errore ",
        debug: "💤 Debug ",
        info: "❕ Info ",
        success: "✅ SUccess ",
        warning: "⚠️ Alarme ",
    })



```
