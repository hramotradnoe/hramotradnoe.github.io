---
layout : default
title  : Духовенство
---
{% for member in site.data.clergy %}
* {{member.name}}
  ===============
  {{member.description}}
{% endfor %}
