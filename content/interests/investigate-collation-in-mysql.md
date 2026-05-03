---
title: "Investigate Collation in MySQL"
date: 2016-06-23
tags: [interest, disect]
aliases: [uts-0070]
source: "https://utensil.github.io/forest/uts-0070/"
---

See http://dev.mysql.com/doc/refman/5.7/en/charset-collation-effect.html .

``` bash
echo -n 德|iconv -f 'utf-8' -t 'GBK'|xxd -p
b5c2
echo -n 得|iconv -f 'utf-8' -t 'GBK'|xxd -p
b5c3
```
