# Problem statement

Given the matrix of light sources in the 2d space, create a matrix where the element represents a manhattan distance to closest light source.

# Algorithm

1. For each light source, create a path walking iterator in each of four directions, and for each of those:
    * walk straight, for each step, incrementally set a value
    * on each move start a new walking iterator to the right
    * move until either: out of matrix or find a smaller value
    * finish when all iterators stop

A visual explanation of a pathwalking algorithm for each direction. As you can see, for each side, the pathwalking algorithm represents a right (90 deg) triangle.

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

By walking in such way, we would be able to cover all the cells near the light source in a way that represents a square. The advantage compared to other ways of walking is that the same cell is never walked over twice by the same light source.

What's important to note, is that it's better to expand from all the light sources at equal speed to minimize the number of total cells walked. In the implementation, this is achieved by iterating over light sources and giving their walking iterators chance to make one step during the cycle.

# Performance considerations

We should walk over each matrix cell only once in most cases, so the time complexity would be:
```
O(m * n)
```
where `m` and `n` are dimensions of the matrix

Conmpared to the naïve approach of iterating over the list of light sources for each cell:
```
O(m * n * l)
```
where `l` is the number of light sources,
we would be able to see the difference, especially on the large matrices.

While the benchmarking on the large matrices showed obvious advantage of our algorithm, on smaller ones where `3 <= n,m <= 20` the naïve solution shows better results due to less complex code in general.

## Input

Worth mentioning, that the problem is redesigned from the original one. In the original problem, the input is as follows:
* dimensions of the matrix
* the matrix itself, consisting of either 1 or 0, where 1 represents the light source

Whereas the solution presented deals with:
* dimensions of the matrix
* array of positions of light sources

Due to the fact that in the original problem we're reading a string from stdin, we should either parse it into the matrix or into an array of light sources anyway.

Original matrix could be useful in a reverse approach, where given point A in matrix, we're recursively trying to find the closest source. However, this approach seemed a bit more complicated and edge-cased so I chose the one where we're walking from ligth sources instead.