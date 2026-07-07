import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcPauseEvent } from "../../events/pc-pause.js";
import { PcPlayEvent } from "../../events/pc-play.js";
import type { PcButton } from "../button/button.js";
import type { PcDropdown } from "../dropdown/dropdown.js";
import type { PcSlider } from "../slider/slider.js";
import "../button/button.js";
import "../button-group/button-group.js";
import "../dropdown/dropdown.js";
import "../dropdown-item/dropdown-item.js";
import "../icon/icon.js";
import "../slider/slider.js";
import styles from "./video-player.css";

/**
 * @summary Video players present visual media and provide controls for playback.
 * @status experimental
 * @since 1.0.0-alpha.5
 *
 * @dependency pc-button
 * @dependency pc-button-group
 * @dependency pc-dropdown
 * @dependency pc-dropdown-item
 * @dependency pc-icon
 * @dependency pc-slider
 *
 * @slot - The video player’s media sources and subtitle/caption tracks.
 *
 * @event pc-play - Emitted when the video is played.
 * @event pc-pause - Emitted when the video is paused.
 *
 * @csspart frame - The video player’s frame.
 * @csspart initial-overlay - The video player’s initial overlay before the video starts.
 * @csspart initial-play - The initial overlay’s play button.
 * @csspart initial-play-base - The initial play button’s `base` part.
 * @csspart initial-play-label - The initial play button’s `label` part.
 * @csspart initial-play-icon - The initial play button’s `<pc-icon>` element.
 * @csspart initial-play-icon-svg - The `<pc-icon>` element’s `svg` part of the initial play button.
 * @csspart title - The video player’s title.
 * @csspart video - The video player’s internal `<video>` element.
 * @csspart captions-container - The video player’s caption container.
 * @csspart caption-cue - The video player’s caption cue.
 * @csspart caption-line-container - The video player’s caption cue line’s container.
 * @csspart caption-line - The video player’s caption cue line.
 * @csspart progress-bar - The video player’s progress bar container.
 * @csspart progress-wrapper - The progress bar’s progress wrapper.
 * @csspart progress-buffer - The progress wrapper’s buffer element.
 * @csspart progress-slider - The progress wrapper’s slider.
 * @csspart progress-slider-slider - The progress slider’s `slider` part.
 * @csspart progress-slider-track - The progress slider’s `track` part.
 * @csspart progress-slider-indicator - The progress slider’s `indicator` part.
 * @csspart progress-slider-thumb - The progress slider’s `thumb` part.
 * @csspart progress-slider-tooltip - The progress slider’s `tooltip` part.
 * @csspart progress-slider-tooltip-tooltip - The tooltip’s `tooltip` part of the progress slider.
 * @csspart progress-slider-tooltip-content - The tooltip’s `content` part of the progress slider.
 * @csspart progress-slider-tooltip-arrow - The tooltip’s `arrow` part of the progress slider.
 * @csspart controls - The video player’s controls.
 * @csspart play - The video player’s play button.
 * @csspart play-base - The play button’s `base` part.
 * @csspart play-label - The play button’s `label` part.
 * @csspart play-icon - The play button’s `<pc-icon>` element.
 * @csspart play-icon-svg - The `<pc-icon>` element’s `svg` part of the play button.
 * @csspart mute-container - The container for the video player’s mute button and volume slider.
 * @csspart mute - The video player’s mute button.
 * @csspart mute-base - The mute button’s `base` part.
 * @csspart mute-label - The mute button’s `label` part.
 * @csspart mute-icon - The mute button’s `<pc-icon>` element.
 * @csspart volume-slider - The volume slider.
 * @csspart volume-slider-slider - The volume slider’s `slider` part.
 * @csspart volume-slider-track - The volume slider’s `track` part.
 * @csspart volume-slider-indicator - The volume slider’s `indicator` part.
 * @csspart volume-slider-thumb - The volume slider’s `thumb` part.
 * @csspart volume-slider-tooltip - The volume slider’s `tooltip` part.
 * @csspart volume-slider-tooltip-tooltip - The tooltip’s `tooltip` part of the volume slider.
 * @csspart volume-slider-tooltip-content - The tooltip’s `content` part of the volume slider.
 * @csspart volume-slider-tooltip-arrow - The tooltip’s `arrow` part of the volume slider.
 * @csspart time-container - The video player’s time container.
 * @csspart controls-group - The video player’s controls group.
 * @csspart captions - The video player’s captions button.
 * @csspart captions-base - The captions button’s `base` part.
 * @csspart captions-label - The captions button’s `label` part.
 * @csspart captions-icon - The captions button’s `<pc-icon>` element.
 * @csspart captions-icon-svg - The `<pc-icon>` element’s `svg` part of the captions button.
 * @csspart settings-menu - The video player’s settings menu.
 * @csspart settings-menu-base - The settings menu’s `base` part.
 * @csspart settings-menu-menu - The settings menu’s `menu` part.
 * @csspart settings-button - The settings menu’s trigger button.
 * @csspart settings-button-base - The settings button’s `base` part.
 * @csspart settings-button-label - The settings button’s `label` part.
 * @csspart settings-button-icon - The settings button’s `<pc-icon>` element.
 * @csspart settings-button-icon-svg - The `<pc-icon>` element’s `svg` part of the settings button.
 * @csspart settings-menu-item - The video player’s settings menu items.
 * @csspart settings-menu-item-checkmark - The settings items’ `checkmark` part.
 * @csspart settings-menu-item-checkmark-svg - The settings items’ `checkmark-svg` part.
 * @csspart settings-menu-item-icon - The settings items’ `icon` part.
 * @csspart settings-menu-item-label - The settings items’ `label` part.
 * @csspart settings-menu-item-details - The settings items’ `details` part.
 * @csspart settings-menu-item-submenu-icon - The settings items’ `submenu-icon` part.
 * @csspart settings-menu-item-submenu-icon-svg - The settings items’ `submenu-icon-svg` part.
 * @csspart settings-menu-item-submenu - The settings items’ `submenu` part.
 * @csspart settings-menu-divider - The settings menu’s divider.
 * @csspart picture-in-picture - The video player’s Picture in Picture button.
 * @csspart picture-in-picture-base - The Picture in Picture button’s `base` part.
 * @csspart picture-in-picture-label - The Picture in Picture button’s `label` part.
 * @csspart picture-in-picture-icon - The Picture in Picture button’s `<pc-icon>` element.
 * @csspart picture-in-picture-icon-svg - The `<pc-icon>` element’s `svg` part of the Picture in Picture button.
 * @csspart full-screen - The video player’s full screen button.
 * @csspart full-screen-base - The full screen button’s `base` part.
 * @csspart full-screen-label - The full screen button’s `label` part.
 * @csspart full-screen-icon - The full screen button’s `<pc-icon>` element.
 * @csspart full-screen-icon-svg - The `<pc-icon>` element’s `svg` part of the full screen button.
 */
@customElement("pc-video-player")
export class PcVideoPlayer extends PlacerElement {
    static css = styles;

