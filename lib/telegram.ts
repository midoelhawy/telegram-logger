import axios from "axios"
import FormData from 'form-data'
import { priorityTransaltion, typeTransaltion } from "../consts"
import { LogType, StaticArgs } from '../interfaces'
export class Telegram {
    ignoreSendingErrors: boolean = false
    priorityTransaltion = priorityTransaltion
    typeTransaltion = typeTransaltion
    channels: {
        [key in LogType | "default"]?: {
            chatId: string,
            botToken: string
        }
    } = {

        }

    i18n: {
        priority: string,
        type: string,
    } = {
            priority: "Priority",
            type: "Type"
        }

    i18nTranslation(
        values: Partial<typeof this.i18n>
    ) {
        this.i18n = { ...this.i18n, ...values }
    }


    translateTypes(
        values: Partial<typeof typeTransaltion>
    ) {

        this.typeTransaltion = { ...this.typeTransaltion, ...values }

    }

    translatePriorities(
        values: Partial<typeof priorityTransaltion>
    ) {

        this.priorityTransaltion = { ...this.priorityTransaltion, ...values }

    }


    configureChannels(channels:typeof this.channels){
        this.channels = {...this.channels,...channels}
    }


    constructor(opts: { defaultChatId: string, defaultBotToken: string, ignoreSendingErrors: boolean }) {
        this.ignoreSendingErrors = opts.ignoreSendingErrors
        this.channels.default = {
            chatId: opts.defaultChatId,
            botToken: opts.defaultBotToken,
        }
    }

    #getChatAndTokenByType(type: LogType) {
        const channel = this.channels[type];
        let chatId: string | undefined = undefined
        let botToken: string | undefined = undefined
        if (channel?.chatId) {
            chatId = this.channels.info?.chatId;
        } else if (this.channels.default?.chatId) {
            chatId = this.channels.default?.chatId
        } else {
            throw new Error(`You need to set default channel or ${type} to send ${type} log; please see the documentation!`);
        }


        if (channel?.botToken) {
            botToken = this.channels.info?.botToken;
        } else if (this.channels.default?.botToken) {
            botToken = this.channels.default?.botToken
        } else {
            throw new Error(`You need to set default channel or ${type} to send ${type} log; please see the documentation!`);
        }

        return [chatId, botToken] as [string, string]

    }


    async info(msg: string, staticArgs?: StaticArgs, ignoreSendingErrors?: boolean, file?: {
        buff: Buffer,
        fileName?: string
    }) {
        return await this.#sendLog("info", { msg, ignoreSendingErrors, file, staticArgs })
    }


    async debug(msg: string, staticArgs?: StaticArgs, ignoreSendingErrors?: boolean, file?: {
        buff: Buffer,
        fileName?: string
    }) {

        return await this.#sendLog("debug", { msg, ignoreSendingErrors, file, staticArgs })
    }

    async error(msg: string, staticArgs?: StaticArgs, ignoreSendingErrors?: boolean, file?: {
        buff: Buffer,
        fileName?: string
    }) {

        return await this.#sendLog("error", { msg, ignoreSendingErrors, file, staticArgs })
    }


    async success(msg: string, staticArgs?: StaticArgs, ignoreSendingErrors?: boolean, file?: {
        buff: Buffer,
        fileName?: string
    }) {

        return await this.#sendLog("success", { msg, ignoreSendingErrors, file, staticArgs })
    }


    async warning(msg: string, staticArgs?: StaticArgs, ignoreSendingErrors?: boolean, file?: {
        buff: Buffer,
        fileName?: string
    }) {

        return await this.#sendLog("warning", { msg, ignoreSendingErrors, file, staticArgs })
    }

    async #sendLog(type: LogType, opts: {
        msg: string, ignoreSendingErrors?: boolean, file?: {
            buff: Buffer,
            fileName?: string
        }, staticArgs?: StaticArgs
    }) {

        opts.staticArgs = opts.staticArgs || {};

        opts.staticArgs.type = type

        const finalMsg = this.formatMessage(opts.msg.trim(), opts.staticArgs)
        let [chatId, botToken] = this.#getChatAndTokenByType(type)

        return await this.send({ ...opts, chatId, token: botToken, msg: finalMsg })

    }


    async send(

        opts: {
            msg: string,
            token: string,
            chatId: string,
            file?: {
                buff: Buffer,
                fileName?: string
            },
            ignoreSendingErrors?: boolean
        }

    ) {
        try {

            if (opts.file) {
                const data = new FormData()
                data.append('chat_id', opts.chatId)
                data.append('parse_mode', 'HTML')
                data.append('document', opts.file.buff, opts.file.fileName ?? '')
                data.append('caption', opts.msg || '')
                return await axios.post(`https://api.telegram.org/bot${opts.token}/sendDocument`, data, {
                    headers: data.getHeaders(),
                    'maxContentLength': Infinity,
                    'maxBodyLength': Infinity
                })
            } else {
                await axios.get(`https://api.telegram.org/bot${opts.token}/sendMessage?chat_id=${opts.chatId}&text=${encodeURI(opts.msg)}&parse_mode=HTML`)
            }


        } catch (err) {
            if (!this.ignoreSendingErrors || (!opts.ignoreSendingErrors && typeof opts.ignoreSendingErrors != "undefined")) {
                throw err;
            }
            console.error({}, err)
        }

    }








    formatMessage(msg: string, staticArgs?: StaticArgs): string {
        const newLine = '\n'
        let finalMessage = newLine.repeat(2)
        

        if (staticArgs) {
            if (staticArgs.priority) {
                finalMessage += `<b>${this.i18n.priority}</b>  : <i>${this.priorityTransaltion[staticArgs.priority] ?? staticArgs.priority}</i> ${newLine}`;
                delete staticArgs.priority
            }

            if (staticArgs.type) {
                finalMessage += `<b>${this.i18n.type}</b>  : <i>${this.typeTransaltion[staticArgs.type as LogType] ?? staticArgs.type}</i> ${newLine}`
                delete staticArgs.type
            }


            for (const key of Object.keys(staticArgs)) {
                finalMessage += `<b>${key}</b>  : <i>${staticArgs[key]}</i> ${newLine}`
            }
        }

        if (finalMessage != "") finalMessage += '\n ============================================ \n\n'

        finalMessage += msg.replace(/(?:\r\n|\r|\n)/g, newLine);

        return finalMessage
    }
}
