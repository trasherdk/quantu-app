/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionFlashCard } from './QuestionFlashCard';
import type { QuestionMultipleChoice } from './QuestionMultipleChoice';

/**
 * Question prompt
 */
export type QuestionPrompt = (QuestionMultipleChoice | QuestionFlashCard);