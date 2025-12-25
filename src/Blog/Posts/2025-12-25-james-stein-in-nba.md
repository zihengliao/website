---
title: "James Stein Estimator in the NBA"
date: "2025-12-25"
---

## James Stein Estimator in the NBA

Let's set the stage for some context first.

Picture this. It's 2003 you and your mate are arguing about how this is the best draft class since the 1996 draft featuring Kobe Bryant, Allen Iverson and the like. There are multiple metrics to decide how good players are, but you decide to look at free throws due to its simplicity and self paced nature, i.e. there are no external factors influencing the player performing this skill.

Currently there has only been 10 games into the season, but you start looking at FT% (free throw %) across every player in the draft since you don't want to wait until the end of the season to prove a point. 

You take a look, and Lebron is currently a 61% FT shooter, Carmelo Anthony is at 72% and Dwayne Wade is at 67% etc. 

However because it's only 10 games into the season, you know this is an inaccurate estimate of their true FT%.

I'm going to go on a quick tangent here so please bare with me. In the 1950s and prior to that, statisticians believed that unbiasedness was the best way to model data and make predictions. So Lebron's 61% FT accuracy is calculated by dividing the amount of free throws he has made (23) by the amount of free throws he has attempted (38) is an unbiased attempt to model his true FT%. You can see how this is unbiased since we are only using the data from what Lebron has shown to us.

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

Let's see what happens when the shrinkage value is small ($c=0$).

$$
z=0.70+0(0.61-0.70)
$$

$$
z=0.70
$$

We can see that when we have a small shrinkage value $c$ we place more importance on the grand average, i.e. we assume the player is shooting closer to league average. When $c$ is large, we place more importance on the player's own individual ability.

So essentially we are being biased towards the player that they are somewhat average.

Let's see the James Stein Estimator in action.

I've collated the FT% of everybody in the 2003 draft for the first 10 games of the season. I've decided to exclude players that either haven't played a game thus far or attempted a free throw since they cannot be represented with data.

Usually the James Stein estimator applies the same shrinkage across each individual observation $y$ but that assumes each player's FT% variance is the same which obviously isn't true. Someone who shot 2 for 2 has much higher variance than someone who has shot for 70 for 100.

Because a free throw is a bernoulli process, you either make it or you don't, we can model it with a binomial distribution and calculate the player's shooting variance with:

$$
\sigma^2 = \mathrm{Var}(\hat{p}) = \frac{p(1 - p)}{n}
$$

With this we can now calculate our shrinkage $c$. However I'm going to add an extension to this since we can get some funky shrinkage values due to our variance. For example, given that our empirical average FT% estimate is 100% from shooting 3 of 3 shots, our variance $\sigma^2=\frac{1(1 - 1)}{3}=0$ which then causes our shrinkage $c$ to $=1$ implying that we believe our player is indeed a 100% free throw shooter. There are also cases where the variance causes shrinkage $c$ to be negative, losing its interpretability. 

The extension I'm proposing is applying the shrinkage to a sigmoid function:

$$
c' = \frac{1}{1 + e^{-c}}
$$

where $c'$ is the new shrinkage value.

The sigmoid function essentially just limits our shrinkage value to be between $(0,1)$.

That's enough theory and math. Let's see some numbers.

<csvtable src="/assets/blog/2025-12-25-james_stein_in_nba/2003_players_ft.csv" ></csvtable>

The above table we see the amount of free throws made and attempted in the first 10 games of the 2003-2004 season. For this experiment we will take the ground truth of the player's FT% as their FT% at the end of the season when all 82 regular season games have been played.

We can immediately see that for a lot of the players, by shrinking towards the grand average, we achieve a closer FT% to the ground truth seen at the end of the season. However this is not true for all players such as Carmelo Anthony who shot 78% compareted to the 71% esimated by the JS estimator.

This is because the James Stein estimator doesn't guarantee a better prediction for any individual player. Instead it guarantees that we will see better predictions across all players on average.

We can quantify this using the mean squared error (MSE).

$$
\mathrm{MSE} = \frac{1}{n}\sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

where $y_i$ is the individual player's predicted FT% and $\hat{y}_i$ is the true FT%.

| Estimator       | Mean Squared Error |
|-----------------|--------------------|
| Empirical (MLE) | 0.018              |
| James–Stein     | 0.007              |

This is insane! So by being biased towards the grand average we can perform roughly 2.5x better than if we were to just use the unbiased observed results!

**Concluding statement**

We can see how powerful the James Stein estimator can be due to its applicability in a wide array of problems beyond just FT%. Intuitively it kind of makes sense as well as we do this subconsciously. If Stephen Curry is on an absolute heater and has been shooting 70% from the 3 point line for the past 5 games, we usually are biased and assume his true 3 point percentage is closer to either his average or the league average.

It's important to remember that the James Stein estimator does not guarantee better predictions for any single observation but the predictive accuracy on average across all observations.