import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { PlacerElement } from "../../internal/placer-element.js";
import styles from "./video-player.css";
import { PcButton } from "../button/button.js";
import { PcPopup } from "../popup/popup.js";
import "../dropdown-item/dropdown-item.js";
import "../icon/icon.js";
import "../tooltip/tooltip.js";
import type { PcSlider } from "../slider/slider.js";

/**
 * @summary Video players present visual media and provide controls for playback.
 * @status experimental
 * @since 1.0.0-alpha.5
 *
 * @dependency pc-button
 * @dependency pc-dropdown
 * @dependency pc-dropdown-item
 * @dependency pc-icon
 * @dependency pc-tooltip
 *
 * @slot - The default slot.
 */
@customElement("pc-video-player")
export class PcVideoPlayer extends PlacerElement {
    static css = styles;

    @query('[part~="video"]') video!: HTMLVideoElement;
    @query('[part~="progress-wrapper"]') progressWrapper!: HTMLDivElement;
    @query('[part~="progress"]') progress!: PcSlider;
    @query('[part~="full-screen"]') fullScreen!: PcButton;
    @query('[part~="captions"]') captions!: HTMLDivElement;
    @query('[part~="popup"]') popup!: PcPopup;

    @state() private duration = 0;
    @state() private current = 0;
    @state() private volume = 1;
    @state() private playbackRate = 1;
    @state() private isPlaying = false;
    @state() private captionsOn = false;
    @state() private isMuted = false;
    @state() private bufferedEnd = 0;

    @state() private panel: "main" | "speed" | "captions" = "main";

    @state() private hideTimeoutID: number | null = null;
    @state() private lastMousePosition: { x: number; y: number } | null = null;

    @state() private animationFrameID: number | null = null;

    @state() private isCompact = false;
    @state() private isScrubbing = false;
    @state() private scrubTime: number | null = null;
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

    /** Allows the video to play inline within the page instead of automatically entering full screen on mobile devices. */
    @property({ type: Boolean, reflect: true }) playsinline = false;

    /** Provides a custom title to the video. */
    @property({ attribute: "data-title" }) dataTitle = "";

    async firstUpdated() {
        const video = this.video;

        if (this.src) {
            video.src = this.src;
        }

        if (this.poster) {
            video.poster = this.poster;
        }

        video.autoplay = this.autoplay;
        video.muted = this.muted;
        video.loop = this.loop;
        video.preload = this.preload;
        video.playbackRate = this.playbackRate;

        if (this.playsinline) {
            video.setAttribute("playsinline", "");
        }

        const trackElements = Array.from(this.querySelectorAll("track"));

        for (const track of trackElements) {
            const src = track.getAttribute("src");

            if (!src) {
                continue;
            }

            const response = await fetch(src);
            const text = await response.text();

            this.applyVTTStyles(text);
        }

        new ResizeObserver((entries) => {
            for (let entry of entries) {
                this.isCompact = entry.contentRect.width < 500;
            }
        }).observe(this);

        video.addEventListener("loadedmetadata", () => {
            this.duration = video.duration || 0;
            this.current = video.currentTime || 0;
            this.volume = video.volume;

            this.updateBuffered();
            this.updateCaptionsState();

            Array.from(video.textTracks || []).forEach((track) =>
                track.addEventListener(
                    "cuechange",
                    this.updateCuePosition.bind(this),
                ),
            );

            this.updateCuePosition();
        });

        video.addEventListener(
            "timeupdate",
            () => (this.current = video.currentTime || 0),
        );
        video.addEventListener("progress", () => this.updateBuffered());
        video.addEventListener("play", () => {
            this.isPlaying = true;
            this.startUpdateLoop();
        });
        video.addEventListener("pause", () => {
            this.isPlaying = false;
            this.stopUpdateLoop();
        });
        video.addEventListener("volumechange", () => {
            this.volume = video.volume;
            this.isMuted = video.muted || video.volume === 0;
        });

        if (!this.hasAttribute("tabindex")) {
            this.setAttribute("tabindex", "0");
        }

        this.addEventListener("keydown", (event: KeyboardEvent) =>
            this.onKeyDown(event),
        );
        this.addEventListener("mousemove", (event) =>
            this.onUserInteraction(event),
        );
        this.addEventListener("touchstart", (event) =>
            this.onUserInteraction(event),
        );

        const input = this.progress;

        input.valueFormatter = () => this.formatTime(this.scrubTime ?? 0);

        ["pointerdown", "pointermove", "pointerup", "pointercancel"].forEach(
            (type) => {
                input.addEventListener(type, (event) => {
                    if (type === "pointerdown") {
                        this.onScrubStart(event as PointerEvent);
                    } else if (type === "pointermove") {
                        this.onScrubMove(event as PointerEvent);
                    } else {
                        this.onScrubEnd(event as PointerEvent);
                    }
                });
            },
        );

        this.toggleControlVisibility();

        this.addEventListener("mouseenter", () =>
            this.toggleControlVisibility(true),
        );
        this.addEventListener("mouseleave", () =>
            this.toggleControlVisibility(),
        );

        Array.from(this.renderRoot.querySelectorAll("pc-dropdown")).forEach(
            (dropdown) => {
                dropdown.addEventListener("pc-show", () =>
                    this.toggleControlVisibility(true),
                );
                dropdown.addEventListener("pc-hide", () =>
                    this.toggleControlVisibility(),
                );
            },
        );
    }

