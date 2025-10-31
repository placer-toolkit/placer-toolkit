import type { IconLibrary } from "./library.js";

/* System icons are a separate library to ensure they’re always available,
   regardless of how the default icon library is configured or whether its
   icons resolve correctly.

   All Placer Toolkit components must use the system library instead of the
   default. For visual consistency, system icons are a subset of Font Awesome Free.

   Note: Please keep the Font Awesome attribution comments and don’t remove them.
         We don’t want to violate the Font Awesome Free licence. */
const icons: { [key: string]: { [key: string]: string } } = {
    solid: {
        "check": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
            </svg>
        `,
        "chevron-down": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
                />
            </svg>
        `,
        "chevron-left": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"
                />
            </svg>
        `,
        "chevron-right": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"
                />
            </svg>
        `,
        "grip-vertical": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M288 104C288 81.9 270.1 64 248 64L200 64C177.9 64 160 81.9 160 104L160 152C160 174.1 177.9 192 200 192L248 192C270.1 192 288 174.1 288 152L288 104zM288 296C288 273.9 270.1 256 248 256L200 256C177.9 256 160 273.9 160 296L160 344C160 366.1 177.9 384 200 384L248 384C270.1 384 288 366.1 288 344L288 296zM160 488L160 536C160 558.1 177.9 576 200 576L248 576C270.1 576 288 558.1 288 536L288 488C288 465.9 270.1 448 248 448L200 448C177.9 448 160 465.9 160 488zM480 104C480 81.9 462.1 64 440 64L392 64C369.9 64 352 81.9 352 104L352 152C352 174.1 369.9 192 392 192L440 192C462.1 192 480 174.1 480 152L480 104zM352 296L352 344C352 366.1 369.9 384 392 384L440 384C462.1 384 480 366.1 480 344L480 296C480 273.9 462.1 256 440 256L392 256C369.9 256 352 273.9 352 296zM480 488C480 465.9 462.1 448 440 448L392 448C369.9 448 352 465.9 352 488L352 536C352 558.1 369.9 576 392 576L440 576C462.1 576 480 558.1 480 536L480 488z"
                />
            </svg>
        `,
        "minus": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"
                />
            </svg>
        `,
        "star": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
                />
            </svg>
        `,
        "user": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                />
            </svg>
        `,
        "xmark": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                />
            </svg>
        `,
    },
    regular: {
        "circle-question": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 240C302.3 240 288 254.3 288 272C288 285.3 277.3 296 264 296C250.7 296 240 285.3 240 272C240 227.8 275.8 192 320 192C364.2 192 400 227.8 400 272C400 319.2 364 339.2 344 346.5L344 350.3C344 363.6 333.3 374.3 320 374.3C306.7 374.3 296 363.6 296 350.3L296 342.2C296 321.7 310.8 307 326.1 302C332.5 299.9 339.3 296.5 344.3 291.7C348.6 287.5 352 281.7 352 272.1C352 254.4 337.7 240.1 320 240.1zM288 432C288 414.3 302.3 400 320 400C337.7 400 352 414.3 352 432C352 449.7 337.7 464 320 464C302.3 464 288 449.7 288 432z"
                />
            </svg>
        `,
        "circle-xmark": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z"
                />
            </svg>
        `,
        "copy": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"
                />
            </svg>
        `,
        "eye": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z"
                />
            </svg>
        `,
        "eye-slash": `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!--! Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                    d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM208.9 175.1C241 156.2 278.1 144 320 144C385.2 144 438.8 173.6 479.9 211.7C518.4 247.4 545 290 558.5 320C544.9 350 518.3 392.5 479.9 428.3C476.8 431.1 473.7 433.9 470.5 436.7L425.8 392C439.8 371.5 448 346.7 448 320C448 249.3 390.7 192 320 192C293.3 192 268.5 200.2 248 214.2L208.9 175.1zM390.9 357.1L282.9 249.1C294 243.3 306.6 240 320 240C364.2 240 400 275.8 400 320C400 333.4 396.7 346 390.9 357.1zM135.4 237.2L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L384.2 486C364.2 492.4 342.8 496 320 496C254.8 496 201.2 466.4 160.1 428.3C121.6 392.6 95 350 81.5 320C91.9 296.9 110.1 266.4 135.5 237.2z"
                />
            </svg>
        `,
    },
};

function dataURI(svg: string) {
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const systemLibrary: IconLibrary = {
    name: "system",
    resolver: (name: string, iconStyle = "solid") => {
        let collection = icons[iconStyle];

        // Fall back to a question mark if the icon is missing
        let svg =
            collection[name] ??
            icons.regular[name] ??
            icons.regular["circle-question"];

        if (svg) {
            return dataURI(svg);
        }

        return "";
    },
};

export default systemLibrary;
