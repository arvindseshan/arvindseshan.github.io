---
layout: post
title: Image Inpainting
date: 2024-12-26 11:46:00
description: Designed and implemented process for inpainting regions in images by interpolating structure (image gradients) using a Poisson solver and color values via PDE’s (anisotropic diffusion) in <code>C++</code>.
tags: C/C++ visual-computing
categories: class-projects
thumbnail: assets/img/inpaintingbeach.png
featured: true
images:
  compare: true
  # slider: true
  venobox: true
---

For this project, I designed and implemented process for inpainting regions in images by interpolating structure (image gradients) using a Poisson solver and color values via PDE’s (anisotropic diffusion) in <code>C++</code>.

With the recent popularity of generative AI (diffusion models) for a variety of visual tasks including inpainting, the goal was to take a deeper dive into classical methods for image inpainting.

## Poisson Solver

The first step for this project was to implement a Poisson solver. Below, you can see a test case that runs the Poisson solver for seamless compositing given a background (water), foreground (bear), and mask. The blended result is shown in the bottom right image.


<div class="social">
<a class="venobox" data-gall="myGallery" href="../../../assets/img/waterpool.png"><img style=" border-radius: 5%;vertical-align:middle;margin:2px 2px" src="../../../assets/img/waterpool.png" /></a>
<a class="venobox" data-gall="myGallery" href="../../../assets/img/mask.png"><img style=" border-radius: 5%;vertical-align:middle;margin:2px 2px" src="../../../assets/img/mask.png" /></a><br>
<a class="venobox" data-gall="myGallery" href="../../../assets/img/bear.png"><img style=" border-radius: 5%;vertical-align:middle;margin:2px 2px" src="../../../assets/img/bear.png" /></a>
<a class="venobox" data-gall="myGallery" href="../../../assets/img/poissonTest.png"><img style=" border-radius: 5%;vertical-align:middle;margin:2px 2px" src="../../../assets/img/poissonTest.png" /></a>
</div>

## Laplacian


Next, I had to compute the Laplacian of an image. The test case below runs the code to compute the Laplacian by convolving with the appropriate kernel. Drag the slider on the image to reveal the original image and its corresponding Laplacian. The Laplacian is a second derivative and should highlight regions of the image with drastic changes in pixel intensity (i.e. edges).

<div class="social">
<img-comparison-slider>
  {% include figure.liquid path="assets/img/beach.png" class="img-fluid rounded z-depth-1" slot="first" %}
  {% include figure.liquid path="assets/img/applyLaplacianTest.png" class="img-fluid rounded z-depth-1" slot="second" %}
</img-comparison-slider>
</div>

## Structure Tensor

I also compute the structure tensor of an image. The test case below runs the code to compute the structure tensor while ignoring pixels within the masked area. Drag the slider on the image to reveal the original image with the mask and its corresponding structure tensor. The red and blue coloring indicates a change in intensity in primarily the horizontal and vertical directions respectively. Also, note how the tensor output is correctly blacked out in the masked regions.

<div class="social">
<img-comparison-slider>
  {% include figure.liquid path="assets/img/street_with_mask.png" class="img-fluid rounded z-depth-1" slot="first" %}
  {% include figure.liquid path="assets/img/tensorMaskTest.png" class="img-fluid rounded z-depth-1" slot="second" %}
</img-comparison-slider>
</div>

## Structure Interpolation

With these components, the next step is to interpolate the structure of the masked regions. To do this, I first compute the structure tensor outside the masked area. Then, I run the Poisson solver with the initial structure tensor as the background and a black image as the foreground. The test case below runs the code to interpolate the structure tensor within the masked area of the image. The image on the left is the full structure tensor output and the image on the right depicts just the interpolated parts in the masked region.

<div class="social">
<img-comparison-slider>
  {% include figure.liquid path="assets/img/InterpolateStructureTestStreet.png" class="img-fluid rounded z-depth-1" slot="first" %}
  {% include figure.liquid path="assets/img/InterpolateStructureTestMaskStreet.png" class="img-fluid rounded z-depth-1" slot="second" %}
</img-comparison-slider>
</div>

## Color Interpolation

Now that I have an interpolated structure tensor, I can use it to interpolate color values within the masked area. To do this, I iterate over the image and perform iterative image inpainting updates. I interleave these updates with a pass of anisotropic diffusion every third iteration. I only update pixels within the masked region. Below are the results of the algorithm on a few sample images.


<!-- ## Image Comparison Slider -->

<!-- This is a simple image comparison slider. It uses the [img-comparison-slider](https://img-comparison-slider.sneas.io/) library. Check the [examples page](https://img-comparison-slider.sneas.io/examples.html) for more information of what you can achieve with it. -->

<div class="social">
<img-comparison-slider>
  {% include figure.liquid path="assets/img/street_with_mask.png" class="img-fluid rounded z-depth-1" width=300 slot="first" %}
  {% include figure.liquid path="assets/img/AnisotropicDiffusionTestStreet.png" class="img-fluid rounded z-depth-1" width=300 slot="second"%}
</img-comparison-slider>

<img-comparison-slider>
  {% include figure.liquid path="assets/img/inpaintingbeach.png" class="img-fluid rounded z-depth-1" width="300" slot="first" %}
  {% include figure.liquid path="assets/img/inpaintingbeach2.png" class="img-fluid rounded z-depth-1" width="300" slot="second" %}
</img-comparison-slider>
</div>





<!-- ## Image Slider -->

<!-- This is a simple image slider. It uses the [Swiper](https://swiperjs.com/) library. Check the [examples page](https://swiperjs.com/demos) for more information of what you can achieve with it. -->

<!-- 
{% comment %}
<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/9.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/7.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/8.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/10.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/12.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container> 
{% endcomment %}
-->