    private formatTime(second: number) {
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

    private transformCueCSS(css: string): string {
        return css
            .replace(
                /::cue\(v\[voice="([^"]+)"\]\)/g,
                (_, voice) => `.caption-cue .voice[data-voice="${voice}"]`,
            )
            .replace(/::cue\(\.([^)]+)\)/g, (_, cls) => `.caption-cue .${cls}`)
            .replace(/::cue/g, `.caption-cue`);
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

    private setSpeed(rate: number) {
        this.playbackRate = rate;
        this.video.playbackRate = rate;
    }

    private onKeyDown(event: KeyboardEvent) {
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
                this.toggleFullscreen();
                break;
            case "c":
                this.toggleCaptions();
                break;
            case "p":
                this.togglePiP();
                break;
        }
    }

    private scheduleHideControls(delay = 3000) {
        if (this.hideTimeoutID) {
            clearTimeout(this.hideTimeoutID);
        }

        this.hideTimeoutID = window.setTimeout(() => {
            const isHoverable = window.matchMedia("(hover: hover)").matches;

            if (isHoverable) {
                const movementDelta = this.lastMousePosition
                    ? Math.hypot(
                          this.lastMousePosition.x -
                              (this.lastMousePosition?.x ?? 0),
                          this.lastMousePosition.y -
                              (this.lastMousePosition?.y ?? 0),
                      )
                    : 0;

                if (movementDelta <= 3) {
                    this.classList.remove("controls-visible");
                } else {
                    this.scheduleHideControls(delay);
                }
            } else {
                this.classList.remove("controls-visible");
            }
        }, delay);
    }

    private onUserInteraction(event: MouseEvent | TouchEvent) {
        this.lastMousePosition =
            "touches" in event && event.touches.length
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : {
                      x: (event as MouseEvent).clientX,
                      y: (event as MouseEvent).clientY,
                  };

        this.classList.add("controls-visible");

        this.scheduleHideControls();
    }

    private updateCuePosition() {
        const tracks = Array.from(this.video.textTracks || []);

        let newActiveCues: VTTCue[] = [];

        tracks.forEach((track) => {
            if (track.mode === "showing") {
                track.mode = "hidden";
            }

            if (track.mode === "hidden" && track.activeCues) {
                newActiveCues.push(
                    ...(Array.from(track.activeCues) as VTTCue[]),
                );
            }
        });

        this.activeCues = newActiveCues;
    }

    private toggleControlVisibility(force?: boolean) {
        const isHovered = this.matches(":hover");
        const anyPopupOpen = Array.from(
            this.renderRoot.querySelectorAll("pc-popup"),
        ).some((popup) => (popup as PcPopup).active);

        const isHoverable = window.matchMedia("(hover: hover)").matches;

        let shouldBeVisible: boolean;

        if (typeof force === "boolean") {
            shouldBeVisible = force;
        } else if (!isHoverable) {
            shouldBeVisible = true;
        } else {
            shouldBeVisible = isHovered || anyPopupOpen || !this.isPlaying;
        }

        this.classList.toggle("controls-visible", shouldBeVisible);

        this.updateCuePosition();
    }

    private handlePopupClick() {
        this.popup.active = !this.popup.active;
    }

