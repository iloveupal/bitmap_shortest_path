# ALGORITHM

1. For each bright point, do:
    * start a new generation
    * each generation should make a right triangle
    * move forward and right, until there's a value on the map that is lower than your current generation value
    * finish when all generations die


`f(n)`
```
[↑]
 ↑[→]
 * 
```

`f(n + 1)`
```
[↑]
 ↑[→]
 ↑ →[→]
 * 
```
