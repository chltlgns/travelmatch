# Project Summary
TravelMatch is a personalized travel destination recommendation platform that enhances user engagement through a multi-step survey. It utilizes React and TypeScript to collect user preferences and deliver tailored travel suggestions from a curated dataset of cities. The platform integrates cultural experiences and various travel styles, monetized through Google AdSense. Recent updates have improved social media sharing capabilities, particularly for Instagram, and redesigned the user interface for destination details. Currently, it supports recommendations for 50 major cities worldwide, with user-uploaded images enhancing the experience.

# Project Module Description
TravelMatch consists of the following key functional modules:
- **Components**: Reusable UI components in `src/components/ui` for building the user interface.
- **Hooks**: Custom React hooks for managing application state, found in the `src/hooks` directory.
- **Lib**: Utility functions that simplify common tasks, located in `src/lib`.
- **Pages**: Various application views, with the main entry point in `src/pages/Index.tsx` and a 404 page in `NotFound.tsx`.
- **Survey System**: A multi-step survey designed to effectively assess user preferences.
- **Local Image System**: A module for handling city images uploaded by users, enhancing the travel recommendation experience.

# Directory Tree
```plaintext
/data/template-dist/personal_demonstration_template/shadcn-ui
├── .gitignore                        # IGNORED files for Git
├── .mgx                              
│   └── config.yaml                   # Configuration file for mgx
├── README.md                         # Project documentation
├── components.json                   # Metadata for components
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML entry point, includes SEO meta tags and AdSense script
├── package.json                      # Project dependencies and scripts
├── pnpm-lock.yaml                    # Lock file for dependencies
├── postcss.config.js                 # PostCSS configuration
├── public                            # Public assets (images, etc.)
│   ├── favicon.svg                   # Favicon for the application
│   ├── robots.txt                    # Robots.txt for web crawling
│   └── sitemap.xml                   # Sitemap for search engines
│   ├── travel_destinations_data.json  # Travel destinations dataset
│   ├── thumbnail.jpg                 # Social media thumbnail image
│   ├── ads.txt                       # ads.txt for Google AdSense
│   └── cities                        # Directory for user-uploaded city images
│       └── placeholder.jpg           # Placeholder image for missing city images
├── src                               # Source files for the application
│   ├── App.css                       # Basic styles for the app
│   ├── App.tsx                       # Root component of the application
│   ├── components                    # Directory for UI components
│   │   ├── EnhancedRecommendationResults.tsx # Results display component
│   │   ├── MultiStepSurvey.tsx       # Multi-step survey component
│   │   ├── ShareButton.tsx           # Social share button component
│   │   ├── ImageUploadHelper.tsx     # Helper for processing uploaded images
│   │   └── TravelStyleAnalysis.tsx   # Travel personality analysis component
│   ├── hooks                         # Custom React hooks
│   │   └── useAdvancedRecommendationEngine.ts # Recommendation logic
│   ├── index.css                     # Global styles updated with new color scheme
│   ├── lib                           # Utility functions
│   ├── main.tsx                      # Entry point for the application
│   ├── pages                         # Application views
│   │   ├── Index.tsx                 # Main page of the application
│   │   └── NotFound.tsx              # 404 Not Found page
│   ├── types                         # TypeScript type definitions
│   │   └── travel.ts                 # Travel data types
│   ├── utils                         # Utility functions for image processing
│   │   ├── cityImageMapper.ts        # Logic for mapping city images
│   │   └── imageUploadProcessor.ts    # Logic for processing uploaded images
│   └── vite-env.d.ts                 # Type definitions for Vite
├── tailwind.config.ts                # Configuration file for Tailwind CSS
├── template_config.json              # Template-specific configuration
├── tsconfig.app.json                 # TypeScript configuration for the app
├── tsconfig.json                     # Base TypeScript configuration
├── tsconfig.node.json                # Node-specific TypeScript configuration
└── vite.config.ts                    # Configuration file for Vite
```

# File Description Inventory
- **.gitignore**: Specifies files and directories to ignore in Git.
- **.mgx/config.yaml**: Configuration settings for the mgx tool.
- **README.md**: Primary documentation for usage and structure.
- **components.json**: Metadata about available components.
- **eslint.config.js**: Rules and configurations for ESLint.
- **index.html**: Main HTML document, includes SEO meta tags and Google AdSense script.
- **package.json**: Lists project dependencies and scripts for npm tasks.
- **pnpm-lock.yaml**: Records exact versions of installed packages.
- **postcss.config.js**: Configures PostCSS processing for styles.
- **public/**: Directory for static assets, including the travel destinations dataset, social media thumbnail, ads.txt for Google AdSense, and user-uploaded city images.
- **src/**: Contains all source code files for the application, including new utilities for image processing.
- **tailwind.config.ts**: Configuration for Tailwind CSS styles.
- **template_config.json**: Contains specific templates and project configurations.
- **tsconfig.*.json**: TypeScript configuration files for various environments.

# Technology Stack
This project utilizes the following technologies:
- **Vite**: Build tool for fast front-end development.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **React**: JavaScript library for building user interfaces.
- **shadcn-ui**: A library of pre-built components.
- **Tailwind CSS**: Utility-first CSS framework for custom designs.

# Usage
To get started with the project:

### Install Dependencies
Run the following command to install the necessary dependencies:
```shell
pnpm install
```

### Build for Production
To create a production build of the application:
```shell
pnpm run build
```

### Image Uploading
1. Upload your folder containing city images (named with city names) to the `/public/cities/` directory.
2. The system will automatically match these images to travel recommendations.
3. If an image for a city is not available, a placeholder image will be displayed.

### Note
The application's main JavaScript and component files reside under the `src` directory, where most development efforts should focus.