    private readonly localize = new LocalizeController(this);

    @query('[part~="frame"]') frame!: HTMLDivElement;
    @query('[part~="video"]') video!: HTMLVideoElement;
    @query('[part~="progress-wrapper"]') progressWrapper!: HTMLDivElement;
    @query('[part~="progress-slider"]') progress!: PcSlider;
    @query('[part~="captions"]') captions!: PcButton;
    @query('[part~="settings-menu"]') settingsMenu!: PcDropdown;
    @query('[part~="full-screen"]') fullScreen!: PcButton;

    @state() private duration = 0;
    @state() private current = 0;
    @state() private volume = 1;
    @state() private playbackRate = 1;
    @state() private isPlaying = false;
    @state() private captionsOn = false;
    @state() private isMuted = false;
    @state() private bufferedEnd = 0;
    @state() private hasStarted = false;
    @state() private hideTimeoutID: number | null = null;
    @state() private lastMousePosition: {
        x: number;
        y: number;
    } | null = null;
    @state() private isHovered = false;
    @state() private isScrubbing = false;
    @state() private scrubTime: number | null = null;
    @state() private shouldRestoreFocusAfterStart = false;
    @state() private lastActiveCaptionTrackIndex = 0;
    @state() private activeCues: VTTCue[] = [];

    /** The source of the video. */
    @property() src = "";

    /** The placeholder image of the video if it hasn’t loaded yet. */
    @property() poster = "";

    /** Automatically plays the video without user interaction (i.e., pressing the play button). */
    @property({ type: Boolean, reflect: true }) autoplay = false;

    /** Mutes the video by default. */
    @property({ type: Boolean, reflect: true }) muted = false;

    /** Loops the video by default. */
    @property({ type: Boolean, reflect: true }) loop = false;

    /** Determines how much of the video is loaded before the user interacts with it. */
    @property() preload: "none" | "metadata" | "auto" = "metadata";

    /** Hides the video player controls. */
    @property({ attribute: "no-controls", type: Boolean, reflect: true })
    noControls = false;

    /** Provides a custom title to the video. */
    @property({ attribute: "data-title" }) dataTitle = "";

    private boundHandleDocumentFullscreenChange = () =>
        this.handleDocumentFullscreenChange();
    private boundHandleVideoKeyDown = (event: KeyboardEvent) =>
        this.handleVideoKeyDown(event);
    private boundHandlePointerEnter = () => {
        this.isHovered = true;
        this.toggleControlVisibility(true);
    };
    private boundHandlePointerLeave = () => {
        this.isHovered = false;
        this.toggleControlVisibility();
    };
    private boundHandlePointerMove = (event: PointerEvent) =>
        this.onUserInteraction(event);
    private boundHandleTextTrackAddTrack = (event: Event) => {
        const track = (event as any).track as TextTrack;

        track.addEventListener("cuechange", this.boundHandleTrackCueChange);

        const trackIndex = Array.from(
            this.video.querySelectorAll("track"),
        ).findIndex((htmlTrack) => htmlTrack.track === track);

        if (
            trackIndex === this.lastActiveCaptionTrackIndex &&
            this.captionsOn
        ) {
            track.mode = "hidden";
        }
    };
    private boundHandleTrackCueChange = () => this.updateCuePosition();

    private textTracksToCleanup: Array<{
        track: TextTrack;
        handler: () => void;
    }> = [];

    async firstUpdated() {
        if (this.poster) {
            this.video.poster = this.poster;
        }

        if (this.autoplay) {
            this.hasStarted = true;

            this.video.autoplay = this.autoplay;
        }

        this.video.setAttribute("playsinline", "");

        this.video.muted = this.muted;
        this.video.loop = this.loop;
        this.video.preload = this.preload;
        this.video.playbackRate = this.playbackRate;

        const trackElements = Array.from(this.querySelectorAll("track"));
        const sourceElements = Array.from(this.querySelectorAll("source"));

        [...sourceElements, ...trackElements].forEach((element) => {
            this.video.appendChild(element);
        });

        for (const track of trackElements) {
            const src = track.getAttribute("src");

            if (!src) {
                continue;
            }

            const response = await fetch(src);
            const text = await response.text();

            this.applyVTTStyles(text);
        }

        document.addEventListener(
            "fullscreenchange",
            this.boundHandleDocumentFullscreenChange,
        );

        this.video.textTracks.addEventListener(
            "addtrack",
            this.boundHandleTextTrackAddTrack,
        );

        this.addEventListener("keydown", this.boundHandleVideoKeyDown);

        this.addEventListener("pointerenter", this.boundHandlePointerEnter);
        this.addEventListener("pointerleave", this.boundHandlePointerLeave);
        this.addEventListener("pointermove", this.boundHandlePointerMove);

        this.toggleControlVisibility();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if (this.hideTimeoutID) {
            clearTimeout(this.hideTimeoutID);

            this.hideTimeoutID = null;
        }

        document.removeEventListener(
            "fullscreenchange",
            this.boundHandleDocumentFullscreenChange,
        );

        if (this.video?.textTracks) {
            this.video.textTracks.removeEventListener(
                "addtrack",
                this.boundHandleTextTrackAddTrack,
            );

            Array.from(this.video.textTracks).forEach((track) => {
                track.removeEventListener(
                    "cuechange",
                    this.boundHandleTrackCueChange,
                );
            });
        }

        this.removeEventListener("pointermove", this.boundHandlePointerMove);
        this.removeEventListener("pointerenter", this.boundHandlePointerEnter);
        this.removeEventListener("pointerleave", this.boundHandlePointerLeave);
        this.removeEventListener("keydown", this.boundHandleVideoKeyDown);

        this.textTracksToCleanup = [];
    }

    private formatTime(second: number) {
        if (!Number.isFinite(second)) {
            return "0:00";
        }

        second = Math.max(0, Math.floor(second));

        const h = Math.floor(second / 3600);
        const min = Math.floor((second % 3600) / 60);
        const s = second % 60;

        return h > 0
            ? `${h}:${String(min).padStart(2, "0")}:${String(s).padStart(2, "0")}`
            : `${min}:${String(s).padStart(2, "0")}`;
    }

    private extractVTTStyleBlock(vtt: string): string {
        const match = vtt.match(/STYLE([\s\S]*?)(\n\n|$)/);

        return match ? match[1].trim() : "";
    }

    private transformCueCSS(rawCSS: string): string {
        const transformedRules: string[] = [];

        const rules = rawCSS.split("}");

        for (const rule of rules) {
            const trimmedRule = rule.trim();

            if (!trimmedRule) {
                continue;
            }

            const parts = trimmedRule.split("{");

            if (parts.length !== 2) {
                transformedRules.push(trimmedRule + "}");

                continue;
            }

            let selector = parts[0].trim();

            const styleBody = parts[1].trim();

            selector = selector.replace(/(?:video|audio)?::cue/gi, "::cue");

            selector = selector.replace(
                /::cue\(v\[voice=['"]?([^'"]+?)['"]?\]\)/gi,
                (_, voice) => {
                    return `.caption-line [data-voice="${voice.trim()}"]`;
                },
            );

            selector = selector.replace(/::cue\(([^)]+)\)/gi, (_, inner) => {
                const cleanInner = inner.replace(/\\ /g, " ").trim();

                return `.caption-line ${cleanInner}`;
            });

            selector = selector.replace(/::cue/gi, ".caption-line");

            transformedRules.push(`${selector} { ${styleBody} }`);
        }

