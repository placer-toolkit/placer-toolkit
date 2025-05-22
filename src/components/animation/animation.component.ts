import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, queryAsync } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { animations } from "./animations.js";
import { styles } from "./animation.styles.js";

@customElement("pc-animation")
export class PcAnimation extends LitElement {
    static styles: CSSResultGroup = styles;

    private animation?: Animation;
    private hasStarted = false;

    @queryAsync("slot") defaultSlot!: Promise<HTMLSlotElement>;

    @property({ type: Number }) delay = 0;

    @property() direction: PlaybackDirection = "normal";

    @property({ type: Number }) duration = 1000;

    @property() easing = "linear";

    @property({ attribute: "end-delay", type: Number }) endDelay = 0;

    @property() fill: FillMode = "auto";

    @property({ type: Number }) iterations = Infinity;

    @property({ attribute: "iteration-start", type: Number })
    iterationStart = 0;

    @property({ attribute: false }) keyframes?: Keyframe[];

    @property() name = "none";

    @property({ type: Boolean, reflect: true }) play = false;

    @property({ attribute: "playback-rate", type: Number }) playbackRate = 1;

    get currentTime(): CSSNumberish {
        return this.animation?.currentTime ?? 0;
    }

    set currentTime(time: number) {
        if (this.animation) {
            this.animation.currentTime = time;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.createAnimation();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.destroyAnimation();
    }

    private handleAnimationFinish = () => {
        this.play = false;
        this.hasStarted = false;
        emit(this, "pc-finish");
    };

    private handleAnimationCancel = () => {
        this.play = false;
        this.hasStarted = false;
        emit(this, "pc-cancel");
    };

    private handleSlotChange() {
        this.destroyAnimation();
        this.createAnimation();
    }

    private async createAnimation() {
        const easing =
            animations.easings[
                this.easing as keyof typeof animations.easings
            ] ?? this.easing;
        const keyframes =
            this.keyframes ??
            (animations as unknown as Partial<Record<string, Keyframe[]>>)[
                this.name
            ];
        const slot = await this.defaultSlot;
        const element = slot.assignedElements()[0] as HTMLElement | undefined;

        if (!element || !keyframes) {
            return false;
        }

        this.destroyAnimation();
        this.animation = element.animate(keyframes, {
            delay: this.delay,
            direction: this.direction,
            duration: this.duration,
            easing,
            endDelay: this.endDelay,
            fill: this.fill,
            iterationStart: this.iterationStart,
            iterations: this.iterations,
        });
        this.animation.playbackRate = this.playbackRate;
        this.animation.addEventListener("cancel", this.handleAnimationCancel);
        this.animation.addEventListener("finish", this.handleAnimationFinish);

        if (this.play) {
            this.hasStarted = true;
            emit(this, "pc-start");
        } else {
            this.animation.pause();
        }

        return true;
    }

    private destroyAnimation() {
        if (this.animation) {
            this.animation.cancel();
            this.animation.removeEventListener(
                "cancel",
                this.handleAnimationCancel,
            );
            this.animation.removeEventListener(
                "finish",
                this.handleAnimationFinish,
            );
            this.hasStarted = false;
        }
    }

    @watch([
        "name",
        "delay",
        "direction",
        "duration",
        "easing",
        "endDelay",
        "fill",
        "iterations",
        "iterationsStart",
        "keyframes",
    ])
    handleAnimationChange() {
        if (!this.hasUpdated) {
            return;
        }

        this.createAnimation();
    }

    @watch("play")
    handlePlayChange() {
        if (this.animation) {
            if (this.play && !this.hasStarted) {
                this.hasStarted = true;
                emit(this, "pc-start");
            }

            if (this.play) {
                this.animation.play();
            } else {
                this.animation.pause();
            }

            return true;
        }
        return false;
    }

    @watch("playbackRate")
    handlePlaybackRateChange() {
        if (this.animation) {
            this.animation.playbackRate = this.playbackRate;
        }
    }

    cancel() {
        this.animation?.cancel();
    }

    finish() {
        this.animation?.finish();
    }

    render() {
        return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
    }
}
