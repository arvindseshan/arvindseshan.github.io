---
layout: default
permalink: /projects/
title: projects
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 25
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post">

  {% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}
  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i>
          <a href="{{ tag | slugify | prepend: '/projects/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i>
          <a href="{{ category | slugify | prepend: '/projects/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endif %}

  {% assign featured_posts = site.posts | where: "featured", "true" %}
  {% if featured_posts.size > 0 %}
  <br>

  <div class="container featured-posts">
    {% assign is_even = featured_posts.size | modulo: 2 %}
    <div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
      {% for post in featured_posts %}
      <div class="col mb-4">
        <a href="{{ post.url | relative_url }}">
          <div class="card hoverable">
            <div class="row g-0">
              <div class="col-md-12">
                <div class="card-body">
                  <div class="float-right">
                    <i class="fa-solid fa-thumbtack fa-xs"></i>
                  </div>
                  <h3 class="card-title text-lowercase">{{ post.title }}</h3>
                  <p class="card-text">{{ post.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      {% endfor %}
    </div>
  </div>
  <hr>
  {% endif %}

  <ul class="post-list projects-list">
    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}
      {% if post.external_source == blank %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
      {% else %}
        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
      {% endif %}
      {% assign year = post.date | date: "%Y" %}
      {% assign tags = post.tags | join: "" %}
      {% assign categories = post.categories | join: "" %}

      {%- comment -%}
      Compute the primary link for the card (overlay).
      - Prefer post.url when no redirect.
      - If redirect has :// use as-is.
      - Else treat redirect as internal.
      {%- endcomment -%}
      {% capture card_href %}
        {% if post.redirect == blank %}
          {{ post.url | relative_url }}
        {% elsif post.redirect contains '://' %}
          {{ post.redirect }}
        {% else %}
          {{ post.redirect | relative_url }}
        {% endif %}
      {% endcapture %}

      <li class="project-item">
        <!-- The invisible overlay makes the whole block clickable -->
        <a class="card-link-overlay" href="{{ card_href | strip }}" aria-label="{{ post.title }}"></a>

        {% if post.thumbnail %}
        <div class="row">
          <div class="col-sm-9">
        {% endif %}

        <!-- Title is plain text now; overlay handles click -->
        <h3 class="post-title">{{ post.title }}</h3>
        <p>{{ post.description }}</p>

        <p class="post-tags">
          {% if tags != "" %}
            {% for tag in post.tags %}
              <a class="inner-link" href="{{ tag | slugify | prepend: '/projects/tag/' | prepend: site.baseurl }}">
                <i class="fa-solid fa-hashtag fa-sm"></i> {{ tag }}
              </a>
              {% unless forloop.last %}&nbsp;{% endunless %}
            {% endfor %}
          {% endif %}

          {% if categories != "" %}
            &nbsp; &middot; &nbsp;
            {% for category in post.categories %}
              <a class="inner-link" href="{{ category | slugify | prepend: '/projects/category/' | prepend: site.baseurl }}">
                <i class="fa-solid fa-tag fa-sm"></i> {{ category }}
              </a>
              {% unless forloop.last %}&nbsp;{% endunless %}
            {% endfor %}
          {% endif %}
        </p>

        {% if post.thumbnail %}
          </div>
          <div class="col-sm-3">
            <img class="card-img" src="{{ post.thumbnail | relative_url }}"
                 style="object-fit: cover; height: 90%" alt="thumbnail for {{ post.title }}">
          </div>
        </div>
        {% endif %}
      </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}

</div>
