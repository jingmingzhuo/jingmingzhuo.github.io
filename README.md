# Jekyll + Bulma Academic Homepage Template

A clean personal homepage template for **CS / NLP / AI** researchers.

## Features

- Built with **Jekyll** + **Bulma**
- Fully static and easy to deploy (GitHub Pages, Netlify, Vercel static output)
- Responsive layout for desktop and mobile
- Auto light/dark mode (`prefers-color-scheme`)
- Mobile collapsible navigation
- Publications grouped by year with year filters
- Publication cards with optional image + badge
- News feed with typed update chips
- Distinct visual style (custom typography, gradients, grid texture, subtle animations)
- Single-page structure with:
  - Hero intro
  - Research interests
  - Selected publications
  - Projects
  - News
  - Service
  - Misc

## 1) Create and bootstrap the Conda environment

```bash
bash scripts/setup_conda_env.sh
conda activate jekyll-bulma-homepage
```

If your network is slow for `rubygems.org`, use:

```bash
USE_RUBY_CHINA_MIRROR=1 bash scripts/setup_conda_env.sh
```

## 2) Run locally

```bash
jekyll serve
```

Then open: `http://127.0.0.1:4000`

## 3) Customize your content

Edit these files:

- `_data/home.yml`: profile text, publications, projects, news, and links
- `_config.yml`: site title and metadata
- `assets/css/site.css`: theme colors, spacing, animation

## Quick replacement checklist

- `YOUR NAME`
- `Your Lab, Your University`
- URLs for scholar/github/cv/project pages
- publication `year` fields in `_data/home.yml`
- optional publication `image` and `badge` fields in `_data/home.yml`
- optional news `type` field in `_data/home.yml`
- `service.items` and `misc.items` in `_data/home.yml`
- publication titles and venues
- profile links (scholar/github/cv/email)
- avatar initials (`YN`)
