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
    stimulusTimeout: 3000, // 3 seconds max response time
    feedbackDuration: 1000, // 1 second feedback display
    postTrialGap: 500, // 500ms gap after feedback
} as const;

// Stroop Test Types
export type StroopDifficulty = 'easy' | 'hard';

export interface StroopStimulus {
    word: string;
    color: string;
    background?: string;
    taskRule?: 'word' | 'color';
    correctResponse: number;
    condition:
        | 'congruent'
        | 'incongruent'
        | 'word_congruent'
        | 'word_incongruent'
        | 'color_congruent'
        | 'color_incongruent';
}

export interface StroopTrialData {
    stimulus: StroopStimulus;
    response?: number;
    reactionTime?: number;
    correct?: boolean;
    timestamp: number;
}

export interface StroopExperimentData {
    trials: StroopTrialData[];
    startTime: number;
    endTime?: number;
    difficulty: StroopDifficulty;
}

export interface StroopPerformanceMetrics {
    accuracy: number;
    meanReactionTime: number;
    correctTrials: number;
    totalTrials: number;
    congruentAccuracy: number;
    incongruentAccuracy: number;
    congruentRT: number;
    incongruentRT: number;
    stroopEffect: number;
    totalErrors: number;
    totalTimeSeconds: number;
    difficulty: StroopDifficulty;
    predictedAge: number;
}

export type StroopExperimentPhase =
    | 'welcome'
    | 'difficulty'
    | 'instructions'
    | 'test'
    | 'fixation'
    | 'stimulus'
    | 'results';

export interface StroopExperimentState {
    phase: StroopExperimentPhase;
    difficulty?: StroopDifficulty;
    currentTrial: number;
    trialData: StroopTrialData[];
    showingStimulus: boolean;
    stimulusStartTime?: number;
    experimentStartTime?: number;
}

export const STROOP_COLORS = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    yellow: '#DAA520',
} as const;

export const STROOP_CONFIG = {
    fixationDurations: [500, 750, 1000],
    colorChoices: ['red', 'blue', 'green', '#DAA520'] as const,
    easyStimuli: [
        // Congruent trials
        {
            word: 'RED',
            color: 'red',
            correctResponse: 0,
            condition: 'congruent' as const,
        },
        {
            word: 'BLUE',
            color: 'blue',
            correctResponse: 1,
            condition: 'congruent' as const,
        },
        {
            word: 'GREEN',
            color: 'green',
            correctResponse: 2,
            condition: 'congruent' as const,
        },
        {
            word: 'YELLOW',
            color: '#DAA520',
            correctResponse: 3,
            condition: 'congruent' as const,
        },
        {
            word: 'RED',
            color: 'red',
            correctResponse: 0,
            condition: 'congruent' as const,
        },
        {
            word: 'BLUE',
            color: 'blue',
            correctResponse: 1,
            condition: 'congruent' as const,
        },
        {
            word: 'GREEN',
            color: 'green',
            correctResponse: 2,
            condition: 'congruent' as const,
        },
        {
            word: 'YELLOW',
            color: '#DAA520',
            correctResponse: 3,
            condition: 'congruent' as const,
        },
        {
            word: 'RED',
            color: 'red',
            correctResponse: 0,
            condition: 'congruent' as const,
        },
        {
            word: 'BLUE',
            color: 'blue',
            correctResponse: 1,
            condition: 'congruent' as const,
        },

        // Incongruent trials
        {
            word: 'RED',
            color: 'blue',
            correctResponse: 1,
            condition: 'incongruent' as const,
        },
        {
            word: 'BLUE',
            color: 'green',
            correctResponse: 2,
            condition: 'incongruent' as const,
        },
        {
            word: 'GREEN',
            color: '#DAA520',
            correctResponse: 3,
            condition: 'incongruent' as const,
        },
        {
            word: 'YELLOW',
            color: 'red',
            correctResponse: 0,
            condition: 'incongruent' as const,
        },
        {
            word: 'RED',
            color: 'green',
            correctResponse: 2,
            condition: 'incongruent' as const,
        },
        {
            word: 'BLUE',
            color: '#DAA520',
            correctResponse: 3,
            condition: 'incongruent' as const,
        },
        {
            word: 'GREEN',
            color: 'red',
            correctResponse: 0,
            condition: 'incongruent' as const,
        },
        {
            word: 'YELLOW',
            color: 'blue',
            correctResponse: 1,
            condition: 'incongruent' as const,
        },
        {
            word: 'RED',
            color: '#DAA520',
            correctResponse: 3,
            condition: 'incongruent' as const,
        },
        {
            word: 'BLUE',
            color: 'red',
            correctResponse: 0,
            condition: 'incongruent' as const,
        },
    ],
    hardStimuli: [
        // Black background trials - respond to WORD
        // Congruent: word and color match (but we're responding to word)
        {
            word: 'RED',
            color: 'red',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 0,
            condition: 'word_congruent' as const,
        },
        {
            word: 'BLUE',
            color: 'blue',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 1,
            condition: 'word_congruent' as const,
        },
        {
            word: 'GREEN',
            color: 'green',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 2,
            condition: 'word_congruent' as const,
        },
        {
            word: 'YELLOW',
            color: '#DAA520',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 3,
            condition: 'word_congruent' as const,
        },
        {
            word: 'RED',
            color: 'red',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 0,
            condition: 'word_congruent' as const,
        },

        // Incongruent: word and color don't match (but we're responding to word)
        {
            word: 'RED',
            color: 'blue',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 0,
            condition: 'word_incongruent' as const,
        },
        {
            word: 'BLUE',
            color: 'green',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 1,
            condition: 'word_incongruent' as const,
        },
        {
            word: 'GREEN',
            color: '#DAA520',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 2,
            condition: 'word_incongruent' as const,
        },
        {
            word: 'YELLOW',
            color: 'red',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 3,
            condition: 'word_incongruent' as const,
        },
        {
            word: 'BLUE',
            color: 'red',
            background: 'black',
            taskRule: 'word' as const,
            correctResponse: 1,
            condition: 'word_incongruent' as const,
        },

        // Grey background trials - respond to COLOR
        // Congruent: word and color match (and we're responding to color)
        {
            word: 'RED',
            color: 'red',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 0,
            condition: 'color_congruent' as const,
        },
        {
            word: 'BLUE',
            color: 'blue',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 1,
            condition: 'color_congruent' as const,
        },
        {
            word: 'GREEN',
            color: 'green',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 2,
            condition: 'color_congruent' as const,
        },
        {
            word: 'YELLOW',
            color: '#DAA520',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 3,
            condition: 'color_congruent' as const,
        },
        {
            word: 'RED',
            color: 'red',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 0,
            condition: 'color_congruent' as const,
        },

        // Incongruent: word and color don't match (and we're responding to color)
        {
            word: 'RED',
            color: 'blue',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 1,
            condition: 'color_incongruent' as const,
        },
        {
            word: 'BLUE',
            color: 'green',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 2,
            condition: 'color_incongruent' as const,
        },
        {
            word: 'GREEN',
            color: '#DAA520',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 3,
            condition: 'color_incongruent' as const,
        },
        {
            word: 'YELLOW',
            color: 'red',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 0,
            condition: 'color_incongruent' as const,
        },
        {
            word: 'BLUE',
            color: 'red',
            background: '#808080',
            taskRule: 'color' as const,
            correctResponse: 0,
            condition: 'color_incongruent' as const,
        },
    ],
} as const;
