# Reaction Time Test - React TypeScript Implementation

A modern, responsive implementation of a cognitive reaction time test based on the jsPsych tutorial. This application measures users' response times to colored stimuli and provides immediate feedback and performance analytics.

## Features

### Core Functionality

-   **Stimulus Presentation**: Blue and orange circles requiring specific keyboard responses (F and J keys)
-   **Precise Timing**: Accurate reaction time measurement in milliseconds
-   **Randomized Trials**: Random stimulus order with configurable repetitions
-   **Performance Analytics**: Real-time accuracy and response time calculations

### UX Improvements

-   **Smooth Animations**: Stimulus fade-in/fade-out animations for better visual feedback
-   **Immediate Feedback**: Instant visual feedback showing "Correct!", "Incorrect!", or "Too slow!"
-   **Responsive Design**: Fast-paced gameplay with optimized timing parameters
-   **Visual Polish**: Modern CSS animations and smooth transitions

### Technical Features

-   **TypeScript**: Full type safety and excellent developer experience
-   **React Hooks**: Modern functional component architecture
-   **Vite**: Fast development server and optimized builds
-   **Component Architecture**: Modular, reusable components
-   **State Management**: Robust experiment state handling

## Getting Started

### Prerequisites

-   Node.js 20.19+ or 22.12+ (recommended)
-   npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

The development server will start at `http://localhost:5173/` with hot module replacement enabled.

## Experiment Flow

1. **Welcome Screen**: Introduction and start button
2. **Instructions**: Clear explanation of the task with visual examples
3. **Test Trials**: Randomized sequence of blue/orange stimuli
    - Fixation cross (250-2000ms random duration)
    - Stimulus presentation (blue = F key, orange = J key)
    - Immediate feedback (400ms)
    - Brief inter-trial interval (500ms)
4. **Results**: Performance summary with accuracy and reaction time metrics

## Configuration

Key timing parameters can be adjusted in `src/types/experiment.ts`:

```typescript
export const EXPERIMENT_CONFIG = {
    repetitions: 5, // Trials per stimulus type
    fixationDurations: [250, 500, 750, 1000, 1250, 1500, 1750, 2000], // Random fixation times
    postTrialGap: 500, // Time between trials
    feedbackDuration: 400, // Feedback display time
    fadeOutDuration: 300, // Animation duration
    stimulusTimeout: 2000, // Auto-advance timeout
} as const;
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Welcome.tsx      # Welcome screen
│   ├── Instructions.tsx # Task instructions
│   ├── Fixation.tsx     # Fixation cross
│   ├── Stimulus.tsx     # Stimulus presentation
│   ├── Feedback.tsx     # Response feedback
│   └── Results.tsx      # Performance summary
├── hooks/
│   └── useExperiment.ts # Main experiment logic
├── types/
│   └── experiment.ts    # TypeScript interfaces and config
└── App.tsx              # Main application component
```

## Data Collection

The application tracks:

-   **Response Key**: Which key was pressed ('f', 'j', or timeout)
-   **Reaction Time**: Time from stimulus onset to response (ms)
-   **Accuracy**: Whether the response was correct
-   **Trial Metadata**: Stimulus type, timestamps, etc.

## Browser Compatibility

Tested on modern browsers including:

-   Chrome 90+
-   Firefox 90+
-   Safari 14+
-   Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
