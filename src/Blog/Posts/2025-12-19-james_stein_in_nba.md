---
title: "James Stein Estimator in the NBA"
date: "2025-12-19"
---

## James Stein Estimator in the NBA

Let's set the stage for some context first.

Picture this. It's 2003 you and your mate are arguing about how this is the best draft class since the 1996 draft featuring Kobe Bryant, Allen Iverson and the like. There are multiple metrics to decide how good players are, but you decide to look at free throws due to its simplicity and self paced nature, i.e. there are no external factors influencing the player performing this skill.

Currently there have only been 10 games into the season, but you start looking at FT% (free throw %) across every player in the draft since you don't want to wait until the end of the season to prove a point. 

You take a look, and Lebron is currently a 61% FT shooter, Carmelo Anthony is at 72% and Dwayne Wade is at 67% etc. 

However because it's only 10 games into the season, you know this is an inaccurate estimate of their true FT%.

I'm going to go on a quick tangent here so please bare with me. In the 1950s and prior to that, statisticians believed that unbiasedness was the best way to model data and make predictions. So Lebron's 61% FT accuracy is calculated by dividing the amount of free throws he has made (23) by the amount of free throws he has attempted (38) is an unbiased attempt to model his true FT%. You can see how this is unbiased since we are only using the data from what Lebron has shown us.

In 1956, Charles Stein proved that being unbiased under certain scenarios was not the best way to make predictions, a result which was later refined by Willard James and Charles Stein in 1961.

So does this imply that we should be biased here when making predictions about these players FT%? In this context where we have more than 3 players we are trying to predict their true FT%, yes we should be biased.

Below is the James Stein estimator. There are countless forms and extensions to it including the one you see right now (Lindley modification) but the concept of being biased is still the same.

$$
c = 1 - \frac{(k - 3)\sigma^2}{\sum (y - \bar{y})^2}
$$

$$
z = \bar{y} + c (y - \bar{y})
$$

Where:

- $c$ is the "shrinkage" or how much bias we should apply
- $k$ is the amount of players we have in the draft
- $\sigma^2$ is the variance
- $y$ is the unbiased FT% of the player in question
- $\bar{y}$ is the "grand" average or the average across all players in the current draft
- $z$ is the biased FT% which we aim to calculate

Let's break down this formula a little bit.

We can see that the value we are trying to calculate for $z$ is dependent on the grand average $\bar{y}$ $+$ shrinkage factor $c$ multiplied by the difference between the grand average $\bar{y}$ and the individual observation $y$.

Let's go over a quick example using Lebron. Currently Lebron is shooting at 61% in the first 10 games ($y=0.61$). The average FT% for the 2003 draft class thus far is 70% ($\bar{y}=0.70$).

Now let's see what happens when the shrinkage value is large ($c=1$).

$$
z=0.70+1(0.61-0.70)
$$

$$
z=0.61
$$

Now let's see what happens when the shrinkage value is small ($c=0$).

$$
z=0.70+0(0.61-0.70)
$$

$$
z=0.70
$$

We can see that when we have a small shrinkage value $c$ we place more importance on the grand average, i.e. we assume the player is shooting closer to league average. When $c$ is large, we place more importance on the player's own individual ability.

