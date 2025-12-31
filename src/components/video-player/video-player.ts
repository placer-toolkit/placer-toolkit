import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import styles from "./video-player.css";
import { PcButton } from "../button/button.js";
import { PcDropdown } from "../dropdown/dropdown.js";
import { PcDropdownItem } from "../dropdown-item/dropdown-item.js";
import { PcIcon } from "../icon/icon.js";
import { PcTooltip } from "../tooltip/tooltip.js";

/**
 * @summary Video players present visual media and provide controls for playback.
 * @status experimental
 * @since undecided
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
    /** @internal This is an internal static property. */
    static css = styles;

    /** @internal This is an internal class property. */
    @query('[part~="video"]') video!: HTMLVideoElement;
    /** @internal This is an internal class property. */
    @query('[part~="progress-wrapper"]') progressWrapper!: HTMLDivElement;
    /** @internal This is an internal class property. */
    @query('[part~="progress"]') progress!: HTMLInputElement;
    /** @internal This is an internal class property. */
    @query('[part~="full-screen"]') fullScreen!: PcButton;
    /** @internal This is an internal class property. */
    @query('[part~="captions"]') captions!: HTMLDivElement;

    @state() private duration = 0;
    @state() private current = 0;
    @state() private volume = 1;
    @state() private playbackRate = 1;
    @state() private isPlaying = false;
    @state() private captionsOn = false;
    @state() private isMuted = false;
    @state() private bufferedEnd = 0; // This value is in seconds

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

    firstUpdated() {
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
        } else {
            video.removeAttribute("playsinline");
        }

        const sources = Array.from(this.querySelectorAll("source"));
        const tracks = Array.from(this.querySelectorAll("track"));

        if (!this.src && sources.length) {
            for (const source of sources) {
                const element = document.createElement("source");

                element.src = source.getAttribute("src") || "";

                const type = source.getAttribute("type");

                if (type) {
                    element.type = type;
                }

                video.appendChild(element);
            }
        }

        for (const track of tracks) {
            const element = document.createElement("track");

            element.kind =
                (track.getAttribute("kind") as TextTrackKind) || "subtitles";
            element.label = track.getAttribute("label") || "";
            element.srclang = track.getAttribute("srclang") || "";
            element.src = track.getAttribute("src") || "";

            if (track.hasAttribute("default")) {
                element.default = true;
            }

            video.appendChild(element);
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                this.isCompact = entry.contentRect.width < 500;
            }
        });

        resizeObserver.observe(this);

        video.addEventListener("loadedmetadata", () => {
            this.duration = video.duration || 0;
            this.current = video.currentTime || 0;
            this.volume = video.volume;

            this.updateBuffered();
            this.updateCaptionsState();

            Array.from(video.textTracks || []).forEach((track) => {
                track.addEventListener(
                    "cuechange",
                    this.updateCuePosition.bind(this),
                );
            });

            this.updateCuePosition();
        });

        video.addEventListener("timeupdate", () => {
            this.current = video.currentTime || 0;
        });

        video.addEventListener("progress", () => this.updateBuffered());

        video.addEventListener("play", () => {
            this.isPlaying = true;
        });

        video.addEventListener("mute", () => {
            this.muted = true;
        });

        video.addEventListener("unmute", () => {
            this.muted = false;
        });

        video.addEventListener("pause", () => {
            this.isPlaying = false;
        });

        video.addEventListener("volumechange", () => {
            this.volume = video.volume;
            this.isMuted = video.volume === 0 || video.muted;
        });

        video.addEventListener("volumechange", () => {
            this.isMuted = video.muted || video.volume === 0;
        });

        if (!this.hasAttribute("tabindex")) {
            this.setAttribute("tabindex", "0");
        }

        this.addEventListener("keydown", (event: KeyboardEvent) =>
            this.onKeyDown(event),
        );

        const input = this.progress;

        input.addEventListener("pointerdown", (event) => {
            this.onScrubStart(event as PointerEvent);
        });

        input.addEventListener("pointermove", (event) => {
            this.onScrubMove(event as PointerEvent);
        });

        input.addEventListener("pointerup", (event) => {
            this.onScrubEnd(event as PointerEvent);
        });

        input.addEventListener("pointercancel", (event) => {
            this.onScrubEnd(event as PointerEvent);
        });

        this.toggleControlVisibility();

        this.addEventListener("mouseenter", () => {
            this.toggleControlVisibility(true);
        });

        this.addEventListener("mouseleave", () => {
            this.toggleControlVisibility();
        });

        const dropdowns = Array.from(
            this.renderRoot.querySelectorAll("pc-dropdown"),
        ) as HTMLElement[];

        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("pc-show", () => {
                this.toggleControlVisibility(true);
            });

            dropdown.addEventListener("pc-hide", () => {
                this.toggleControlVisibility();
            });
        });
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

    private onKeyDown(event: KeyboardEvent) {
        const key = event.key.toLowerCase();

        if (key === " " || key === "k") {
            event.preventDefault();
            this.toggle();
        }

        if (key === "m") {
            this.video.muted = !this.video.muted;
        }

        if (key === "arrowright") {
            this.video.currentTime = Math.min(
                this.video.currentTime + 5,
                this.video.duration || Infinity,
            );
        }

        if (key === "arrowleft") {
            this.video.currentTime = Math.max(this.video.currentTime - 5, 0);
        }

        if (key === "arrowup") {
            this.video.volume = Math.min(this.video.volume + 0.05, 1);
        }

        if (key === "arrowdown") {
            this.video.volume = Math.max(this.video.volume - 0.05, 0);
        }

        if (key === "f") {
            this.toggleFullscreen();
        }

        if (key === "c") {
            this.toggleCaptions();
        }

        if (key === "p") {
            this.togglePiP();
        }
    }

    private updateCuePosition() {
        const tracks = Array.from(this.video.textTracks || []);

        let newActiveCues: VTTCue[] = [];

        for (const track of tracks) {
            if (track.mode === "showing") {
                track.mode = "hidden";
            }

            if (track.mode === "hidden" && track.activeCues) {
                newActiveCues = [
                    ...newActiveCues,
                    ...(Array.from(track.activeCues) as VTTCue[]),
                ];
            }
        }

        this.activeCues = newActiveCues;
    }

    private toggleControlVisibility(force?: boolean) {
        const isDesktop = window.matchMedia("(hover: hover)").matches;

        const isHovered = this.matches(":hover");

        const dropdowns = Array.from(
            this.renderRoot.querySelectorAll("pc-dropdown"),
        ) as PcDropdown[];

        const anyOpen = dropdowns.some((dropdown) => dropdown.open);

        let shouldBeVisible: boolean;

        if (typeof force === "boolean") {
            shouldBeVisible = force;
        } else {
            shouldBeVisible =
                isDesktop && (isHovered || anyOpen || !this.isPlaying);
        }

        if (shouldBeVisible) {
            this.classList.add("controls-visible");
        } else {
            this.classList.remove("controls-visible");
        }

        this.updateCuePosition();
    }

    private noTextTracks() {
        const list = this.video?.textTracks;
        return !list || list.length === 0;
    }

    private onCaptionSelection(event: CustomEvent) {
        const index = Number(event.detail.item.value);

        this.setCaptionTrack(index);
    }

    private setCaptionTrack(index: number) {
        const tracks = Array.from(this.video?.textTracks || []);

        tracks.forEach((track, i) => {
            track.mode = i === index ? "showing" : "disabled";
        });

        this.updateCaptionsState();
    }

    private updateCaptionsState = () => {
        const list = this.video?.textTracks;

        if (!list) {
            this.captionsOn = false;
            return;
        }

        let on = false;

        for (const track of Array.from(list)) {
            if (track.mode === "showing") {
                on = true;
                break;
            }
        }

        this.captionsOn = on;
        this.updateCuePosition();
    };

    private toggleCaptions = () => {
        const tracks = Array.from(this.video?.textTracks || []);

        if (!tracks.length) {
            return;
        }

        let trackToToggle = [...tracks]
            .reverse()
            .find((track) => track.mode === "showing");

        if (!trackToToggle) {
            const trackElements = Array.from(
                this.video.querySelectorAll("track"),
            );
            const defaultTrackElement = trackElements.find((el) =>
                el.hasAttribute("default"),
            ) as HTMLTrackElement | undefined;
            trackToToggle = defaultTrackElement?.track || tracks[0];
        }

        trackToToggle.mode =
            trackToToggle.mode === "showing" ? "disabled" : "showing";

        tracks.forEach((track) => {
            if (track !== trackToToggle) track.mode = "disabled";
        });

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
        const isFull =
            document.fullscreenElement === this ||
            (this.renderRoot as ShadowRoot).fullscreenElement === this;

        if (!isFull) {
            this.requestFullscreen?.().catch?.(() => {});
            this.fullScreen.querySelector("pc-icon")!.name = "compress";
        } else {
            document.exitFullscreen?.();
            this.fullScreen.querySelector("pc-icon")!.name = "expand";
        }
    }

    private onFrameBackgroundClick(event: MouseEvent) {
        const path = event.composedPath();
        const inControls = path.some((element: any) =>
            element?.classList?.contains?.("controls"),
        );

        if (!inControls && !this.isScrubbing) {
            this.toggle();
        }
    }

    private handleCompactAction(event: CustomEvent) {
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
                this.setCaptionTrack(Number(value));
                break;

            case "action":
                if (value === "pip") {
                    this.togglePiP();
                }
                break;
        }
    }

    private updateBuffered() {
        const video = this.video;

        const ranges = video.buffered;

        let end = 0;

        for (let i = 0; i < ranges.length; i++) {
            end = Math.max(end, ranges.end(i));
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

        const rect = this.progressWrapper.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = Math.min(1, Math.max(0, x / rect.width));

        this.scrubTime = percentage * this.duration;

        this.progressWrapper.style.setProperty("--progress", `${percentage}`);
    }

    private onScrubMove(event: PointerEvent) {
        if (!this.isScrubbing) {
            return;
        }

        const rect = this.progressWrapper.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = Math.min(1, Math.max(0, x / rect.width));

        this.scrubTime = percentage * this.duration;

        this.progressWrapper.style.setProperty("--progress", `${percentage}`);
    }

    private onScrubEnd(event: PointerEvent) {
        if (!this.isScrubbing) {
            return;
        }

        this.isScrubbing = false;
        (event.target as Element).releasePointerCapture?.(event.pointerId);

        if (this.scrubTime != null) {
            this.video.currentTime = this.scrubTime;
        }

        this.scrubTime = null;
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
        const pipSupported = (document as any).pictureInPictureEnabled;

        const bufferedPercentage =
            this.duration > 0 ? (this.bufferedEnd / this.duration) * 100 : 0;

        const currentPlaybackTime =
            this.isScrubbing && this.scrubTime != null
                ? this.scrubTime
                : this.current;

        const progressPercentage =
            this.duration > 0 ? currentPlaybackTime / this.duration : 0;

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
                ></video>

                <div class="captions" part="captions" aria-hidden="true">
                    ${this.activeCues.map(
                        (cue) => html`
                            <div class="caption-cue">${cue.text}</div>
                        `,
                    )}
                </div>

                <div class="bar">
                    <div
                        part="progress-wrapper"
                        class="progress-wrapper"
                        style="--progress: ${progressPercentage}"
                    >
                        <div
                            class="buffered"
                            style="inline-size: ${bufferedPercentage}%"
                        ></div>

                        <pc-tooltip
                            .content=${this.scrubTime != null
                                ? this.formatTime(this.scrubTime)
                                : ""}
                            ?open=${this.isScrubbing}
                            trigger="manual"
                            placement="top"
                            style="--pc-tooltip-arrow-size: 0; --max-width: none"
                        >
                            <input
                                part="progress"
                                class="progress"
                                type="range"
                                min="0"
                                .max=${Math.max(
                                    1,
                                    Math.floor(this.duration * 1000),
                                )}
                                .value=${this.isScrubbing &&
                                this.scrubTime != null
                                    ? Math.floor(this.scrubTime * 1000)
                                    : Math.floor(this.current * 1000)}
                                step="1"
                                aria-label="Seek"
                                @input=${this.onInputScrub}
                            />
                        </pc-tooltip>
                    </div>
                </div>

                <div class="controls" role="group" aria-label="Controls">
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

                        <input
                            class="volume"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            .value=${this.volume}
                            aria-label="Volume"
                            @click=${(event: Event) => event.stopPropagation()}
                            @pointerdown=${(event: PointerEvent) =>
                                event.stopPropagation()}
                            @input=${(event: Event) => {
                                const video = Number(
                                    (event.target as HTMLInputElement).value,
                                );

                                this.video.volume = video;
                                this.video.muted = video === 0;
                            }}
                        />
                    </pc-button>

                    ${this.isCompact
                        ? html`
                              <div class="spacer"></div>

                              <pc-dropdown
                                  @pc-select=${this.handleCompactAction}
                              >
                                  <pc-button
                                      slot="trigger"
                                      size="small"
                                      variant="filled"
                                  >
                                      <pc-icon
                                          library="default"
                                          icon-style="solid"
                                          name="gear"
                                      ></pc-icon>
                                  </pc-button>

                                  <pc-dropdown-item>
                                      Playback rate
                                      ${[
                                          0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75,
                                          2,
                                      ].map(
                                          (rate) => html`
                                              <pc-dropdown-item
                                                  value="speed:${rate}"
                                                  slot="submenu"
                                              >
                                                  ${rate}
                                              </pc-dropdown-item>
                                          `,
                                      )}
                                  </pc-dropdown-item>

                                  <pc-dropdown-item
                                      ?hidden=${this.noTextTracks()}
                                  >
                                      Captions
                                      ${Array.from(
                                          this.video?.textTracks || [],
                                      ).map(
                                          (track, index) => html`
                                              <pc-dropdown-item
                                                  value="caption:${index}"
                                                  slot="submenu"
                                              >
                                                  ${track.label ||
                                                  `Track ${index + 1}`}
                                              </pc-dropdown-item>
                                          `,
                                      )}
                                  </pc-dropdown-item>

                                  <pc-dropdown-item
                                      value="action:pip"
                                      ?hidden=${!pipSupported}
                                  >
                                      Picture in Picture
                                  </pc-dropdown-item>
                              </pc-dropdown>
                          `
                        : html`
                              <div class="time-container">
                                  ${currentTime} / ${duration}
                              </div>

                              <div class="spacer"></div>

                              <pc-dropdown
                                  @pc-select=${(event: CustomEvent) => {
                                      const selectedRate = Number(
                                          event.detail.item.value,
                                      );
                                      this.playbackRate = selectedRate;

                                      this.video.playbackRate = selectedRate;
                                  }}
                              >
                                  <pc-button
                                      slot="trigger"
                                      size="small"
                                      variant="filled"
                                  >
                                      <pc-icon
                                          library="system"
                                          icon-style="solid"
                                          name="gauge-high"
                                      ></pc-icon>
                                  </pc-button>

                                  ${[
                                      0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2,
                                  ].map(
                                      (playbackRate) => html`
                                          <pc-dropdown-item
                                              value=${playbackRate}
                                          >
                                              ${playbackRate}
                                          </pc-dropdown-item>
                                      `,
                                  )}
                              </pc-dropdown>

                              <pc-dropdown
                                  ?hidden=${this.noTextTracks()}
                                  @pc-select=${this.onCaptionSelection.bind(
                                      this,
                                  )}
                              >
                                  <pc-button
                                      slot="trigger"
                                      size="small"
                                      variant="filled"
                                  >
                                      <pc-icon
                                          library="system"
                                          icon-style="solid"
                                          name="closed-captioning"
                                          label=${this.captionsOn
                                              ? "Captions on"
                                              : "Captions off"}
                                      ></pc-icon>
                                  </pc-button>

                                  ${Array.from(
                                      this.video?.textTracks || [],
                                  ).map(
                                      (track, index) => html`
                                          <pc-dropdown-item value=${index}>
                                              ${track.label ||
                                              track.kind ||
                                              `Track ${index + 1}`}
                                          </pc-dropdown-item>
                                      `,
                                  )}
                              </pc-dropdown>

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
                          `}

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
                </div>
            </div>
        `;
    }
}
