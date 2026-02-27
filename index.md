---
layout: default
title: Home
---

{% assign home = site.data.home %}

<div class="page-grid">
  <aside class="profile-column">
    <section class="card-shell profile-card" aria-label="Profile">
      <div class="profile-photo-wrap">
        {% if home.profile.photo and home.profile.photo != "" %}
          <img class="profile-photo" src="{{ home.profile.photo }}" alt="{{ home.profile.name }}" />
        {% else %}
          <div class="profile-avatar">{{ home.profile.avatar }}</div>
        {% endif %}
      </div>
      <h1 class="profile-name">{{ home.profile.name }}</h1>
      <p class="profile-role">{{ home.profile.role }}</p>
      <p class="profile-affiliation">{{ home.profile.affiliation }}</p>
      <div class="profile-links" aria-label="Profile links">
        {% for link in home.profile.links %}
          <a
            class="profile-icon-link"
            href="{{ link.url | default: '#' }}"
            aria-label="{{ link.label }}"
            title="{{ link.label }}"
          >
            {% if link.icon %}
              <i class="{{ link.icon }}" aria-hidden="true"></i>
            {% else %}
              <span>{{ link.label }}</span>
            {% endif %}
          </a>
        {% endfor %}
      </div>
    </section>
  </aside>

  <div class="content-column">
    <section id="bio" class="card-shell section-card">
      <h2 class="section-heading">Bio</h2>
      <p class="bio-text">
        {{ home.profile.bio }}
      </p>
    </section>

    <section id="research" class="card-shell section-card">
      <h2 class="section-heading">{{ home.research_interests.title }}</h2>
      <ul class="interest-list">
        {% for item in home.research_interests.items %}
          <li class="interest-item">{{ item }}</li>
        {% endfor %}
      </ul>
    </section>

    <section id="news" class="card-shell section-card">
      <h2 class="section-heading">{{ home.news.title }}</h2>
      <ul class="news-list">
        {% for item in home.news.items %}
          <li class="news-item">
            <span class="news-date">{{ item.date }}</span>
            <div class="news-body">
              <span>{{ item.text }}</span>
            </div>
          </li>
        {% endfor %}
      </ul>
    </section>

    <section id="publications" class="card-shell section-card">
      <h2 class="section-heading">{{ home.publications.title }}</h2>
      <div class="publication-list">
        {% assign me_name = home.profile.name %}
        {% capture me_name_markup %}<span class="author-highlight">{{ me_name }}</span>{% endcapture %}
        {% capture me_name_star %}{{ me_name }}*{% endcapture %}
        {% capture me_name_star_markup %}<span class="author-highlight">{{ me_name }}*</span>{% endcapture %}
        {% capture me_name_dagger %}{{ me_name }}†{% endcapture %}
        {% capture me_name_dagger_markup %}<span class="author-highlight">{{ me_name }}†</span>{% endcapture %}
        {% capture me_name_dagger_star %}{{ me_name }}†*{% endcapture %}
        {% capture me_name_dagger_star_markup %}<span class="author-highlight">{{ me_name }}†*</span>{% endcapture %}
        {% capture me_name_star_dagger %}{{ me_name }}*†{% endcapture %}
        {% capture me_name_star_dagger_markup %}<span class="author-highlight">{{ me_name }}*†</span>{% endcapture %}

        {% for paper in home.publications.items %}
          <article class="publication-item">
            <p class="publication-title">{{ paper.title }}</p>
            {% assign authors_text = paper.authors
              | replace: me_name_dagger_star, "__ME_DAGGER_STAR__"
              | replace: me_name_star_dagger, "__ME_STAR_DAGGER__"
              | replace: me_name_dagger, "__ME_DAGGER__"
              | replace: me_name_star, "__ME_STAR__"
              | replace: me_name, "__ME__"
              | replace: "__ME_DAGGER_STAR__", me_name_dagger_star_markup
              | replace: "__ME_STAR_DAGGER__", me_name_star_dagger_markup
              | replace: "__ME_DAGGER__", me_name_dagger_markup
              | replace: "__ME_STAR__", me_name_star_markup
              | replace: "__ME__", me_name_markup
            %}
            <p class="publication-authors">{{ authors_text }}</p>
            <p class="publication-meta">
              <span>{{ paper.venue }}</span>
              <span class="publication-year">{{ paper.year }}</span>
            </p>
            <div class="pub-links">
              {% for link in paper.links %}
                {% assign link_key = link.label | downcase %}
                {% assign link_class = "pub-link-other" %}
                {% assign link_icon = "fa-solid fa-link" %}
                {% if link_key contains "paper" %}
                  {% assign link_class = "pub-link-paper" %}
                  {% assign link_icon = "ai ai-arxiv" %}
                {% elsif link_key contains "code" or link_key contains "github" %}
                  {% assign link_class = "pub-link-code" %}
                  {% assign link_icon = "fa-brands fa-github" %}
                {% elsif link_key contains "demo" %}
                  {% assign link_class = "pub-link-demo" %}
                  {% assign link_icon = "fa-solid fa-globe" %}
                {% elsif link_key contains "project" %}
                  {% assign link_class = "pub-link-project" %}
                  {% assign link_icon = "fa-solid fa-diagram-project" %}
                {% endif %}
                <a
                  class="pub-link-icon {{ link_class }}"
                  href="{{ link.url | default: '#' }}"
                  aria-label="{{ link.label }}"
                  title="{{ link.label }}"
                >
                  <i class="{{ link_icon }}" aria-hidden="true"></i>
                  <span class="sr-only">{{ link.label }}</span>
                </a>
              {% endfor %}
            </div>
          </article>
        {% endfor %}
      </div>
    </section>

    <section id="projects" class="card-shell section-card">
      <h2 class="section-heading">{{ home.projects.title }}</h2>
      <div class="project-grid">
        {% for project in home.projects.items %}
          {% assign project_github_repo = "" %}
          {% if project.url and project.url contains "github.com/" %}
            {% assign project_repo_path_raw = project.url | split: "github.com/" | last %}
            {% assign project_repo_parts = project_repo_path_raw | split: "/" %}
            {% if project_repo_parts.size >= 2 %}
              {% assign project_repo_owner = project_repo_parts[0] %}
              {% assign project_repo_name = project_repo_parts[1] | split: "?" | first | split: "#" | first %}
              {% if project_repo_owner != "" and project_repo_name != "" %}
                {% assign project_github_repo = project_repo_owner | append: "/" | append: project_repo_name %}
              {% endif %}
            {% endif %}
          {% endif %}
          <article class="project-item">
            <p class="project-title">
              {% if project.url and project.url != "" %}
                <a class="project-title-link" href="{{ project.url }}">{{ project.name }}</a>
              {% else %}
                {{ project.name }}
              {% endif %}
            </p>
            <p class="project-text">{{ project.description }}</p>
            {% if project_github_repo != "" %}
              <a
                class="github-stars-badge-link project-stars-badge"
                href="{{ project.url }}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub stars for {{ project_github_repo }}"
                title="GitHub stars"
              >
                <img
                  class="github-stars-badge"
                  src="https://img.shields.io/github/stars/{{ project_github_repo }}?style=social"
                  alt="GitHub stars for {{ project_github_repo }}"
                  loading="lazy"
                />
              </a>
            {% endif %}
          </article>
        {% endfor %}
      </div>
    </section>

    <section id="education" class="card-shell section-card">
      <h2 class="section-heading">{{ home.education.title }}</h2>
      <ul class="service-list">
        {% for item in home.education.items %}
          <li class="service-item">
            <p class="service-role">{{ item.degree }}</p>
            <p class="service-details education-school-row">
              <span>{{ item.school }}</span>
              {% if item.school_badge and item.school_badge != "" %}
                <img
                  class="school-badge"
                  src="{{ item.school_badge | relative_url }}"
                  alt="{{ item.school_badge_alt | default: item.school }}"
                  loading="lazy"
                />
              {% endif %}
            </p>
            {% if item.details and item.details != "" %}
              <p class="service-details">{{ item.details }}</p>
            {% endif %}
            {% if item.period and item.period != "" %}
              <p class="service-period">{{ item.period }}</p>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
    </section>

    {% include role_list_section.html
      section_id="experience"
      title=home.experience.title
      items=home.experience.items
      primary_key="role"
      secondary_key="organization"
      tertiary_key="details"
    %}

    {% include role_list_section.html
      section_id="service"
      title=home.service.title
      items=home.service.items
      primary_key="role"
      secondary_key="details"
    %}

    <section id="misc" class="card-shell section-card">
      <h2 class="section-heading">{{ home.misc.title }}</h2>
      <ul class="misc-list">
        {% for item in home.misc.items %}
          <li class="misc-item">
            {% if item.icon %}
              <i class="misc-icon {{ item.icon }}" aria-hidden="true"></i>
            {% elsif item.emoji %}
              <span class="misc-emoji" aria-hidden="true">{{ item.emoji }}</span>
            {% endif %}
            <span>{{ item.label | default: item }}</span>
          </li>
        {% endfor %}
      </ul>
    </section>
  </div>
</div>
