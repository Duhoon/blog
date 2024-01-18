---
layout: post
published: 2024-01-19
title: Can I use LIMIT in subquery?
---

# Background

It depends on Version of your DMBS actually. I just talk about mysql before 8.035 because I am using 8.035. :)
There is a work for export statistics data. It's related to ranking datas for something. Requirement is to get data about 100 peoples in ranking in descending order.
So I just consider using LIMIT.
But there is an issue using LIMIT in my query. I haven't told about all of the requiremnt for data to export yet. Requirements is very complicated so my query also is going complicated. And finally, the sentence for getting rankers in 100 ranks should be subquery.

But it has some issue. I cannot use LIMIT in subquery. My version of MySQL is not supporting using LIMIT in subquery.
Like this example.

```sql
SELECT *
FROM PRODUCT
WHERE ID IN (
    SELECT MOST_SELL_PROUDCT_ID
    FROM VIP_MEMBER
    ORDER BY SALES
    LIMIT 100
)
```

# Trouble shooting
To solve this problem is simple. Just use ALIAS for SUBQUERY

Here is example.

```sql
SELECT *
FROM PRODUCT
WHERE ID IN (
    (
        SELECT MOST_SELL_PROUDCT_ID
        FROM VIP_MEMBER
        ORDER BY SALES
        LIMIT 100
    ) as temp
)
```

That's all.
