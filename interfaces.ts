export type LogPriority = "low" | "medium" | "high" | "critical" 
export type LogType = "warning"|"info"|"success"|"error"|"debug"

export interface StaticArgs {
    priority?: LogPriority,
    //type?:LogType,
    [key: string]: string|undefined
}
