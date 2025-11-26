---
title: "The Big P problem in Statistics and ML"
date: "2025-11-26"
---

## The Big P Problem in Statistics and ML

With the rise in availability of cheap computers, storage and ease of access to the internet, data has become easier than ever to collect and store. Thus most modern day statistical analyses involve huge datasets often in the scale of terabytes or even petabytes.

It is now not unusual to see many samples (*big N*) or even many predictors (*big P*) in a dataset. Both contain problems of their own, but in this article we will focus on the *big P*.

We see *big P* all the time in datasets, from high resolution images to time series data and even genomics. 

But why is this a problem? Surely the more information or features in a dataset we have the better we are able to form predictions. 

Let me introduce to you the boundary effect.

On an intuitive level, variance for fitting a line along side the boundary is higher since we can't "see" the other side of the boundary and therefore unable to determine the slope accurately.

![Boundary effect on polynomial](/assets/blog/2025-11-26-the-big-p-problem/polynomial.png)[^1] 

The image contains a sampling distribution of 20th order polynomial fitted to data repeatedly sampled from the true model (plus noise). Notice the 95% confidence interval alongside the boundary when fitted to samples.

Ok, but what does this have anything to do with *big P*?

Well interestingly, when the number of parameters we have increase, each point eventually becomes a boundary point.

Let's prove it.

![Uniform distribution](/assets/blog/2025-11-26-the-big-p-problem/boundary.png)[^1] 

Let us assume that for each of our predictors $X_j$, it is uniformly distributed on (0, 1)

We can define our boundary as $$\epsilon$$

With a single dimension, we can define our interior or the point away from our boundary as:

$$(1-2\epsilon)$$

Now, as the number of dimensions increase or in other words the number of our parameters increase we can define our interior as the following:

$$(1-2\epsilon)^p$$

Since $\epsilon$ lies in a range between $0<\epsilon<0.5$

Our interior is always smaller than 1: $(1-2\epsilon)<1$

So as $p \to \infty$

Our interior will converge to 0 

$(1-2\epsilon) \to 0$

Therefore stating that every point eventually lies within the boundary.


Why does this matter and what can we do about it?

It matters in the sense that if we try to fit a model with a large amount of parameters, we become less confident in our model and becomes impossible to interpret. And depending on the problem at hand as well, interpretability may or may not be a deal breaker. That said, if the model is unreliable, it's probably better to abandon it and consider an alternative approach.

The most popular and what is traditionally done is with regularisation techniques whether it be with the Ridge or the Lasso or forms of them to reduce the amount of parameters we use.

Now interestingly, a neural network "beats" the *big P* problem. More on that later.



[^1]: Image credit to: Professor Daniel Schmidt