    private noTextTracks() {
        const list = this.video?.textTracks;

        return !list || list.length === 0;
    }

    private onCaptionSelection(event: CustomEvent) {
        this.setCaptionTrack(Number(event.detail.item.value));
    }

    private setCaptionTrack(index: number) {
        const tracks = Array.from(this.video?.textTracks || []);

        tracks.forEach(
            (track, idx) =>
                (track.mode = idx === index ? "showing" : "disabled"),
        );

        this.updateCaptionsState();
    }

    private startUpdateLoop() {
        const step = () => {
            if (!this.video.paused && !this.isScrubbing) {
                this.progress.value = Math.floor(this.video.currentTime * 1000);

                if (
                    Math.floor(this.current) !==
                    Math.floor(this.video.currentTime)
                ) {
                    this.current = this.video.currentTime;
                }

                this.animationFrameID = requestAnimationFrame(step);
            }
        };

        this.animationFrameID = requestAnimationFrame(step);
    }

    private stopUpdateLoop() {
        if (this.animationFrameID) {
            cancelAnimationFrame(this.animationFrameID);

            this.animationFrameID = null;
        }
    }

    private updateCaptionsState = () => {
        const list = this.video?.textTracks;

        this.captionsOn = list
            ? Array.from(list).some((track) => track.mode === "showing")
            : false;

        this.updateCuePosition();
    };

    private toggleCaptions = () => {
        const tracks = Array.from(this.video?.textTracks || []);

        if (!tracks.length) {
            return;
        }

        let trackToToggle =
            [...tracks].reverse().find((t) => t.mode === "showing") ||
            tracks[0];

        trackToToggle.mode =
            trackToToggle.mode === "showing" ? "disabled" : "showing";

        tracks.forEach(
            (track) => track !== trackToToggle && (track.mode = "disabled"),
        );

        this.captionsOn = trackToToggle.mode === "showing";

        this.updateCuePosition();
    };

