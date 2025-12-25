---
title: "The Hello World of CUDA programming"
date: "2025-12-15"
---

## The "Hello World" of CUDA programming

This article will only highlight concepts at a high level.

CUDA is a platform that allows the programmer to interface with the GPU hardware that Nvidia offers.

The benefits of using a GPU to perform the execution of code is that it offers a tremendous boost in performance as oppossed to a normal CPU through parallelism. Whilst CPUs do offer parallel capabilites, it is limited to tens of threads. A GPU on the other hand has thousands of threads executing simultaneously. 

Because we're software people here, we will approach this from the lens of a software person rather than a hardware person.

So from a programmer's point of view, threads in GPUs are organised in the following way:

At the bottom of the hierarchy, we have individual <span style="color: #f1c40f;">threads</span>. These are the things that execute the task we specify it to. Each thread has an identifier so it knows which portion of the data it is responsible for processing. 

Threads are then bundled into <span style="color: #f1c40f;">blocks</span>. Threads within a block share the same memory coined "shared memory" - creative I know. Each block also has an idenitfier similar to threads.

Finally these blocks are organised within a <span style="color: #f1c40f;">grid</span>. The grid serves no purpose other than a form of abstraction to make communicating to the hardware easier.

Now, telling the hardware how many threads and blocks we want the GPU to use is surprisingly easy. We first define a function that we wish the GPU to run by giving it the \_\_global\_\_ specifier which tells the compiler to run this on the GPU. All code that runs on the GPU have to have this specifier. This special function has also given a special name by us called a *kernel*.

So all code is run by the CPU which we will call <span style="color: #f1c40f;">host</span> unless specified in the program through the \_\_global\_\_ specifier! This is very important to know!

![CUDA_thread_hierarchy](/assets/blog/2025-12-12-hello_world_of_cuda/cuda_grid_of_thread_blocks.png)[^1]

But like all problems in life, peak performance is limited to the memory we have been given. For example, you forget to lock your car on the side of the street and find that it has been ransacked when you come back or forgetting to set the alarm for tomorrow's job interview and end up oversleeping 

Memory can be divided into on-chip and off-chip memory. On-chip memory is super fast (>1TB/s) but limited in capacity, whilst off-chip global memory (~900GB/s) is slower but has much more capacity. We also have registers, L1, L2 cache but that's beyond our control and concern since that's managed by the compiler.

Shared memory is defined by the user by declaring the \_\_shared\_\_ tag within a kernel and is only accessible by threads within the same threadblock. In other words, threads from block 1 cannot access shared memory from block 2.

Global memory is also decalred by the programmer but doesn't come with any special declarations. The global memory is accessible to ALL threads as well as the CPU (host).

Simlar to programming in *C* where we *malloc* to allocate memory, we use *cudaMalloc* to specify that we want to allocate memory on the GPU rather than on the CPU/RAM. Since *cudaMalloc* only allocates memory in the GPU but doesn't actually place the content within this space, we have to move the data that we've defined from the host onto the GPU. We have to do this because EVERYTHING runs on the CPU (host) unless specified otherwise. Nvidia has given us a nice way to do that and this is through a simple *cudaMemcpy* function call which allows us to copy memory to and from the GPU. 

![CUDA_memory_hierarchy](/assets/blog/2025-12-12-hello_world_of_cuda/cuda_memory.png) [^2]

### Here's an example of a kernel I've asked ChatGPT to help generate:

![CUDA_kernel_example](/assets/blog/2025-12-12-hello_world_of_cuda/kernel_example.png)
![CUDA_kernel_call](/assets/blog/2025-12-12-hello_world_of_cuda/kernel_call.png)

What’s happening here:
- Here is a kernel as defined by the \_\_global\_\_ specifier
- Each thread loads one value from global memory
- That value is stored in shared memory defined by the \_\_shared\_\_ which is:
    - On-chip
    - Much faster
- Accessible by all threads in the same block
- __syncthreads() ensures every thread finishes loading before any thread proceeds
    - You generally want to do this when you're using shared memory and if you're missing it, it should raise alarm bells to make sure your program is performing the way you intend it to
    - Note that calling this will halt your entire block of threads until all threads have been executed
- tid, and idx variables are simply local and global identifiers for threads. I know this is a poor explanation so here is a very good video by Josh Holloway that goes into it in depth. I would also recommend checking out his CUDA series, they are very well done.
    - https://www.youtube.com/watch?v=cRY5utouJzQ&t=13s
- Notice kernel launches are done using the <<< >>> syntax
- We specify the amount of <<<blocks, threadsPerBlock>>> which will run many parallel threads on the GPU
- Other than that, we call the kernel as we would with any other function


Keep following along and keep your eyes peeled for slightly more in depth content in the next article where we will:
- Talk about warps, SMs and how they work
- Talk about memory coalescing, cache lines, and banks


[^1]: Image credit to: CUDA C++ Programming Guide, Release 13.1
[^2]: Image credit to: Josh Holloway - Youtube