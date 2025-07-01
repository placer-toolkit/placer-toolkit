import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, queryAsync } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { animations } from "./animations.js";
import { styles } from "./animation.styles.js";

/**
 * @summary Animate elements declaratively with nearly 100 baked‐in presets, or roll your own with custom keyframes. These animations are powered by the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).
 * @status experimental
 * @since 0.4.0
 *
 * @event pc-cancel — Emitted when the animation is cancelled.
 * @event pc-finish — Emitted when the animation finishes.
 * @event pc‐start — Emitted when the animation starts or restarts.
 *
 * @slot — The element to animate. Avoid slotting in more than one element, as subsequent ones will be ignored. To animate multiple elements, either wrap them in a single container or use multiple `<pc-animation>` elements.
 */
@customElement("pc-animation")
export class PcAnimation extends LitElement {
    static styles: CSSResultGroup = styles;

    private animation?: Animation;
    private hasStarted = false;

    /** @internal This is an internal property. */
    @queryAsync("slot") defaultSlot!: Promise<HTMLSlotElement>;

    /** The name of the built‐in animation to use. For custom animations, use the `keyframes` prop. */
    @property() name = "none";

    /** Plays the animation. When omitted, the animation will be paused. This attribute will be automatically removed when the animation finishes or gets cancelled. */
    @property({ type: Boolean, reflect: true }) play = false;

    /** The number of milliseconds to delay the start of the animation. */
    @property({ type: Number }) delay = 0;

    /** Determines the direction of playback as well as the behaviour when reaching the end of an iteration. Learn more about the CSS [`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction) property. */
    @property() direction: PlaybackDirection = "normal";

    /** The number of milliseconds each iteration of the animation takes to complete. */
    @property({ type: Number }) duration = 1000;

    /** The easing function to use for the animation. This can be an easing function name like `easeInSine` or a custom easing function like `cubic-bezier(0.12, 0, 0.39, 0)`. */
    @property() easing = "ease-in-out";

    /** The number of milliseconds to delay after the active period of an animation sequence. */
    @property({ attribute: "end-delay", type: Number }) endDelay = 0;

    /** Sets how the animation applies styles to its target before and after its execution. */
    @property() fill: FillMode = "auto";

    /** The number of iterations to run before the animation completes. */
    @property({ type: Number }) iterations = Infinity;

    /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
    @property({ attribute: "iteration-start", type: Number })
    iterationStart = 0;

    /** The keyframes to use for the animation. If this is set, the `name` attribute and property will be ignored. */
    @property({ attribute: false }) keyframes?: Keyframe[];

    /** Sets the animation’s playback rate. The default is `1`, which plays the animation at a normal speed. Setting this to `2`, for example, will double the animation’s speed. A negative value can be used to reverse the animation. This value can be changed without causing the animation to restart. */
    @property({ attribute: "playback-rate", type: Number }) playbackRate = 1;

    /** Gets and sets the current animation time. */
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

    /** @internal This is an internal property. */
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

    /** @internal This is an internal property. */
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

    /** @internal This is an internal property. */
    @watch("playbackRate")
    handlePlaybackRateChange() {
        if (this.animation) {
            this.animation.playbackRate = this.playbackRate;
        }
    }

    /** Clears all keyframes caused by this animation and aborts its playback. */
    cancel() {
        this.animation?.cancel();
    }

    /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
    finish() {
        this.animation?.finish();
    }

    render() {
        return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
    }
}
