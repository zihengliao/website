---
title: "The hello world of CUDA programming"
date: "2025-12-12"
---

## The hello world of CUDA programming

CUDA is a platform that allows the programmer to interface with the GPU hardware that Nvidia offers.

The benefits of using a GPU to perform the execution of code is because it offers a tremendous boost in performance as oppossed to a normal CPU through parallelism. Whilst CPUs do offer parallel capabilites, it is limited to tens of threads. A GPU on the other hand has thousands of threads executing simultaneously. 

Ok, so how do we use this insanely powerful hardware?

- Talk about kernels and how to specify blocks and threads

From a programmer's point of view, threads in GPUs are organised in the following way:

At the bottom of the hierarchy, we have individual "threads". These are the things that execute the task we specify it to.

Threads are then bundled into "blocks". Threads within a block share the same memory coined "shared memory" - creative I know.

Finally these blocks are organised within a "grid". The grid serves no purpose other than a form of abstraction to make communicating to the hardware easier.

Now, telling the hardware how many threads and blocks we want the GPU to use is surprisingly easy. We first define a function that we wish the GPU to run by giving it the \_\_global\_\_ specifier

Probably a diff blog 
- Talk about shared memory, the location of shared memory and how its only accessible per block


Diff blog
- Talk about warps and how they work
- Talk about memory heirarchy, cache lines, and banks