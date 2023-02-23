export declare const MediaSourceType: Readonly<{
    readonly MIC: "mic";
    readonly WEBCAM: "webcam";
    readonly SCREEN: "screen";
    readonly SCREENAUDIO: "screenaudio";
    readonly EXTRAVIDEO: "extravideo";
}>;
export type MediaSourceType = typeof MediaSourceType[keyof typeof MediaSourceType];
