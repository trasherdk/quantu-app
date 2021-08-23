/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionPromptPrivate } from './QuestionPromptPrivate';

/**
 * question show private
 */
export type QuestionPrivate = {
    /**
     * Id
     */
    id: number;
    /**
     * Question index in quiz
     */
    index?: number | null;
    /**
     * Creation timestamp
     */
    insertedAt: string;
    /**
     * Question name
     */
    name: string | null;
    /**
     * Organization Id
     */
    organizationId: number;
    prompt: QuestionPromptPrivate;
    /**
     * Quiz Id
     */
    quizId?: number | null;
    /**
     * Question tags
     */
    tags: Array<string>;
    /**
     * Question type
     */
    type: QuestionPrivate.type;
    /**
     * Update timestamp
     */
    updatedAt: string;
}

export namespace QuestionPrivate {

    /**
     * Question type
     */
    export enum type {
        FLASH_CARD = 'flash_card',
        MULTIPLE_CHOICE = 'multiple_choice',
    }


}