import { DiscordSVG, GithubSVG, TelegramSVG, XSVG } from '@/svg';

import { SocialLinkProps } from './social-link.types';

export const SOCIAL_LINK: ReadonlyArray<SocialLinkProps> = [
  {
    title: 'Discord',
    pathname: 'https://discord.com/invite/interestprotocol',
    Icon: DiscordSVG,
  },
  {
    title: 'Github',
    pathname: 'https://github.com/interest-protocol/',
    Icon: GithubSVG,
  },
  {
    title: 'Telegram',
    pathname: 'https://t.me/interestprotocol',
    Icon: TelegramSVG,
  },
  {
    title: 'X',
    pathname: 'https://x.com/IPXSui',
    Icon: XSVG,
  },
];
