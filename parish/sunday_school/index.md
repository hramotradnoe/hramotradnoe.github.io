---
layout : sunday_school
title  : Воскресная школа
---
Расписание
----------
Занятия проводятся каждое воскресенье. В этом году занятия начнутся с 26 октября.

Каждую первую субботу месяца в храме проходит подготовка к причастию. Начало в 16:30.

Младшая группа (5-7 лет)
========================

| 12:00 | 12:30 | Основы православия |
| 12:30 | 13:00 | Церковное пение    |

Список учащихся:
{% assign students = site.data.students | where:"class","junior" | sort: 'name' %} 
{% for student in students %}
* {{ student.name }}
{% endfor %}

Средняя группа
==============

| 13:00 | 13:30 | Церковное пение/Церковно-славянский язык |
| 13:30 | 14:00 | Закон Божий                              |
| 14:00 | 14:30 | Жития святых                             |

Список учащихся:
{% assign students = site.data.students | where:"class","middle" | sort: 'name' %} 
{% for student in students %}
* {{ student.name }}
{% endfor %}

Новости
-------
{% for post in site.posts %}
* ({{ post.title }})[{{ site.url }}/{{ post.url }}]
  =================================================
  {{ post.content | truncatewords:40 }}
  
  (Далее)[{{ site.url }}/{{ post.url }}]
{% endfor %}
