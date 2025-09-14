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
    | 'results';

export interface ExperimentState {
    phase: ExperimentPhase;
    currentTrial: number;
    trialData: TrialData[];
    showingStimulus: boolean;
    stimulusStartTime?: number;
}

export const STIMULUS_CONFIG = {
    blue: { color: '#4A90E2', correctKey: 'f' as const },
    orange: { color: '#F5A623', correctKey: 'j' as const },
} as const;

export const EXPERIMENT_CONFIG = {
    repetitions: 5,
    fixationDurations: [250, 500, 750, 1000, 1250, 1500, 1750, 2000],
    validKeys: ['f', 'j'],
    postTrialGap: 2000,
} as const;
