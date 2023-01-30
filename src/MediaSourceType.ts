export const MediaSourceType = Object.freeze({
    MIC: 'mic',
    WEBCAM: 'webcam',
    SCREEN: 'screen',
    SCREENAUDIO: 'screenaudio',
    EXTRAVIDEO: 'extravideo'
} as const);

export type MediaSourceType = typeof MediaSourceType[keyof typeof MediaSourceType];