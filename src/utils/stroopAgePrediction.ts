/**
 * Stroop Age Prediction Model
 * Based on research by Belghali et al. (2022)
 * Updated to use both time and errors for prediction
 */
export class StroopAgePredictionModel {
    private intercept: number = 21.36;
    private timeCoeff: number = 0.11;
    private errorCoeff: number = 3.66;
    private difficultyAdjustment: { [key: string]: number } = {
        easy: 0, // No adjustment for easy version
        hard: -2.5, // Subtract from predicted age for hard version (accounts for increased difficulty)
    };

    constructor() {
        // Model coefficients derived from multiple linear regression on data from Belghali et al. (2022)
        // Model: Age = intercept + (time_coeff * SSCT_TIME) + (error_coeff * SSCT_ERROR) + (difficulty_adj)
    }

    /**
     * Predicts age based on SSCT time, errors, and difficulty level.
     * @param {number} totalTime - The total time taken to complete the test in seconds.
     * @param {number} numErrors - The total number of errors made.
     * @param {string} difficulty - The difficulty level ('easy' or 'hard').
     * @returns {number} The predicted age.
     */
    public predictAge(
        totalTime: number,
        numErrors: number,
        difficulty: string = 'easy'
    ): number {
        if (totalTime < 0 || numErrors < 0) {
            throw new Error('Time and errors cannot be negative.');
        }

        const basePrediction =
            this.intercept +
            this.timeCoeff * totalTime +
            this.errorCoeff * numErrors;
        const difficultyAdj = this.difficultyAdjustment[difficulty] || 0;
        const prediction = basePrediction + difficultyAdj;

        // Ensure the predicted age is not below the study's minimum age.
        return Math.max(15, prediction);
    }

    /**
     * Predicts age from error rate only (for backward compatibility)
     */
    public predictAgeFromErrors(
        numErrors: number,
        totalTrials: number = 36
    ): number {
        // Estimate time based on typical performance (fallback method)
        const estimatedTimePerTrial = 1.5; // seconds
        const totalTime = estimatedTimePerTrial * totalTrials;
        return this.predictAge(totalTime, numErrors, 'easy');
    }

    public getModelEquation(difficulty: string = 'easy'): string {
        const adj = this.difficultyAdjustment[difficulty] || 0;
        const adjText = adj !== 0 ? ` + (${adj})` : '';
        return `Age = ${this.intercept} + (${this.timeCoeff} × Time) + (${this.errorCoeff} × Errors)${adjText}`;
    }
}
