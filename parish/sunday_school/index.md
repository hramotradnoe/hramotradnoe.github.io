---
layout : default
title  : Воскресная школа
---
{% if site.data.parish.sunday_school.ads.size > 0 %}
Объявления
----------
{% for ad in site.data.parish.sunday_school.ads %} 
* {{ad.title}}
  ============
  {{ad.description | markdownify }}
{% endfor %}
{% endif %}

Младшая группа (5-7 лет)
------------------------

Расписание
==========
{% for lesson in site.data.parish.sunday_school.junior.schedule %} 
| {{lesson.from}} | {{lesson.to}} | {{lesson.title}} |
{% endfor %}

Список учащихся
===============
{% assign students = site.data.parish.sunday_school.junior.students | sort: 'name' %} 
{% for student in students %}
* {{ student.name }}
{% endfor %}

Средняя группа
--------------

Расписание
==========
{% for lesson in site.data.parish.sunday_school.middle.schedule %} 
| {{lesson.from}} | {{lesson.to}} | {{lesson.title}} |
{% endfor %}

Список учащихся
===============

{% assign students = site.data.parish.sunday_school.middle.students | sort: 'name' %} 
{% for student in students %}
* {{ student.name }}
{% endfor %}

{% if site.categories.parish.sunday_school.size > 0 %}
Новости
-------
{% for post in site.categories.parish.sunday_school %}
* ({{ post.title }})[{{ site.url }}/{{ post.url }}]
  =================================================
  {{ post.content | truncatewords:40 }}
  
  (Далее)[{{ site.url }}/{{ post.url }}]
{% endfor %}
{% endif %}

О школе
-------
Наша детская воскресная школа имеет своей главной целью раскрыть перед учащимися существо православной веры таким образом, чтобы она воспринималась ими не как совокупность требований и запретов, а как система духовных ценностей, наполняющих жизнь смыслом и содержанием. Именно поэтому занятия в воскресной школе проводятся в форме беседы, или диалога. Возможность такого диалога определяется взаимным стремлением его участников к установлению истины, единством целей, способностью выслушать точку зрения собеседника, как бы она ни отличалась от своей собственной.

Занятия в нашей школе проводятся каждое воскресенье.
