---
layout: post
title: Energy-Aware Camera Scheduling for Opportunistic 3D Mapping
date: 2026-06-24 12:00:00
description: For the final project in MIT’s Mobile and Sensor Computing class (6.1820), I built an <code>ARKit</code> + <code>Swift</code> iOS app that maps indoor environments by keeping the camera <strong>actually off</strong> between bursts. An adaptive policy opens short RGB capture windows only when inferred map utility (staleness / unseen coverage) warrants it; pose is propagated with IMU dead reckoning in between. We reconstruct sparse 3D structure from ARKit feature points and triangulated corner tracks, persist a global <code>ARWorldMap</code> for visual relocalization, and evaluate localization strategies (continuous VIO, periodic relocalization, distance-based relocalization, policy-aware bursts, IMU-only) against a continuous visual ground truth—with per-method power profiling via Xcode’s Power Profiler.
tags: Python visual-computing systems machine-learning robotics
categories: class-projects
thumbnail: assets/img/indoormapper.png
---

**Abstract**

Indoor 3D maps are increasingly used by augmented reality, robotics, and spatial computing applications, but they are often incomplete and quickly become stale because indoor environments are expensive to scan and maintain. The growing adoption of AI glasses creates an opportunity to continuously update these maps using observations collected during everyday user movement. However, continuous visual sensing is impractical on wearable devices due to limited battery capacity.

This work presents *IndoorMapper*, a budget-aware sensing framework for opportunistic indoor map maintenance. IndoorMapper formulates map maintenance as a map-age minimization problem, where unmapped regions are treated as having higher age than any previously observed region, unifying coverage and freshness within a single objective. The system combines lightweight localization, map-age estimation, and adaptive camera scheduling to determine when the benefit of collecting observations justifies the associated sensing cost.

Using real-world experiments and trace-driven simulation, we show that budget-aware sensing significantly improves map quality while operating within realistic energy constraints, approaching the performance of an oracle policy with perfect knowledge of future user movement.

<div class="social">
<a class="venobox" data-gall="myGallery2" href="../../../assets/img/indoormapper.png"><img src="../../../assets/img/indoormapper.png" /></a>
</div><br>