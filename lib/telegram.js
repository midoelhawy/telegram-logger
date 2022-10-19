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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Telegram_instances, _Telegram_getChatAndTokenByType, _Telegram_sendLog;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegram = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const consts_1 = require("../consts");
class Telegram {
    constructor(opts) {
        _Telegram_instances.add(this);
        this.ignoreSendingErrors = false;
        this.priorityTransaltion = consts_1.priorityTransaltion;
        this.typeTransaltion = consts_1.typeTransaltion;
        this.channels = {};
        this.i18n = {
            priority: "Priority",
            type: "Type"
        };
        this.ignoreSendingErrors = opts.ignoreSendingErrors;
        this.channels.default = {
            chatId: opts.defaultChatId,
            botToken: opts.defaultBotToken,
        };
    }
    i18nTranslation(values) {
        this.i18n = Object.assign(Object.assign({}, this.i18n), values);
    }
    transalteTypes(values) {
        this.typeTransaltion = Object.assign(Object.assign({}, this.typeTransaltion), values);
    }
    transaltePriorites(values) {
        this.priorityTransaltion = Object.assign(Object.assign({}, this.priorityTransaltion), values);
    }
    configurateChannels(channels) {
        this.channels = Object.assign(Object.assign({}, this.channels), channels);
    }
    info(msg, staticArgs, ignoreSendingErrors, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _Telegram_instances, "m", _Telegram_sendLog).call(this, "info", { msg, ignoreSendingErrors, file, staticArgs });
        });
    }
    debug(msg, staticArgs, ignoreSendingErrors, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _Telegram_instances, "m", _Telegram_sendLog).call(this, "debug", { msg, ignoreSendingErrors, file, staticArgs });
        });
    }
    error(msg, staticArgs, ignoreSendingErrors, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _Telegram_instances, "m", _Telegram_sendLog).call(this, "error", { msg, ignoreSendingErrors, file, staticArgs });
        });
    }
    success(msg, staticArgs, ignoreSendingErrors, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _Telegram_instances, "m", _Telegram_sendLog).call(this, "success", { msg, ignoreSendingErrors, file, staticArgs });
        });
    }
    warning(msg, staticArgs, ignoreSendingErrors, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _Telegram_instances, "m", _Telegram_sendLog).call(this, "warning", { msg, ignoreSendingErrors, file, staticArgs });
        });
    }
    send(opts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (opts.file) {
                    const data = new form_data_1.default();
                    data.append('chat_id', opts.chatId);
                    data.append('parse_mode', 'HTML');
                    data.append('document', opts.file.buff, (_a = opts.file.fileName) !== null && _a !== void 0 ? _a : '');
                    data.append('caption', opts.msg || '');
                    return yield axios_1.default.post(`https://api.telegram.org/bot${opts.token}/sendDocument`, data, {
                        headers: data.getHeaders(),
                        'maxContentLength': Infinity,
                        'maxBodyLength': Infinity
                    });
                }
                else {
                    yield axios_1.default.get(`https://api.telegram.org/bot${opts.token}/sendMessage?chat_id=${opts.chatId}&text=${encodeURI(opts.msg)}&parse_mode=HTML`);
                }
            }
            catch (err) {
                if (!this.ignoreSendingErrors || (!opts.ignoreSendingErrors && typeof opts.ignoreSendingErrors != "undefined")) {
                    throw err;
                }
                console.error({}, err);
            }
        });
    }
    formatMessage(msg, staticArgs) {
        var _a, _b;
        const newLine = '\n';
        let finalMessage = newLine.repeat(2);
        if (staticArgs) {
            if (staticArgs.priority) {
                finalMessage += `<b>${this.i18n.priority}</b>  : <i>${(_a = this.priorityTransaltion[staticArgs.priority]) !== null && _a !== void 0 ? _a : staticArgs.priority}</i> ${newLine}`;
                delete staticArgs.priority;
            }
            if (staticArgs.type) {
                finalMessage += `<b>${this.i18n.type}</b>  : <i>${(_b = this.typeTransaltion[staticArgs.type]) !== null && _b !== void 0 ? _b : staticArgs.type}</i> ${newLine}`;
                delete staticArgs.type;
            }
            for (const key of Object.keys(staticArgs)) {
                finalMessage += `<b>${key}</b>  : <i>${staticArgs[key]}</i> ${newLine}`;
            }
        }
        if (finalMessage != "")
            finalMessage += '\n ============================================ \n\n';
        finalMessage += msg.replace(/(?:\r\n|\r|\n)/g, newLine);
        return finalMessage;
    }
}
exports.Telegram = Telegram;
_Telegram_instances = new WeakSet(), _Telegram_getChatAndTokenByType = function _Telegram_getChatAndTokenByType(type) {
    var _a, _b, _c, _d, _e, _f;
    const channel = this.channels[type];
    let chatId = undefined;
    let botToken = undefined;
    if (channel === null || channel === void 0 ? void 0 : channel.chatId) {
        chatId = (_a = this.channels.info) === null || _a === void 0 ? void 0 : _a.chatId;
    }
    else if ((_b = this.channels.default) === null || _b === void 0 ? void 0 : _b.chatId) {
        chatId = (_c = this.channels.default) === null || _c === void 0 ? void 0 : _c.chatId;
    }
    else {
        throw new Error(`You need to set default channel or ${type} to send ${type} log; please see the documentation!`);
    }
    if (channel === null || channel === void 0 ? void 0 : channel.botToken) {
        botToken = (_d = this.channels.info) === null || _d === void 0 ? void 0 : _d.botToken;
    }
    else if ((_e = this.channels.default) === null || _e === void 0 ? void 0 : _e.botToken) {
        botToken = (_f = this.channels.default) === null || _f === void 0 ? void 0 : _f.botToken;
    }
    else {
        throw new Error(`You need to set default channel or ${type} to send ${type} log; please see the documentation!`);
    }
    return [chatId, botToken];
}, _Telegram_sendLog = function _Telegram_sendLog(type, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        opts.staticArgs = opts.staticArgs || {};
        opts.staticArgs.type = type;
        const finalMsg = this.formatMessage(opts.msg.trim(), opts.staticArgs);
        let [chatId, botToken] = __classPrivateFieldGet(this, _Telegram_instances, "m", _Telegram_getChatAndTokenByType).call(this, type);
        return yield this.send(Object.assign(Object.assign({}, opts), { chatId, token: botToken, msg: finalMsg }));
    });
};
