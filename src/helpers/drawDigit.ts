import { ENABLED_DIGIT_COLOR, DISABLED_DIGIT_COLOR } from '../setup';
import { IRectangle } from '../types';

export default function drawDigit(
    context: CanvasRenderingContext2D | null,
    rect: IRectangle,
    digit: number
    ): void {

    const sectionAcolor = digit !== 1 && digit !== 4
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;

    const sectionBcolor = digit !== 5 && digit !== 6
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;

    const sectionCcolor = digit !== 2
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;

    const sectionDcolor = digit !== 1 && digit !== 4 && digit !== 7
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;

    const sectionEcolor = digit !== 1 && digit !== 3 && digit !== 4 &&
        digit !== 5 && digit !== 7 && digit !== 9
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;
    
    const sectionFcolor = digit !== 1 && digit !== 2 && digit !== 3 && digit !== 7
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;

    const sectionGcolor = digit !== 0 && digit !== 1 && digit !== 7
        ? ENABLED_DIGIT_COLOR
        : DISABLED_DIGIT_COLOR;

    const colors = [
        sectionAcolor,
        sectionBcolor,
        sectionCcolor,
        sectionDcolor,
        sectionEcolor,
        sectionFcolor,
        sectionGcolor
    ];

    const sidePadding = rect.width / 8;
    const sectionWidth = rect.width / 7;
    const sectionPadding = 2;
    const halfHeight = rect.height / 2;

    const drawing = [
        [
            // section A
            [
                rect.positionX + sidePadding,
                rect.positionY + sidePadding
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionPadding, 
                rect.positionY + sidePadding
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionPadding - sectionWidth, 
                rect.positionY + sidePadding + sectionWidth
            ],
            [
                rect.positionX + sidePadding + sectionWidth + sectionPadding,
                rect.positionY + sidePadding + sectionWidth
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + sidePadding 
            ]
        ],
        // section B
        [
            [
                rect.positionX + rect.width - sidePadding,
                rect.positionY + sidePadding
            ],
            [ //
                rect.positionX + rect.width - sidePadding,
                rect.positionY + halfHeight - sectionPadding
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionWidth,
                rect.positionY + halfHeight - sectionPadding - sectionWidth
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionWidth,
                rect.positionY + sidePadding + sectionWidth
            ],
            [
                rect.positionX + rect.width - sidePadding,
                rect.positionY + sidePadding 
            ]
        ],
        // section C
        [
            [
                rect.positionX + rect.width - sidePadding,
                rect.positionY + halfHeight + sectionPadding
            ],
            [
                rect.positionX + rect.width - sidePadding,
                rect.positionY + rect.height - sidePadding
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionWidth,
                rect.positionY + rect.height - sidePadding - sectionWidth
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionWidth,
                rect.positionY + halfHeight + sectionWidth + sectionPadding
            ],
            [
                rect.positionX + rect.width - sidePadding,
                rect.positionY + halfHeight + sectionPadding               
            ]
        ],
        // section D
        [
            [
                rect.positionX + rect.width - sidePadding - sectionPadding,
                rect.positionY + rect.height - sidePadding
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + rect.height - sidePadding
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + rect.height - sidePadding - sectionWidth               
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionPadding - sectionWidth,
                rect.positionY + rect.height - sidePadding - sectionWidth  
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionPadding,
                rect.positionY + rect.height - sidePadding                
            ]
        ],
        // section E
        [
            [
                rect.positionX + sidePadding,
                rect.positionY + rect.height - sidePadding - sectionPadding
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + halfHeight + sectionPadding
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + halfHeight + sectionPadding + sectionWidth
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + rect.height - sidePadding - sectionWidth - sectionPadding
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + rect.height - sidePadding - sectionPadding
            ]
        ],
        // section F
        [
            [
                rect.positionX + sidePadding,
                rect.positionY + halfHeight - sectionPadding
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + sidePadding + sectionPadding
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + sidePadding + sectionWidth
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + halfHeight - sectionWidth - sectionPadding
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + halfHeight - sectionPadding
            ]
        ],
        // section G
        [
            [
                rect.positionX + sidePadding,
                rect.positionY + halfHeight
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + halfHeight - sectionWidth / 2
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionPadding - sectionWidth,
                rect.positionY + halfHeight - sectionWidth / 2                
            ],
            [ //
                rect.positionX + rect.width - sidePadding,
                rect.positionY + halfHeight
            ],
            [
                rect.positionX + rect.width - sidePadding - sectionPadding - sectionWidth,
                rect.positionY + halfHeight + sectionWidth / 2
            ],
            [
                rect.positionX + sidePadding + sectionWidth,
                rect.positionY + halfHeight + sectionWidth / 2
            ],
            [
                rect.positionX + sidePadding,
                rect.positionY + halfHeight
            ]
        ],
    ];

    for(let i = 0; i < 7; ++i) {
        context.fillStyle = colors[i];
        context.beginPath();
        context.moveTo(drawing[i][0][0], drawing[i][0][1]);
        for(let j = 1; j < 5; ++j) {
            context.lineTo(drawing[i][j][0], drawing[i][j][1]);
        }
        if(i == 6) {
            context.lineTo(drawing[i][5][0], drawing[i][5][1]);
            context.lineTo(drawing[i][6][0], drawing[i][6][1]);            
        }
        context.fill();
    }
}