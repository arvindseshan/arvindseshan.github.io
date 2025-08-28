// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-travel-photos",
          title: "travel photos",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/photos/";
          },
        },{id: "post-star-battle-puzzle-game",
      
        title: "Star Battle Puzzle Game",
      
      description: "For the final project in MIT’s Software Construction class, I worked in a group of three to implement a puzzle game in TypeScript. I leveraged software engineering techniques such as writing design specifications, performing code reviews, and building unit tests &amp; CI/CD pipelines to ensure safe, maintainable, and reliable software for a client–server system.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/puzzle/";
        
      },
    },{id: "post-plug-and-play-self-supervised-temporal-consistency-refinement-for-monocular-depth-estimation-in-video",
      
        title: "Plug-and-Play Self-Supervised Temporal Consistency Refinement for Monocular Depth Estimation in Video",
      
      description: "For the final project in MIT’s Introduction to Computer Vision class, I worked on a lightweight self-supervised refinement model with PyTorch that improves monocular video depth estimation by enforcing temporal and visual consistency across frames. Our plug-in approach enhances single-image depth predictions with smooth, stable results while remaining more efficient than bulky state-of-the-art methods.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/cv/";
        
      },
    },{id: "post-ai-powered-cv-analyzer",
      
        title: "AI-Powered CV Analyzer",
      
      description: "Designed an AI-powered platform using Flask and Gemini that compares résumés to job descriptions to provide a match score and feedback with a backend in Python and frontend in HTML and CSS.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/cvai/";
        
      },
    },{id: "post-image-inpainting",
      
        title: "Image Inpainting",
      
      description: "Designed and implemented process for inpainting regions in images by interpolating structure (image gradients) using a Poisson solver and color values via PDE’s (anisotropic diffusion) in C++.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/image-inpainting/";
        
      },
    },{id: "post-unix-like-operating-system",
      
        title: "UNIX-like Operating System",
      
      description: "Implemented several key parts of virtual memory system, network protocol stack, system call interfaces, and file system in C.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/os/";
        
      },
    },{id: "post-risc-v-processor-optimized-for-neural-network-inference",
      
        title: "RISC-V Processor Optimized for Neural Network Inference",
      
      description: "Built CPU with 4-stage pipeline, bypassing, and custom instruction set extensions for inference. Implemented loop unrolling and function inlining code optimizations.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/Processor/";
        
      },
    },{id: "post-iterative-neural-network-based-approach-to-automated-ift-20-sensory-neuron-identification-in-lt-i-gt-caenorhabditis-elegans-lt-i-gt",
      
        title: "Iterative Neural Network Based Approach to Automated IFT-20 Sensory Neuron Identification in &lt;i&gt;Caenorhabditis...",
      
      description: "Developed custom multistage neural network implemented using PyTorch to classify 22 sensory neurons in the IFT-20 subunit of the C. elegans brain. Paper available upon request",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/celegans/";
        
      },
    },{id: "post-using-machine-learning-to-augment-dynamic-time-warping-based-signal-classification",
      
        title: "Using Machine Learning to Augment Dynamic Time Warping Based Signal Classification",
      
      description: "Designed neural network using TensorFlow that predicts likely distortions between signals to eliminate unnecessary computations in Dynamic Time Warping (DTW), a popular signal comparison algorithm. arXiv:2206.07200",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/dtw/";
        
      },
    },{id: "post-object-tracking-amp-gesture-recognition",
      
        title: "Object Tracking &amp; Gesture Recognition",
      
      description: "Created interactive game with real-time hand-tracking and neural network-based gesture identification using OpenCV and TensorFlow in Python. 1st place term project.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/gesture/";
        
      },
    },{id: "post-enabling-high-accuracy-human-activity-recognition-with-fine-grained-indoor-localization",
      
        title: "Enabling High-Accuracy Human Activity Recognition with Fine-Grained Indoor Localization",
      
      description: "Used multilateration with fine-grained distance estimates from Wi-Fi Round Trip Time to perform high-accuracy indoor localization. Combined location, accelerometer, and audio data collected from a custom-made Android application programmed in Java to train a neural network that performs activity recognition of various household tasks. arXiv:2108.06838",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/har/";
        
      },
    },{id: "post-alto-ad-hoc-high-accuracy-touch-interaction-using-acoustic-localization",
      
        title: "(ALTo) Ad Hoc High-Accuracy Touch Interaction Using Acoustic Localization",
      
      description: "Designed low-cost tool programmed using Python to increase the usable interactive touch surface area of devices. Implemented system using pairs of piezoelectric microphones and time difference of arrival (TDOA) based multilateration to determine the origin of a tap on a surface. arXiv:2108.06837",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/alto/";
        
      },
    },{id: "post-robots-for-lego-mindstorms-app",
      
        title: "Robots for LEGO MINDSTORMS App",
      
      description: "Designed 3 robots for official MINDSTORMS App, incorporating end-user needs and product design guidelines.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/robotsapp/";
        
      },
    },{id: "post-lego-robotics-games-and-other-projects",
      
        title: "LEGO Robotics Games and Other Projects",
      
      description: "For the last seven years, I have been creating and sharing interactive LEGO robotics models. Many of these robots have been featured on LEGO and LEGO Education social media sites, and LEGO events such as LEGOWORLD Copenhagen.",
      section: "Projects",
      handler: () => {
        
          window.location.href = "/projects/robotsproj/";
        
      },
    },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/arvindseshan", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/seshanarvind", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=G_tEbqMAAAAJ&hl=en", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@arvindseshan8480", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
