import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.weight100kg.dev/", // replace this with your deployed domain
  author: "InnocentWalls",
  desc: "weight100kg is blog",
  title: "イット密入国者ブログ",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minute
};

export const LOCALE = {
  lang: "ja", // html lang code. Set this empty and default will be "en"
  langTag: ["ja-JP"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Mastodon",
    href: "https://social.mikutter.hachune.net/@InnocentWalls",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:blog@weight100kg.dev",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/InnocentWalls",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/InnocentWalls",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Twitch",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://steamcommunity.com/profiles/76561198020528854",
    linkTitle: `${SITE.title} on Steam`,
    active: true,
  },

];
