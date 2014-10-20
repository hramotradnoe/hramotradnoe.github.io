---
layout : default
title  : Новости
---
{% for post in site.posts %}
* [{{ post.title }}]({{ post.url }}) &ndash; {{post.date | date:"%d-%m-%Y"}}
  ==========================================================================
  {{ post.content | truncatewords:40 }}

  [Далее]({{ post.url }})
{% endfor %}