    private async togglePiP() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await this.video.requestPictureInPicture();
            }
        } catch {}
    }

    private toggleFullscreen() {
        const isFullScreen =
            document.fullscreenElement === this ||
            (this.renderRoot as ShadowRoot).fullscreenElement === this;

        if (!isFullScreen) {
            this.requestFullscreen?.().catch(() => {});

            this.fullScreen.querySelector("pc-icon")!.name = "compress";
        } else {
            document.exitFullscreen?.();

            this.fullScreen.querySelector("pc-icon")!.name = "expand";
        }
    }

    private onFrameBackgroundClick(event: MouseEvent) {
        if (
            !event
                .composedPath()
                .some((event: any) =>
                    event?.classList?.contains?.("controls"),
                ) &&
            !this.isScrubbing
        ) {
            this.toggle();
        }
    }

    private parseVTT(text: string, cue: VTTCue): string {
        const position =
            cue.position != null && cue.position !== "auto" ? cue.position : 50;
        const align = cue.align || "center";

        let verticalStyles: string;
        let bottomPercent: number;

        if (cue.line === "auto") {
            bottomPercent = 0;
        } else {
            bottomPercent = 100 - Number(cue.line);
        }

        verticalStyles = `
            bottom: max(${bottomPercent}%, var(--control-offset));
        `;

        const transformValue =
            align === "center" ? 50 : align === "end" ? 100 : 0;

        const processedText = text
            .replace(/<v\s+([^>]+)>/g, '<span class="voice" data-voice="$1">')
            .replace(/<\/v>/g, "</span>")
            .replace(
                /<c\.([^>]+)>/g,
                (_, cls) => `<span class="class ${cls.split(".").join(" ")}">`,
            )
            .replace(/<\/c>/g, "</span>")
            .replace(/<(\/?)(b|i|u|s)>/g, "<$1$2>")
            .replace(/\n/g, "<br>");

        return `
            <span
                class="caption-cue"
                style="
                    position: absolute;
                    left: ${position}%;
                    transform: translateX(-${transformValue}%);
                    ${verticalStyles}
                    text-align: ${align};
                    width: max-content;
                    max-width: 90%;
                "
            >
                ${processedText}
            </span>
        `;
    }

    private updateBuffered() {
        let end = 0;

        for (let i = 0; i < this.video.buffered.length; i++) {
            end = Math.max(end, this.video.buffered.end(i));
        }

        this.bufferedEnd = end;
    }

    private onInputScrub = (event: Event) => {
        const time = Number((event.target as HTMLInputElement).value) / 1000;

        if (!this.isScrubbing) {
            this.video.currentTime = time;
        } else {
            this.scrubTime = time;
        }
    };

    private onScrubStart(event: PointerEvent) {
        this.isScrubbing = true;

        (event.target as Element).setPointerCapture?.(event.pointerId);

        this.updateScrubFromEvent(event);
    }

    private onScrubMove(event: PointerEvent) {
        if (!this.isScrubbing) {
            return;
        }

        this.updateScrubFromEvent(event);
    }

    private onSeeked() {
        this.isScrubbing = false;
        this.scrubTime = null;

        if (this.isPlaying) {
            this.startUpdateLoop();
        }

        this.video.removeEventListener("seeked", this.onSeeked);
    }

    private onScrubEnd(event: PointerEvent) {
        if (!this.isScrubbing) {
            return;
        }

        (event.target as Element).releasePointerCapture?.(event.pointerId);

        if (this.scrubTime != null) {
            this.video.currentTime = this.scrubTime;

            this.video.addEventListener("seeked", this.onSeeked);
        }
    }

    private updateScrubFromEvent(event: PointerEvent) {
        const rect = this.progressWrapper.getBoundingClientRect();
        const percentage = Math.min(
            1,
            Math.max(0, (event.clientX - rect.left) / rect.width),
        );

        this.scrubTime = percentage * this.duration;
    }

    play() {
        return this.video.play();
    }

    pause() {
        this.video.pause();
    }

    toggle() {
        this.video.paused ? this.video.play() : this.video.pause();
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

        return html`
            <div
                class="frame"
                role="region"
                aria-label="Video player"
                @click=${this.onFrameBackgroundClick}
            >
                ${this.dataTitle
                    ? html`<div class="title">${this.dataTitle}</div>`
                    : undefined}

                <video
                    part="video"
                    crossorigin="anonymous"
                    @loadeddata=${this.updateCaptionsState}
                >
                    ${this.src ? html`<source src="${this.src}" />` : ""}
                    ${Array.from(this.querySelectorAll("track")).map(
                        (track) => html`
                            <track
                                kind="${track.getAttribute("kind") ||
                                "subtitles"}"
                                src="${track.getAttribute("src")}"
                                srclang="${track.getAttribute("srclang")}"
                                label="${track.getAttribute("label")}"
                                ?default="${track.hasAttribute("default")}"
                            />
                        `,
                    )}
                </video>

                <div class="captions" part="captions" aria-hidden="true">
                    ${this.activeCues.map(
                        (cue) => html`
                            <div class="caption-line">
                                ${unsafeHTML(this.parseVTT(cue.text, cue))}
                            </div>
                        `,
                    )}
                </div>

                <div class="bar" part="bar">
                    <div part="progress-wrapper" class="progress-wrapper">
                        <div
                            class="buffered"
                            style="inline-size: ${bufferedPercentage}%"
                        ></div>
                        <pc-slider
                            part="progress"
                            class="progress"
                            min="0"
                            .max=${Math.max(
                                1,
                                Math.floor(this.duration * 1000),
                            )}
                            .value=${Math.floor(currentPlaybackTime * 1000)}
                            step="1"
                            label="Seek"
                            has-tooltip
                            @input=${this.onInputScrub}
                        ></pc-slider>
                    </div>
                </div>

                <div class="controls" aria-label="Controls">
                    <pc-button
                        class="play"
                        variant="filled"
                        @click=${this.toggle.bind(this)}
                    >
                        ${this.isPlaying
                            ? html`
                                  <pc-icon
                                      library="system"
                                      icon-style="solid"
                                      name="pause"
                                      label="Pause"
                                  ></pc-icon>
                              `
                            : html`
                                  <pc-icon
                                      library="system"
                                      icon-style="solid"
                                      name="play"
                                      label="Play"
                                  ></pc-icon>
                              `}
                    </pc-button>

                    <pc-button
                        class="mute"
                        size="small"
                        variant="filled"
                        @click=${() => (this.video.muted = !this.video.muted)}
                    >
                        ${this.isMuted
                            ? html`
                                  <pc-icon
                                      library="system"
                                      icon-style="solid"
                                      name="volume-off"
                                      label="Mute"
                                  ></pc-icon>
                              `
                            : html`
                                  <pc-icon
                                      library="system"
                                      icon-style="solid"
                                      name="volume-high"
                                      label="Unmute"
                                  ></pc-icon>
                              `}

                        <pc-slider
                            class="volume"
                            min="0"
                            max="1"
                            step="0.01"
                            .value=${this.volume}
                            label="Volume"
                            @click=${(event: Event) => event.stopPropagation()}
                            @input=${(event: Event) => {
                                const video = Number(
                                    (event.target as HTMLInputElement).value,
                                );

                                this.video.volume = video;
                                this.video.muted = video === 0;
                            }}
                            @pointerdown=${(event: PointerEvent) =>
                                event.stopPropagation()}
                        ></pc-slider>
                    </pc-button>

                    <div class="time-container">
                        ${currentTime} / ${duration}
                    </div>

                    <div class="spacer"></div>

                    <pc-button-group>
                        <pc-button
                            class="pip"
                            size="small"
                            variant="filled"
                            ?hidden=${!pipSupported}
                            @click=${this.togglePiP}
                        >
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name="picture-in-picture"
                                label="Picture in Picture"
                            ></pc-icon>
                        </pc-button>

                        <pc-popup placement="top-end" part="popup">
                            <pc-button
                                slot="anchor"
                                size="small"
                                variant="filled"
                                @click=${this.handlePopupClick}
                            >
                                <pc-icon
                                    library="default"
                                    icon-style="solid"
                                    name="gear"
                                ></pc-icon>
                            </pc-button>

                            <div
                                class="settings-menu"
                                id="settings-menu"
                                role="listbox"
                            >
                                ${this.panel === "main"
                                    ? html`
                                          <pc-button
                                              @click=${() =>
                                                  (this.panel = "speed")}
                                          >
                                              <pc-icon
                                                  library="system"
                                                  icon-style="solid"
                                                  name="gauge-high"
                                                  slot="prefix"
                                              ></pc-icon>
                                              Playback rate
                                              <pc-icon
                                                  library="system"
                                                  icon-style="solid"
                                                  name="chevron-right"
                                                  slot="suffix"
                                              ></pc-icon>
                                          </pc-button>

                                          <pc-button
                                              ?hidden=${this.noTextTracks()}
                                              @click=${() =>
                                                  (this.panel = "captions")}
                                          >
                                              <pc-icon
                                                  library="system"
                                                  icon-style="solid"
                                                  name="closed-captioning"
                                                  slot="prefix"
                                              ></pc-icon>
                                              Captions
                                              <pc-icon
                                                  library="system"
                                                  icon-style="solid"
                                                  name="chevron-right"
                                                  slot="suffix"
                                              ></pc-icon>
                                          </pc-button>
                                      `
                                    : ""}
                                ${this.panel === "speed"
                                    ? html`
                                          <pc-button
                                              @click=${() =>
                                                  (this.panel = "main")}
                                          >
                                              ← Back
                                          </pc-button>

                                          ${[0.25, 0.5, 1, 1.5, 2].map(
                                              (rate) => html`
                                                  <pc-button
                                                      @click=${() =>
                                                          this.setSpeed(rate)}
                                                  >
                                                      ${rate}
                                                  </pc-button>
                                              `,
                                          )}
                                      `
                                    : ""}
                                ${this.panel === "captions"
                                    ? html`
                                          <pc-button
                                              @click=${() =>
                                                  (this.panel = "main")}
                                          >
                                              ← Back
                                          </pc-button>

                                          ${Array.from(
                                              this.video?.textTracks || [],
                                          ).map(
                                              (track, index) => html`
                                                  <pc-button
                                                      @click=${() =>
                                                          this.setCaptionTrack(
                                                              index,
                                                          )}
                                                  >
                                                      ${track.label ||
                                                      `Track ${index + 1}`}
                                                  </pc-button>
                                              `,
                                          )}
                                      `
                                    : ""}
                            </div>
                        </pc-popup>

                        <pc-button
                            class="full-screen"
                            part="full-screen"
                            size="small"
                            variant="filled"
                            @click=${this.toggleFullscreen}
                        >
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name="expand"
                                label="Full screen"
                            ></pc-icon>
                        </pc-button>
                    </pc-button-group>
                </div>
            </div>
        `;
    }
}
