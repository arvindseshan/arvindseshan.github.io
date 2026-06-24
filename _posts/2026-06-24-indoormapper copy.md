---
layout: post
title: Energy-Aware Camera Scheduling for Opportunistic 3D Mapping
date: 2026-06-24 12:00:00
description: Wearable devices operate under stringent energy constraints and cannot continuously capture video. This raises a fundamental systems question — given a limited sensing budget, when should a mobile device collect visual data to maximize the coverage and freshness of a continuously evolving 3D map? We address this with <code>IndoorMapper</code>, a budget-aware sensing framework for opportunistic 3D map maintenance that localizes users within an existing map, estimates the utility of potential observations, and dynamically allocates a user-specified sensing budget across a user’s trajectory.
tags: Python visual-computing systems machine-learning robotics
categories: class-projects
thumbnail: assets/img/indoormappercover.png
featured: true
---

**Abstract**

Indoor 3D maps are increasingly used by augmented reality, robotics, and spatial computing applications, but they are often incomplete and quickly become stale because indoor environments are expensive to scan and maintain. The growing adoption of AI glasses creates an opportunity to continuously update these maps using observations collected during everyday user movement. However, continuous visual sensing is impractical on wearable devices due to limited battery capacity.

This work presents *IndoorMapper*, a budget-aware sensing framework for opportunistic indoor map maintenance. IndoorMapper formulates map maintenance as a map-age minimization problem, where unmapped regions are treated as having higher age than any previously observed region, unifying coverage and freshness within a single objective. The system combines lightweight localization, map-age estimation, and adaptive camera scheduling to determine when the benefit of collecting observations justifies the associated sensing cost.

Using real-world experiments and trace-driven simulation, we show that budget-aware sensing significantly improves map quality while operating within realistic energy constraints, approaching the performance of an oracle policy with perfect knowledge of future user movement.

<div class="social">
<a class="venobox" data-gall="myGallery2" href="../../../assets/img/indoormapper.png"><img src="../../../assets/img/indoormappersmall.png" /></a>
</div><br>