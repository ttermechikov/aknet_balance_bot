import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from 'typegram';
import { AknetService } from '../services/aknet';

export const onStartHandler = async (ctx: Context) => {
  await ctx.reply(`Введите ваш лицевой счет, чтобы узнать ваш баланс`);
};

export const onTextHanlder = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  const personalAccount = ctx.message.text;

  try {
    const aknetService = new AknetService(personalAccount);
    const balance = await aknetService.getBalance();
    ctx.reply(`Ваш баланс: ${balance} сом`);
  } catch (e: unknown) {
    let errorMsg = 'Ошибка';

    if (typeof e === 'string') {
      errorMsg = e;
    }

    if (e instanceof Error) {
      errorMsg = e.message;
    }

    ctx.reply(errorMsg);
  }
};
