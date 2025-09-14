export interface TrialData {
    stimulus: 'blue' | 'orange';
    correctResponse: 'f' | 'j';
    response?: string;
    reactionTime?: number;
    correct?: boolean;
    timestamp: number;
}

export interface ExperimentData {
    trials: TrialData[];
    startTime: number;
    endTime?: number;
}

export interface PerformanceMetrics {
    accuracy: number;
    meanReactionTime: number;
    correctTrials: number;
    totalTrials: number;
}

export type ExperimentPhase =
    | 'welcome'
    | 'instructions'
    | 'test'
    | 'fixation'
    | 'stimulus'
    | 'feedback'
    | 'results';

export interface ExperimentState {
    phase: ExperimentPhase;
    currentTrial: number;
    trialData: TrialData[];
    showingStimulus: boolean;
    stimulusStartTime?: number;
    feedbackMessage?: string;
    isFadingOut?: boolean;
}

export const STIMULUS_CONFIG = {
    blue: { color: '#4A90E2', correctKey: 'f' as const },
    orange: { color: '#F5A623', correctKey: 'j' as const },
} as const;

export const EXPERIMENT_CONFIG = {
    repetitions: 5,
    fixationDurations: [250, 500, 750, 1000, 1250, 1500, 1750, 2000],
    validKeys: ['f', 'j'],
    postTrialGap: 500, // Reduced from 2000ms to 500ms for faster pace
    feedbackDuration: 400, // Show feedback for 400ms
    fadeOutDuration: 300, // Fade out animation duration
    stimulusTimeout: 2000, // Auto-advance if no response after 2 seconds
} as const;
