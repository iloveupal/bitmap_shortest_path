# Instructions

**Install dependencies**

```
yarn
```

**Run without compiling**

```
cat input.txt | yarn dev > output.txt
```

**Compile**

```
yarn build
cat input.txt | node build/main.js > output.txt
```

**Test**

```
yarn test
yarn test-watch
```

**Benchmark**

You can benchmark this implementation versus a naive one

```
yarn benchmark
```


# Problem statement

Given the bitmap of white pixels in the 2d space, create a bitmap where the element represents a manhattan distance to closest white pixel.

# Algorithm

1. For each white pixel, create a path walking iterator in each of four directions, and for each of those:
    * walk straight, for each step, incrementally set a value
    * on each move start a new walking iterator to the right
    * move until either: out of bitmap or find a smaller value
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

By walking in such way, we would be able to cover all the cells near the white pixel in a way that represents a square. The advantage compared to other ways of walking is that the same cell is never walked over twice by the same white pixel.

What's important to note, is that it's better to expand from all the white pixels at equal speed to minimize the number of total cells walked. In the implementation, this is achieved by iterating over white pixels and giving their walking iterators chance to make one step during the cycle.

# Performance considerations

We should walk over each bitmap cell only once in most cases, so the time complexity would be:
```
O(m * n)
```
where `m` and `n` are dimensions of the bitmap

Conmpared to the naïve approach of iterating over the list of white pixels for each cell:
```
O(m * n * l)
```
where `l` is the number of white pixels,
we would be able to see the difference, especially on the large matrices.

While the benchmarking on the large matrices showed obvious advantage of our algorithm, on smaller ones where `1 <= n,m <= 20` the naïve solution shows better results due to less complex code in general.

## Input

Worth mentioning, that the problem is redesigned from the original one. In the original problem, the input is as follows:
* dimensions of the bitmap
* the bitmap itself, consisting of either 1 or 0, where 1 represents a white pixel

Whereas the solution presented deals with:
* dimensions of the bitmap
* array of positions of white pixels

Due to the fact that in the original problem we're reading a string from stdin, we should either parse it into the bitmap or into an array of white pixels anyway.

Original bitmap could be useful in a reverse approach, where given point A in bitmap, we're recursively trying to find the closest source. However, this approach seemed a bit more complicated and edge-cased so I chose the one where we're walking from ligth sources instead.

## Parallelization

To leave things simple, I didn't consider parallelization in this test assignment but it could be useful in case of large numbers of inputs + large bitmaps. It doesn't make sense to parallelize over a single bitmap due to the fact that the expansion of white pixels should happen at the same speed. Instead, it could be useful to have a pool of workers for different bitmaps.
In node, that could be achieved by having a pool of child processes.