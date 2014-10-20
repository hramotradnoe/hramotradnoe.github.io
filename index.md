---
layout : default
title  : Новости
---
{% for post in site.posts %}
* ({{ post.title }})[{{ site.url }}{{ post.url }}]
  =================================================
  {{ post.content | truncatewords:40 }}

  (Далее)[{{ site. url }}{{ post.url }}]
{% endfor %}
