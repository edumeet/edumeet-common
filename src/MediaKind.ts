export const MediaKind = Object.freeze({
    AUDIO: 'audio',
    VIDEO: 'video',
} as const);

export type MediaKind = typeof MediaKind[keyof typeof MediaKind];