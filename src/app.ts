import { Context, Telegraf } from "telegraf";
import { Update } from "typegram";
import "./config";
import { onStartHandler, onTextHanlder } from "./lib/telegram-handlers";

const token = process.env.BOT_TOKEN as string;
const bot: Telegraf<Context<Update>> = new Telegraf(token);

bot.start(onStartHandler);
bot.on("text", onTextHanlder);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
