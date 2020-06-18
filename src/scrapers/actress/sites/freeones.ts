import slugify from 'slugify';
import { ActressScraper } from '../type';
import { filter, regex } from '../transformers';
import { isCupsize, isEthnicity, isEyecolor, isHaircolor } from '../../../domain/actress/fixtures';

export const FreeonesScraper: ActressScraper = {
  nameToUrl: name => `https://www.freeones.com/${slugify(name)}/profile`,
  fields: {
    name: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.px-2.px-md-3 > section > header > div.d-flex.flex-column.flex-1.pl-3.pl-md-4.header-content > div > div.d-flex.flex-row.align-items-start.justify-content-between.justify-content-md-start > div.d-flex.flex-column.mr-2.mr-lg-4.align-items-start > h1 > span',
      type: 'text',
    },
    aliases: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.flex-1 > div.d-md-flex > div.d-flex.flex-column.profile-meta-item.astro-meta.row-item-2.block-shadow > div > p',
      type: 'text',
      transform: str => str.split(', ').map(x => x.trim()),
    },
    haircolor: {
      selector:
        '#search-result > section > div.profile-meta-item.block-shadow > dl > dd:nth-child(4) > a > span',
      type: 'text',
      transform: x => (x === 'Brown' ? 'Brunette' : filter<Haircolor>(isHaircolor)(x)),
    },
    eyecolor: {
      selector:
        '#search-result > section > div.profile-meta-item.block-shadow > dl > dd:nth-child(2) > a > span',
      type: 'text',
      transform: filter<Eyecolor>(isEyecolor),
    },
    ethnicity: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.flex-1 > div.d-flex.flex-wrap.flex-md-nowrap > div.d-flex.flex-column.profile-meta-item.row-item-2.block-shadow > div > p > a > span',
      type: 'text',
      transform: filter<Ethnicity>(isEthnicity),
    },
    dateOfBirth: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.profile-meta-item.large-meta-item.flex-basis-30.block-shadow > div > p.mb-1.font-size-md.font-weight-base > a',
      type: 'href',
      transform: regex(/(\d{4}-\d{2}-\d{2})/, x => new Date(Date.parse(x)).toISOString()),
    },
    dateOfCareerstart: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.d-lg-flex.flex-lg-row > div.d-block.d-lg-flex.flex-lg-column.w-lg-30.pr-2.pr-md-3.sidebar-right.sidebar-right-wide > div > div.flex-1.mb-4.mb-md-0 > div.timeline-horizontal.mb-3 > div.d-flex.justify-content-between.font-size-md.align-items-center.mb-2 > p:nth-child(1)',
      type: 'text',
      transform: x => new Date(`${x}-01-01`).toISOString(),
    },
    dateOfRetirement: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.d-lg-flex.flex-lg-row > div.d-block.d-lg-flex.flex-lg-column.w-lg-30.pr-2.pr-md-3.sidebar-right.sidebar-right-wide > div > div.flex-1.mb-4.mb-md-0 > div.timeline-horizontal.mb-3 > div.d-flex.justify-content-between.font-size-md.align-items-center.mb-2 > p:nth-child(3)',
      type: 'text',
      transform: x => (x === 'Now' ? undefined : new Date(`${x}-01-01`).toISOString()),
    },
    dateOfDeath: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.profile-meta-item.large-meta-item.flex-basis-30.block-shadow > div > p.mb-1.color-text-dark.font-size-xs',
      type: 'text',
      transform: regex(/Passed away on (.*) at/, x => new Date(x).toISOString()),
    },
    country: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.profile-meta-item.large-meta-item.flex-basis-30.block-shadow > div > p:nth-child(3) > a:nth-child(1)',
      type: 'href',
      transform: regex(/=(.*)$/, x => x),
    },
    province: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.profile-meta-item.large-meta-item.flex-basis-30.block-shadow > div > p:nth-child(3) > a:nth-child(3) > span',
      type: 'text',
    },
    city: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.profile-meta-item.large-meta-item.flex-basis-30.block-shadow > div > p:nth-child(3) > a:nth-child(2) > span',
      type: 'text',
    },
    boobs: {
      selector: '#search-result > section > div:nth-child(3) > dl > dd:nth-child(12) > a > span',
      type: 'text',
      transform: x => (x === 'Natural' || x === 'Fake' ? x : undefined),
    },
    piercings: {
      selector: '#search-result > section > div:nth-child(3) > dl > dd:nth-child(18) > span',
      type: 'text',
    },
    tattoos: {
      selector: '#search-result > section > div:nth-child(3) > dl > dd:nth-child(16) > span',
      type: 'text',
    },
    height: {
      selector: '#search-result > section > div:nth-child(3) > dl > dd:nth-child(6) > a > span',
      type: 'text',
      transform: regex(/(\d*)cm/, x => parseInt(x, 10)),
    },
    weight: {
      selector: '#search-result > section > div:nth-child(3) > dl > dd:nth-child(8) > a > span',
      type: 'text',
      transform: regex(/(\d*)kg/, x => parseInt(x, 10)),
    },
    measurements: {
      selector: '[data-test="p-measurements"]',
      type: 'text',
      transform: x => {
        const matches = /(\d{2}).*(\d{2}).*(\d{2})/.exec(x.replace(/[\s\n]/gm, ''));
        const parse = (s: string | undefined) => (s ? parseInt(s, 10) : 0);
        if (!matches) {
          return undefined;
        }

        return {
          bust: parse(matches[1] || undefined),
          hips: parse(matches[2] || undefined),
          waist: parse(matches[3] || undefined),
        };
      },
    },
    cupsize: {
      selector:
        '#search-result > section > div:nth-child(3) > dl > dd:nth-child(10) > span > a:nth-child(1) > span',
      type: 'text',
      transform: regex(/\d{2}(.)/, x => (isCupsize(x) ? x : undefined)),
    },
    socialMediaLinks: {
      selector:
        '#search-result > section > div.d-md-flex.flex-md-row.large-items > div.flex-1 > div.d-md-flex > div.profile-meta-item.social-meta.block-shadow > div',
      type: 'text',
      transform: x => {
        const matches = x.match(/href="(.*?)"/);
        return !matches ? undefined : matches.map(m => m.replace('"', '').replace('href=', ''));
      },
    },
    officialWebsite: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.px-2.px-md-3 > section > header > div.d-flex.flex-column.flex-1.pl-3.pl-md-4.header-content > div > div.d-flex.flex-row.align-items-start.justify-content-between.justify-content-md-start > div.d-flex.flex-column.mr-2.mr-lg-4.align-items-start > div > div.mt-md-1.d-flex.flex-wrap.flex-lg-nowrap.flex-row.align-items-center.align-items-md-start.mr-2 > a',
      type: 'href',
    },
    picture: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.px-2.px-md-3 > section > header > div.profile-image-container > a > img',
      type: 'src',
      transform: x => x.replace('/teaser/', '/big/'),
    },
  },
};
