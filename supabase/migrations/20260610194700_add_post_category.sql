alter table public.posts
  add column if not exists category text;

update public.posts
set category = case
  when locale = 'ko' and slug in (
    'deep-learning-from-scratch',
    'review-artemis',
    'review-project-hail-mary',
    'review-mind',
    'review-mistook-wife-for-hat'
  ) then 'book'
  when locale = 'ko' and slug in (
    'chainsawman-reze-review',
    'hidden-figures-review',
    'no-choice-review'
  ) then 'movie'
  when locale = 'ko' and slug in (
    'classification-evaluation',
    'cornerstone-image-display',
    'create-wallet-address-solana',
    'create-wallet-address',
    'eslint-config',
    'proxy-contract-hardhat',
    'python-comprehension',
    'react-dynamic-import',
    'solana-token-extension',
    'tailwindcss-detector'
  ) then 'development'
  when locale = 'en-US' and slug in (
    'ca-solid'
  ) then 'book'
  when locale = 'en-US' and slug in (
    'better-days',
    'look-back',
    'review-dune-part2'
  ) then 'movie'
  when locale = 'en-US' and slug in (
    'confyui-python-setting',
    'eip-191-review',
    'eip-712-example',
    'eth-seoul-2024',
    'Fixed Point Float Point',
    'Fixed%20Point%20Float%20Point',
    'fixedpoint-floatpoint',
    'guard-in-nest',
    'logsbloom-ethereum',
    'markdown-to-html',
    'nestjs-lifecycle',
    'react-usecontext',
    'react-usememo',
    'record-for-build-blog',
    'string-in-go',
    'use-limit-in-subquery',
    'use_hardhat'
  ) then 'development'
  else category
end
where category is null;

alter table public.posts
  drop constraint if exists posts_category_check;

alter table public.posts
  add constraint posts_category_check
  check (category in ('book', 'movie', 'development'));

create index if not exists posts_public_listing_idx
  on public.posts (locale, category, is_published, published_at desc);

create unique index if not exists posts_locale_category_slug_idx
  on public.posts (locale, category, slug);