        return transformedRules.join("\n");
    }

    private handleSettingsSelect(event: CustomEvent) {
        const rawValue = event.detail.item.value as string;

        if (!rawValue) {
            return;
        }

        const [type, value] = rawValue.split(":");

        switch (type) {
            case "speed":
                const rate = Number(value);

                this.playbackRate = rate;
                this.video.playbackRate = rate;

                break;
            case "caption":
                const index = Number(value);

                if (index !== -1) {
                    this.captionsOn = true;
                }

                this.setCaptionTrack(index);
                this.syncARIAAttributes();

                break;
        }
    }

    private setCaptionTrack(index: number) {
        const tracks = Array.from(this.video?.textTracks || []);

        if (index !== -1) {
            this.lastActiveCaptionTrackIndex = index;
        }

        tracks.forEach((track, idx) => {
            if (idx === index) {
                track.mode = "showing";
                track.mode = "hidden";
            } else {
                track.mode = "disabled";
            }
        });

        this.captionsOn = index !== -1;
        this.updateCuePosition();
    }

    private handleCaptionsButtonClick() {
        if (this.captionsOn) {
            this.setCaptionTrack(-1);
        } else {
            this.setCaptionTrack(this.lastActiveCaptionTrackIndex);
        }

        this.syncARIAAttributes();
    }

    private applyVTTStyles(vtt: string) {
        const rawCSS = this.extractVTTStyleBlock(vtt);

        if (!rawCSS) {
            return;
        }

        const transformedCSS = this.transformCueCSS(rawCSS);

        if (
            this.renderRoot
                .querySelector(`style[data-vtt]`)
                ?.textContent?.includes(transformedCSS)
        ) {
            return;
        }

        const style = document.createElement("style");

        style.setAttribute("data-vtt", "");

        style.textContent = transformedCSS;

        this.renderRoot.appendChild(style);
    }

    private scheduleHideControls(delay = 3000) {
        if (this.hideTimeoutID) {
            clearTimeout(this.hideTimeoutID);
        }

        if (!document.fullscreenElement) {
            return;
        }

        this.hideTimeoutID = window.setTimeout(() => {
            const anyPopupOpen = Array.from(
                this.renderRoot.querySelectorAll<PcDropdown>("pc-dropdown"),
            ).some((dropdown) => dropdown.open);

            if (!anyPopupOpen && this.isPlaying) {
                this.classList.remove("controls-visible");
            } else if (!this.isPlaying) {
                this.scheduleHideControls(delay);
            }
        }, delay);
    }

    private onUserInteraction(event: PointerEvent) {
        this.lastMousePosition = { x: event.clientX, y: event.clientY };

        this.classList.add("controls-visible");

        if (this.hideTimeoutID) {
            clearTimeout(this.hideTimeoutID);

            this.hideTimeoutID = null;
        }

        if (document.fullscreenElement) {
            this.scheduleHideControls(3000);
        }
    }

    private updateCuePosition() {
        if (!this.video) {
            return;
        }

        const isNativeFullscreen = !!this.video.webkitDisplayingFullscreen;
        const tracks = Array.from(this.video.textTracks || []);
        const activeTrackIndex = tracks.findIndex(
            (track) => track.mode !== "disabled",
        );

        if (activeTrackIndex !== -1) {
            this.lastActiveCaptionTrackIndex = activeTrackIndex;
            this.captionsOn = true;
        }

        let newActiveCues: VTTCue[] = [];

        tracks.forEach((track, idx) => {
            const isTrackActive =
                this.captionsOn && idx === this.lastActiveCaptionTrackIndex;

            if (isTrackActive) {
                if (isNativeFullscreen) {
                    track.mode = "showing";
                } else {
                    track.mode = "hidden";

                    if (track.activeCues) {
                        newActiveCues.push(
                            ...(Array.from(track.activeCues) as VTTCue[]),
                        );
                    }
                }
            } else {
                track.mode = "disabled";
            }
        });

        const hasChanged =
            newActiveCues.length !== this.activeCues.length ||
            newActiveCues.some(
                (cue, index) =>
                    cue.text !== this.activeCues[index]?.text ||
                    cue.startTime !== this.activeCues[index]?.startTime,
            );

        if (hasChanged) {
            this.activeCues = [...newActiveCues];
        }
    }

    private getCurrentCaptionTrackLabel() {
        const tracks = Array.from(this.video?.textTracks || []);

        if (!this.captionsOn) {
            return this.localize.term("off");
        }

        const track = tracks[this.lastActiveCaptionTrackIndex];

        if (!track) {
            return this.localize.term("off");
        }

        return (
            track.label ||
            (track.language
                ? track.language.toUpperCase()
                : this.localize.term(
                      "track",
                      this.lastActiveCaptionTrackIndex + 1,
                  ))
        );
    }

    private toggleControlVisibility(force?: boolean) {
        const anyPopupOpen = Array.from(
            this.renderRoot.querySelectorAll<PcDropdown>("pc-dropdown"),
        ).some((dropdown) => dropdown.open);

        const isHoverable = window.matchMedia(
            "(hover: hover), (hover: on-demand)",
        ).matches;

        const hasFocusInside = this.hasFocusedItem();

        let shouldBeVisible: boolean;

        if (typeof force === "boolean") {
            shouldBeVisible = force;
        } else if (!isHoverable) {
            shouldBeVisible = true;
        } else {
            shouldBeVisible = this.isHovered || anyPopupOpen || hasFocusInside;
        }

        this.classList.toggle("controls-visible", shouldBeVisible);

        this.updateCuePosition();
    }

    private hasFocusedItem() {
        const activeElement = document.activeElement;

        if (activeElement === this || this.contains(activeElement)) {
            return true;
        }

        return Boolean(this.shadowRoot?.activeElement);
    }

    private noTextTracks() {
        const list = this.video?.textTracks;

        return !list || list.length === 0;
    }

    private updateCaptionsState() {
        const list = this.video?.textTracks;

        if (!list) {
            this.captionsOn = false;

            return;
        }

        const tracks = Array.from(list);
        const trackElements = Array.from(this.querySelectorAll("track"));

        const defaultTrackIndex = tracks.findIndex((_track, index) => {
            const trackElement = trackElements[index];

            return trackElement?.hasAttribute("default");
        });

        const showingTrackIndex = tracks.findIndex(
            (track) => track.mode === "showing",
        );

        const activeTrackIndex =
            defaultTrackIndex !== -1 ? defaultTrackIndex : showingTrackIndex;

        if (activeTrackIndex !== -1) {
            this.lastActiveCaptionTrackIndex = activeTrackIndex;
            this.captionsOn = true;
        } else {
            this.captionsOn = false;
        }

        this.updateCuePosition();
        this.syncARIAAttributes();
    }

    private handleDocumentFullscreenChange() {
        const isFullScreen = !!document.fullscreenElement;
        const icon = this.fullScreen?.querySelector("pc-icon");

        if (!icon) {
            return;
        }

        icon.name = isFullScreen ? "compress" : "expand";
        icon.label = this.localize.term(
            isFullScreen ? "exitFullScreen" : "enterFullScreen",
        );

        this.settingsMenu.shadowRoot
            ?.querySelector("pc-popup")
            ?.updateStackingContext();
    }

    private handleFrameClick(event: MouseEvent) {
        const isClickOnControls = event
            .composedPath()
            .some((target) =>
                (target as Element).classList?.contains("controls"),
            );

        if (!isClickOnControls && !this.isScrubbing) {
            this.toggle();
        }
    }

    private handleVideoPlaying() {
        this.hasStarted = true;
        this.isPlaying = true;

        if (document.fullscreenElement && this.video.readyState >= 2) {
            this.scheduleHideControls(3000);
        }

        this.requestUpdate();
    }

    private handleVideoPause() {
        this.isPlaying = false;

        this.toggleControlVisibility();
        this.requestUpdate();
    }

    private handleVideoProgress() {
        let end = 0;

        for (let i = 0; i < this.video.buffered.length; i++) {
            end = Math.max(end, this.video.buffered.end(i));
        }

        this.bufferedEnd = end;
    }

    private handleVideoWaiting() {
        this.isPlaying = false;
        this.toggleControlVisibility(true);
    }

    private handleVideoVolumeChange() {
        this.volume = this.video.volume;
        this.isMuted = this.video.muted || this.video.volume === 0;
    }

    private handleVideoRateChange() {
        this.playbackRate = this.video.playbackRate;
    }

    private handleVideoKeyDown(event: KeyboardEvent) {
        const composedPath = event.composedPath() as HTMLElement[];
        const isInteractingWithControls = composedPath.some(
            (element) =>
                element.tagName?.toLowerCase().includes("pc-dropdown") ||
                element.tagName?.toLowerCase().includes("pc-slider") ||
                element.tagName?.toLowerCase() === "input",
        );

        if (isInteractingWithControls) {
            return;
        }

        const key = event.key.toLowerCase();

        switch (key) {
            case " ":
            case "k":
                event.preventDefault();
                this.toggle();
                break;
            case "m":
                this.video.muted = !this.video.muted;
                break;
            case "arrowright":
                this.video.currentTime = Math.min(
                    this.video.currentTime + 5,
                    this.video.duration || Infinity,
                );
                break;
            case "arrowleft":
                this.video.currentTime = Math.max(
                    this.video.currentTime - 5,
                    0,
                );
                break;
            case "arrowup":
                this.video.volume = Math.min(this.video.volume + 0.05, 1);
                break;
            case "arrowdown":
                this.video.volume = Math.max(this.video.volume - 0.05, 0);
                break;
            case "f":
                this.handleFullscreenClick();
                break;
            case "c":
                this.handleCaptionsButtonClick();
                break;
            case "p":
                this.handlePictureInPictureClick();
                break;
        }
    }

    private handleVideoLoadedData() {
        if (this.duration === 0) {
            this.duration = this.video.duration || 0;
        }

        this.updateCaptionsState();
    }

    private handleVideoLoadedMetadata() {
        this.duration = this.video.duration || 0;
        this.current = this.video.currentTime || 0;
        this.volume = this.video.volume;

        this.handleVideoProgress();
        this.updateCaptionsState();

        Array.from(this.video.textTracks || []).forEach((track) => {
            track.removeEventListener(
                "cuechange",
                this.boundHandleTrackCueChange,
            );
            track.addEventListener("cuechange", this.boundHandleTrackCueChange);
        });

        this.updateCuePosition();
    }

    private handleVideoTimeUpdate() {
        if (!this.isScrubbing) {
            this.current = this.video.currentTime || 0;
        }

        if (this.duration === 0 && this.video.duration > 0) {
            this.duration = this.video.duration;
        }

        this.updateCuePosition();
    }

    private handleVideoWebKitEndFullscreen() {
        this.playbackRate = this.video.playbackRate;
        this.updateCaptionsState();
    }

    private async handlePictureInPictureClick() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await this.video.requestPictureInPicture();
            }
        } catch {}
    }

    private handleFullscreenClick() {
        const isiPhone = /iPhone|iPod/.test(navigator.userAgent);

        const isCurrentlyFullScreen = !!(
            document.fullscreenElement || this.video.webkitDisplayingFullscreen
        );

        if (!isCurrentlyFullScreen) {
            if (isiPhone && this.video.webkitEnterFullscreen) {
                this.video.webkitEnterFullscreen();
            } else if (this.requestFullscreen) {
                this.requestFullscreen().catch(() => {
                    if (this.video.webkitEnterFullscreen) {
                        this.video.webkitEnterFullscreen();
                    }
                });
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (this.video.webkitExitFullscreen) {
                this.video.webkitExitFullscreen();
            }
        }
    }

    private parseVTT(rawText: string): string[] {
        let escapedText = rawText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const lines = escapedText.split(/\r?\n/);
        const result: string[] = [];

        let openTagsStack: Array<{ html: string; tag: string }> = [];

        for (let line of lines) {
            if (line.trim().length === 0) {
                continue;
            }

            let processedLine = openTagsStack
                .map((stack) => stack.html)
                .join("");

            const tagRegEx =
                /&lt;(\/)?([a-z0-9]+)(?:\.([a-z0-9.]+))?(?:\s+([^&>]+))?&gt;/gi;

            line = line.replace(
                tagRegEx,
                (_match, isClosing, tagName, classString, annotation) => {
                    const lowerTag = tagName.toLowerCase();

                    const classes = classString
                        ? classString.split(".").filter(Boolean).join(" ")
                        : "";

                    if (isClosing) {
                        for (let i = openTagsStack.length - 1; i >= 0; i--) {
                            if (openTagsStack[i].tag === lowerTag) {
                                openTagsStack.splice(i, 1);

                                break;
                            }
                        }

                        return ["b", "i", "u", "ruby", "rt"].includes(lowerTag)
                            ? `</${lowerTag}>`
                            : `</span>`;
                    } else {
                        const isVoice = lowerTag === "v";

                        const voiceName = isVoice
                            ? (annotation || "").trim()
                            : "";

                        const classAttribute = classes.trim()
                            ? ` class="${classes.trim()}"`
                            : "";

                        const voiceAttribute = voiceName
                            ? ` data-voice="${voiceName}"`
                            : "";

                        const langAttribute =
                            lowerTag === "lang" && annotation
                                ? ` lang="${annotation.trim()}"`
                                : "";

                        const htmlTag = ["b", "i", "u", "ruby", "rt"].includes(
                            lowerTag,
                        )
                            ? lowerTag
                            : "span";

                        const openingHTML = `<${htmlTag}${classAttribute}${voiceAttribute}${langAttribute}>`;

                        openTagsStack.push({
                            html: openingHTML,
                            tag: lowerTag,
                        });

                        return openingHTML;
                    }
                },
            );

            processedLine += line;

            const closingTags = [...openTagsStack]
                .reverse()
                .map((stack) => {
                    return ["b", "i", "u", "ruby", "rt"].includes(stack.tag)
                        ? `</${stack.tag}>`
                        : `</span>`;
                })
                .join("");

            result.push(processedLine + closingTags);
        }

        return result;
    }

    /**
     * Returns a CSS `translate` fragment for the block axis to implement `lineAlign`.
     * The inline‐axis `translate` (for `positionAlign`) is handled separately and
     * concatenated onto the same `transform` property.
     *
     * `lineAlign` spec values: `"start" | "center" | "end"`
     *
     * - start → `top` (horizontal) or `left`/`right` edge (vertical) aligns to the line: No offset.
     * - center → Cue box centred on the line: `-50%` on the block axis.
     * - end → `bottom` (horizontal) or opposite edge (vertical) aligns: `-100%` on the block axis.
     *
     * @param {string} lineAlign
     * @param {boolean} isVertical
     * @param {boolean} isNegative - Whether the line number is negative (from end).
     */
    private getLineAlignTransform(
        lineAlign: string,
        isVertical: boolean,
        isNegative: boolean,
    ) {
        const align = lineAlign || "start";

        let blockOffset;

        if (align === "center") {
            blockOffset = "-50%";
        } else if (align === "end") {
            blockOffset = isNegative ? "0%" : "-100%";
        } else {
            blockOffset = isNegative ? "-100%" : "0%";
        }

        return isVertical
            ? `translateX(${blockOffset})`
            : `translateY(${blockOffset})`;
    }

    private onScrubEnd(value: number) {
        if (!this.isScrubbing) {
            return;
        }

        if (Number.isFinite(value)) {
            this.video.currentTime = value;
        }

        this.video.addEventListener("seeked", () => this.onSeeked(), {
            once: true,
        });
    }

    private onSeeked() {
        this.current = this.video.currentTime || 0;
        this.isScrubbing = false;
        this.scrubTime = null;

        if (this.isPlaying) {
            this.handleVideoPlaying();
        }
    }

    private syncARIAAttributes() {
        if (!this.captions) {
            return;
        }

        const button = this.captions.shadowRoot?.querySelector("button");

        if (button) {
            this.captions.classList.toggle("pressed", this.captionsOn);

            button.setAttribute(
                "aria-pressed",
                this.captionsOn ? "true" : "false",
            );
        }
    }

    async updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        if (changedProperties.has("hasStarted") && this.hasStarted) {
            this.syncARIAAttributes();
        }
    }

    /** Plays the video. */
    async play() {
        this.hasStarted = true;

        await this.updateComplete;

        if (this.shouldRestoreFocusAfterStart) {
            if (!this.noControls) {
                this.frame?.focus();
            } else {
                this.video?.focus();
            }

            this.shouldRestoreFocusAfterStart = false;
        }

        try {
            if (this.video) {
                // Check if the video is ready
                if (this.video.readyState >= 2) {
                    // 2 = HAVE_CURRENT_DATA
                    await this.video.play();
                    this.dispatchEvent(new PcPlayEvent());
                } else {
                    // Wait for the video to be ready before playing
                    this.video.addEventListener(
                        "canplay",
                        () => {
                            this.video
                                .play()
                                .then(() =>
                                    this.dispatchEvent(new PcPlayEvent()),
                                )
                                .catch((error) =>
                                    console.error(
                                        "Play failed after canplay:",
                                        error,
                                    ),
                                );
                        },
                        { once: true },
                    );

                    // Optional: Force a load if it hasn't started
                    this.video.load();
                }
            }
        } catch (error) {
            if (!(error instanceof Error) || error.name !== "AbortError") {
                console.error("Play error:", error);
            }
        }
    }

    /** Pauses the video. */
    pause() {
        this.video.pause();

        this.dispatchEvent(new PcPauseEvent());
    }

    /** Toggles the state of the video between play and pause. */
    async toggle() {
        if (!this.video) {
            return;
        }

        if (this.video.paused) {
            await this.play();
        } else {
            this.pause();
        }
    }

    render() {
        const duration = this.formatTime(this.duration);
        const currentTime = this.formatTime(this.current);
        const pipSupported = document.pictureInPictureEnabled;
        const bufferedPercentage =
            this.duration > 0 ? (this.bufferedEnd / this.duration) * 100 : 0;
        const currentPlaybackTime =
            this.isScrubbing && this.scrubTime != null
                ? this.scrubTime
                : this.current;
        const volumeState =
            this.isMuted || this.volume === 0
                ? "mute"
                : this.volume > 0.5
                  ? "high"
                  : "low";

        return html`
            <div
                class="frame pc-dark"
                part="frame"
                aria-label=${this.localize.term("videoPlayer")}
                tabindex="-1"
                @click=${this.handleFrameClick}
            >
                ${!this.hasStarted
                    ? html`
                          <div
                              class="initial-overlay"
                              part="initial-overlay"
                              @click=${(event: PointerEvent) => {
                                  event.stopPropagation();

                                  this.shouldRestoreFocusAfterStart = true;
                                  this.toggle();
                              }}
                          >
                              <pc-button
                                  class="initial-play"
                                  part="initial-play"
                                  variant="filled"
                                  size="large"
                                  exportparts="
                                      base:initial-play-base,
                                      label:initial-play-label
                                  "
                              >
                                  <pc-icon
                                      part="initial-play-icon"
                                      library="system"
                                      icon-style="solid"
                                      name="play"
                                      label=${this.localize.term("play")}
                                      exportparts="svg:initial-play-icon-svg"
                                  ></pc-icon>
                              </pc-button>
                          </div>
                      `
                    : ""}
                ${this.dataTitle && this.hasStarted
                    ? html`
                          <div class="title" part="title">
                              ${this.dataTitle}
                          </div>
                      `
                    : ""}

                <video
                    part="video"
                    .src=${this.src}
                    crossorigin="anonymous"
                    tabindex=${this.hasStarted && this.noControls ? "0" : "-1"}
                    @playing=${this.handleVideoPlaying}
                    @pause=${this.handleVideoPause}
                    @progress=${this.handleVideoProgress}
                    @waiting=${this.handleVideoWaiting}
                    @volumechange=${this.handleVideoVolumeChange}
                    @ratechange=${this.handleVideoRateChange}
                    @keydown=${this.handleVideoKeyDown}
                    @loadeddata=${this.handleVideoLoadedData}
                    @loadedmetadata=${this.handleVideoLoadedMetadata}
                    @timeupdate=${this.handleVideoTimeUpdate}
                    @webkitbeginfullscreen=${this.updateCaptionsState}
                    @webkitendfullscreen=${this.handleVideoWebKitEndFullscreen}
                >
                    <slot></slot>
                </video>

                ${this.hasStarted
                    ? html`
                          <div
                              class="captions-container"
                              part="captions-container"
                              role="status"
                              aria-live="polite"
                          >
                              ${this.activeCues.map((cue) => {
                                  const lines = this.parseVTT(cue.text);
                                  const align = cue.align || "center";

                                  const isVertical =
                                      cue.vertical === "lr" ||
                                      cue.vertical === "rl";
                                  const isGrowingLeft = cue.vertical === "rl";
                                  const isGrowingRight = cue.vertical === "lr";

                                  const writingMode = isGrowingLeft
                                      ? "vertical-rl"
                                      : isGrowingRight
                                        ? "vertical-lr"
                                        : "horizontal-tb";

                                  let positionAlign = cue.positionAlign;

                                  if (
                                      !positionAlign ||
                                      positionAlign === "auto"
                                  ) {
                                      if (
                                          align === "start" ||
                                          align === "left"
                                      ) {
                                          positionAlign = "line-left";
                                      } else if (
                                          align === "end" ||
                                          align === "right"
                                      ) {
                                          positionAlign = "line-right";
                                      } else {
                                          positionAlign = "center";
                                      }
                                  }

                                  const rawPosition =
                                      cue.position === "auto"
                                          ? "auto"
                                          : String(cue.position).trim();
                                  const parsedPosition = Number(
                                      rawPosition.replace("%", ""),
                                  );

                                  let position =
                                      rawPosition === "auto" ||
                                      Number.isNaN(parsedPosition)
                                          ? positionAlign === "line-left"
                                              ? 0
                                              : positionAlign === "line-right"
                                                ? 100
                                                : 50
                                          : Math.min(
                                                100,
                                                Math.max(0, parsedPosition),
                                            );

                                  const inlineAxisProperty = isVertical
                                      ? "top"
                                      : "left";
                                  const sizeProperty = isVertical
                                      ? "height"
                                      : "width";
                                  const sizeValue =
                                      cue.size != null
                                          ? `${cue.size}%`
                                          : "100%";

                                  let anchor = "-50%";

                                  if (positionAlign === "line-left") {
                                      anchor = "0%";
                                  }

                                  if (positionAlign === "line-right") {
                                      anchor = "-100%";
                                  }

                                  const transformProperty = isVertical
                                      ? `translateY(${anchor})`
                                      : `translateX(${anchor})`;

                                  const alignItems =
                                      align === "start" || align === "left"
                                          ? "flex-start"
                                          : align === "end" || align === "right"
                                            ? "flex-end"
                                            : "center";

                                  const rawLine =
                                      typeof cue.line === "string"
                                          ? cue.line.trim()
                                          : String(cue.line);
                                  const isLinePercentage =
                                      rawLine.endsWith("%");
                                  const lineNumber = Number(
                                      isLinePercentage
                                          ? rawLine.slice(0, -1)
                                          : rawLine,
                                  );

                                  let blockStyle = "";

                                  if (cue.line === "auto") {
                                      if (isVertical) {
                                          blockStyle = isGrowingLeft
                                              ? "right: var(--control-offset);"
                                              : "left: var(--control-offset);";
                                      } else {
                                          blockStyle =
                                              "bottom: var(--control-offset);";
                                      }
                                  } else if (!cue.snapToLines) {
                                      const percentage = Number.isNaN(
                                          lineNumber,
                                      )
                                          ? 0
                                          : `${lineNumber}%`;

                                      if (isVertical) {
                                          blockStyle = isGrowingLeft
                                              ? `right: ${percentage};`
                                              : `left: ${percentage};`;
                                      } else {
                                          blockStyle = `top: ${percentage};`;
                                      }
                                  } else {
                                      if (Number.isNaN(lineNumber)) {
                                          blockStyle =
                                              "bottom: var(--control-offset);";
                                      } else if (lineNumber < 0) {
                                          const distance = Math.abs(lineNumber);

                                          const lineAlignTransform =
                                              this.getLineAlignTransform(
                                                  cue.lineAlign,
                                                  isVertical,
                                                  true,
                                              );

                                          if (isVertical) {
                                              blockStyle = isGrowingLeft
                                                  ? `
                                                        right: calc(var(--control-offset) + ${distance} * 1lh);
                                                        transform: ${transformProperty} ${lineAlignTransform};
                                                    `
                                                  : `
                                                        left: calc(var(--control-offset) + ${distance} * 1lh);
                                                        transform: ${transformProperty} ${lineAlignTransform};
                                                    `;
                                          } else {
                                              blockStyle = `
                                                  bottom: calc(var(--control-offset) + ${distance} * 1lh);
                                                  transform: ${transformProperty} ${lineAlignTransform};
                                              `;
                                          }
                                      } else {
                                          const distance = lineNumber;
                                          const lineAlignTransform =
                                              this.getLineAlignTransform(
                                                  cue.lineAlign,
                                                  isVertical,
                                                  false,
                                              );

                                          if (isVertical) {
                                              blockStyle = isGrowingLeft
                                                  ? `
                                                        right: calc(${distance} * 1lh);
                                                        transform: ${transformProperty} ${lineAlignTransform};
                                                    `
                                                  : `
                                                        left: calc(${distance} * 1lh);
                                                        transform: ${transformProperty} ${lineAlignTransform};
                                                    `;
                                          } else {
                                              blockStyle = `
                                                  top: calc(${distance} * 1lh);
                                                  transform: ${transformProperty} ${lineAlignTransform};
                                              `;
                                          }
                                      }
                                  }

                                  const finalTransform = blockStyle.includes(
                                      "transform:",
                                  )
                                      ? ""
                                      : `transform: ${transformProperty};`;

                                  return html`
                                      <div
                                          class="caption-cue"
                                          part="caption-cue"
                                          style="
                                              display: flex;
                                              position: absolute;
                                              align-items: ${alignItems};
                                              flex-direction: column;
                                              writing-mode: ${writingMode};
                                              ${inlineAxisProperty}: ${position}%;
                                              ${blockStyle}
                                              ${sizeProperty}: ${sizeValue};
                                              ${finalTransform}
                                              text-align: ${align};
                                          "
                                      >
                                          ${lines.map(
                                              (line) => html`
                                                  <div
                                                      class="caption-line-container"
                                                      part="caption-line-container"
                                                  >
                                                      <span
                                                          class="caption-line"
                                                          part="caption-line"
                                                      >
                                                          ${unsafeHTML(line)}
                                                      </span>
                                                  </div>
                                              `,
                                          )}
                                      </div>
                                  `;
                              })}
                          </div>

                          <div class="bar" part="progress-bar">
                              <div
                                  class="progress-wrapper"
                                  part="progress-wrapper"
                              >
                                  <div
                                      class="buffered"
                                      part="progress-buffer"
                                      role="progressbar"
                                      style="inline-size: ${bufferedPercentage}%"
                                      aria-valuemin="0"
                                      aria-valuenow=${Math.round(
                                          bufferedPercentage,
                                      )}
                                      aria-valuemax="100"
                                      aria-hidden="true"
                                  ></div>
                                  <pc-slider
                                      class="progress"
                                      part="progress-slider"
                                      min="0"
                                      .max=${this.duration}
                                      .value=${currentPlaybackTime}
                                      .valueFormatter=${this.formatTime}
                                      label=${this.localize.term("seek")}
                                      has-tooltip
                                      @input=${(event: Event) => {
                                          const value = (
                                              event.target as PcSlider
                                          ).value;

                                          this.isScrubbing = true;
                                          this.scrubTime = value;
                                      }}
                                      @change=${(event: Event) =>
                                          this.onScrubEnd(
                                              (event.target as PcSlider).value,
                                          )}
                                      exportparts="
                                          slider:progress-slider-slider,
                                          track:progress-slider-track,
                                          indicator:progress-slider-indicator,
                                          thumb:progress-slider-thumb,
                                          tooltip:progress-slider-tooltip,
                                          tooltip-tooltip:progress-slider-tooltip-tooltip,
                                          tooltip-content:progress-slider-tooltip-content,
                                          tooltip-arrow:progress-slider-tooltip-arrow
                                      "
                                  ></pc-slider>
                              </div>
                          </div>

                          <nav
                              class="controls"
                              part="controls"
                              aria-label=${this.localize.term("controls")}
                          >
                              <pc-button
                                  class="play"
                                  part="play"
                                  variant="filled"
                                  @click=${this.toggle}
                                  exportparts="
                                      base:play-base,
                                      label:play-label
                                  "
                              >
                                  <pc-icon
                                      part="play-icon"
                                      library="system"
                                      icon-style="solid"
                                      name=${this.isPlaying ? "pause" : "play"}
                                      label=${this.isPlaying
                                          ? this.localize.term("pause")
                                          : this.localize.term("play")}
                                      exportparts="svg:play-icon-svg"
                                  ></pc-icon>
                              </pc-button>

                              <div class="mute-container" part="mute-container">
                                  <pc-button
                                      class="mute"
                                      part="mute"
                                      size="small"
                                      variant="filled"
                                      @click=${() =>
                                          (this.video.muted =
                                              !this.video.muted)}
                                      exportparts="
                                          base:mute-base,
                                          label:mute-label
                                      "
                                  >
                                      <svg
                                          part="mute-icon"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          data-state=${volumeState}
                                          aria-label=${this.isMuted
                                              ? this.localize.term("mute")
                                              : this.localize.term("unmute")}
                                      >
                                          <path
                                              d="M8.72266 3.95215C9.05482 3.73088 9.49974 3.96909 9.5 4.36816V15.2588C9.5 15.6447 9.08137 15.8849 8.74805 15.6904L4.25195 13.0684L4.24414 13.0635L4.2373 13.0596L4.01562 12.9307C1.80255 11.5315 1.87668 8.21153 4.2373 6.94043L4.25781 6.92871L4.27734 6.91602L8.72266 3.95215Z"
                                              fill="currentColor"
                                              stroke="currentColor"
                                          />
                                          <path
                                              class="mute-x"
                                              d="M11.5239 8.71798C11.1695 8.36358 11.1695 7.78898 11.5239 7.43458C11.8783 7.08018 12.4529 7.08018 12.8073 7.43458L16.6606 11.2879C17.015 11.6423 17.015 12.2169 16.6606 12.5713C16.3062 12.9257 15.7316 12.9257 15.3772 12.5713L11.5239 8.71798Z"
                                              fill="currentColor"
                                          />
                                          <path
                                              class="mute-x"
                                              d="M15.3772 7.43459C15.7316 7.08018 16.3062 7.08018 16.6606 7.43458C17.015 7.78899 17.015 8.36358 16.6606 8.71798L12.8073 12.5713C12.4529 12.9257 11.8783 12.9257 11.5239 12.5713C11.1695 12.2169 11.1695 11.6423 11.5239 11.2879L15.3772 7.43459Z"
                                              fill="currentColor"
                                          />
                                          <path
                                              class="wave-1"
                                              d="M12.5 7L12.7387 7.23866C14.2215 8.72149 14.111 11.1575 12.5 12.5"
                                              stroke="currentColor"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                          />
                                          <path
                                              class="wave-2"
                                              d="M14.5 5.5C16.7812 8.06635 16.7812 11.9337 14.5 14.5"
                                              stroke="currentColor"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                          />
                                      </svg>
                                  </pc-button>

                                  <pc-slider
                                      class="volume"
                                      part="volume-slider"
                                      min="0"
                                      max="1"
                                      step="0.01"
                                      .value=${this.volume}
                                      label=${this.localize.term("volume")}
                                      @click=${(event: Event) =>
                                          event.stopPropagation()}
                                      @input=${(event: Event) => {
                                          const video = Number(
                                              (event.target as HTMLInputElement)
                                                  .value,
                                          );

                                          this.video.volume = video;
                                          this.video.muted = video === 0;
                                      }}
                                      @pointerdown=${(event: PointerEvent) =>
                                          event.stopPropagation()}
                                      exportparts="
                                          slider:volume-slider-slider,
                                          track:volume-slider-track,
                                          indicator:volume-slider-indicator,
                                          thumb:volume-slider-thumb,
                                          tooltip:volume-slider-tooltip,
                                          tooltip-tooltip:volume-slider-tooltip-tooltip,
                                          tooltip-content:volume-slider-tooltip-content,
                                          tooltip-arrow:volume-slider-tooltip-arrow
                                      "
                                  ></pc-slider>
                              </div>

                              <div class="time-container" part="time-container">
                                  ${currentTime} / ${duration}
                              </div>

                              <div class="spacer"></div>

                              <pc-button-group part="controls-group">
                                  <pc-button
                                      class="captions"
                                      part="captions"
                                      size="small"
                                      variant="filled"
                                      ?hidden=${this.noTextTracks()}
                                      @click=${this.handleCaptionsButtonClick}
                                      exportparts="
                                          base:captions-base,
                                          label:captions-label
                                      "
                                  >
                                      <pc-icon
                                          part="captions-icon"
                                          library="system"
                                          icon-style="solid"
                                          name="closed-captioning"
                                          label=${this.localize.term(
                                              "captions",
                                          )}
                                          exportparts="svg:captions-icon-svg"
                                      ></pc-icon>
                                  </pc-button>

                                  <pc-dropdown
                                      part="settings-menu"
                                      placement="top-end"
                                      @pc-select=${this.handleSettingsSelect}
                                      @pc-show=${() =>
                                          this.toggleControlVisibility(true)}
                                      @pc-hide=${this.toggleControlVisibility}
                                      exportparts="
                                          base:settings-menu-base,
                                          menu:settings-menu-menu
                                      "
                                  >
                                      <pc-button
                                          class="settings-button"
                                          part="settings-button"
                                          size="small"
                                          variant="filled"
                                          slot="trigger"
                                          exportparts="
                                              base:settings-button-base,
                                              label:settings-button-label
                                          "
                                      >
                                          <pc-icon
                                              part="settings-button-icon"
                                              library="system"
                                              icon-style="solid"
                                              name="gear"
                                              label=${this.localize.term(
                                                  "settings",
                                              )}
                                              exportparts="svg:settings-button-icon-svg"
                                          ></pc-icon>
                                      </pc-button>

                                      <pc-dropdown-item
                                          part="settings-menu-item"
                                          exportparts="
                                              checkmark:settings-menu-item-checkmark,
                                              checkmark-svg:settings-menu-item-checkmark-svg,
                                              icon:settings-menu-item-icon,
                                              label:settings-menu-item-label,
                                              details:settings-menu-item-details,
                                              submenu-icon:settings-menu-item-submenu-icon,
                                              submenu-icon-svg:settings-menu-item-submenu-icon-svg,
                                              submenu:settings-menu-item-submenu
                                          "
                                      >
                                          <pc-icon
                                              library="system"
                                              icon-style="solid"
                                              name="gauge-high"
                                              slot="icon"
                                          ></pc-icon>
                                          ${this.localize.term("playbackSpeed")}
                                          <span slot="details">
                                              ${this.playbackRate}×
                                          </span>
                                          ${[
                                              0.25, 0.5, 0.75, 1, 1.25, 1.5, 2,
                                          ].map(
                                              (rate) => html`
                                                  <pc-dropdown-item
                                                      part="settings-menu-item"
                                                      type="radio"
                                                      value="speed:${rate}"
                                                      slot="submenu"
                                                      ?checked=${rate ===
                                                      this.playbackRate}
                                                      exportparts="
                                                          checkmark:settings-menu-item-checkmark,
                                                          checkmark-svg:settings-menu-item-checkmark-svg,
                                                          icon:settings-menu-item-icon,
                                                          label:settings-menu-item-label,
                                                          details:settings-menu-item-details,
                                                          submenu-icon:settings-menu-item-submenu-icon,
                                                          submenu-icon-svg:settings-menu-item-submenu-icon-svg,
                                                          submenu:settings-menu-item-submenu
                                                      "
                                                  >
                                                      ${rate}×
                                                  </pc-dropdown-item>
                                              `,
                                          )}
                                      </pc-dropdown-item>
                                      <pc-dropdown-item
                                          part="settings-menu-item"
                                          ?hidden=${this.noTextTracks()}
                                          exportparts="
                                              checkmark:settings-menu-item-checkmark,
                                              checkmark-svg:settings-menu-item-checkmark-svg,
                                              icon:settings-menu-item-icon,
                                              label:settings-menu-item-label,
                                              details:settings-menu-item-details,
                                              submenu-icon:settings-menu-item-submenu-icon,
                                              submenu-icon-svg:settings-menu-item-submenu-icon-svg,
                                              submenu:settings-menu-item-submenu
                                          "
                                      >
                                          <pc-icon
                                              library="system"
                                              icon-style="solid"
                                              name="closed-captioning"
                                              slot="icon"
                                          ></pc-icon>
                                          ${this.localize.term("captions")}
                                          <span slot="details">
                                              ${this.getCurrentCaptionTrackLabel()}
                                          </span>

                                          <pc-dropdown-item
                                              part="settings-menu-item"
                                              type="radio"
                                              value="caption:-1"
                                              ?checked=${!this.captionsOn}
                                              slot="submenu"
                                              exportparts="
                                                  checkmark:settings-menu-item-checkmark,
                                                  checkmark-svg:settings-menu-item-checkmark-svg,
                                                  icon:settings-menu-item-icon,
                                                  label:settings-menu-item-label,
                                                  details:settings-menu-item-details,
                                                  submenu-icon:settings-menu-item-submenu-icon,
                                                  submenu-icon-svg:settings-menu-item-submenu-icon-svg,
                                                  submenu:settings-menu-item-submenu
                                              "
                                          >
                                              ${this.localize.term("off")}
                                          </pc-dropdown-item>
                                          ${Array.from(
                                              this.video?.textTracks || [],
                                          ).map(
                                              (track, index) => html`
                                                  <pc-dropdown-item
                                                      part="settings-menu-item"
                                                      type="radio"
                                                      value="caption:${index}"
                                                      ?checked=${this
                                                          .captionsOn &&
                                                      index ===
                                                          this
                                                              .lastActiveCaptionTrackIndex}
                                                      slot="submenu"
                                                      exportparts="
                                                          checkmark:settings-menu-item-checkmark,
                                                          checkmark-svg:settings-menu-item-checkmark-svg,
                                                          icon:settings-menu-item-icon,
                                                          label:settings-menu-item-label,
                                                          details:settings-menu-item-details,
                                                          submenu-icon:settings-menu-item-submenu-icon,
                                                          submenu-icon-svg:settings-menu-item-submenu-icon-svg,
                                                          submenu:settings-menu-item-submenu
                                                      "
                                                  >
                                                      ${track.label ||
                                                      this.localize.term(
                                                          "track",
                                                          index + 1,
                                                      )}
                                                  </pc-dropdown-item>
                                              `,
                                          )}
                                      </pc-dropdown-item>
                                  </pc-dropdown>

                                  <pc-button
                                      class="picture-in-picture"
                                      part="picture-in-picture"
                                      size="small"
                                      variant="filled"
                                      ?hidden=${!pipSupported}
                                      @click=${this.handlePictureInPictureClick}
                                      exportparts="
                                          base:picture-in-picture-base,
                                          label:picture-in-picture-label
                                      "
                                  >
                                      <pc-icon
                                          part="picture-in-picture-icon"
                                          library="system"
                                          icon-style="solid"
                                          name="picture-in-picture"
                                          label=${this.localize.term(
                                              "pictureInPicture",
                                          )}
                                          exportparts="svg:picture-in-picture-icon-svg"
                                      ></pc-icon>
                                  </pc-button>
                                  <pc-button
                                      class="full-screen"
                                      part="full-screen"
                                      size="small"
                                      variant="filled"
                                      @click=${this.handleFullscreenClick}
                                      exportparts="
                                          base:full-screen-base,
                                          label:full-screen-label
                                      "
                                  >
                                      <pc-icon
                                          part="full-screen-icon"
                                          library="system"
                                          icon-style="solid"
                                          name="expand"
                                          label=${this.localize.term(
                                              "enterFullScreen",
                                          )}
                                          exportparts="svg:full-screen-icon-svg"
                                      ></pc-icon>
                                  </pc-button>
                              </pc-button-group>
                          </nav>
                      `
                    : ""}
            </div>
        `;
    }
}
