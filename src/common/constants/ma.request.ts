export enum RESPONSE_MESSAGE {
    CONTINUE = 'CONTINUE',
    OK = 'OK',
    SUCCESS = 'SUCCESS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNSUPPORTED = 'UNSUPPORTED',
    INVALID_ENTRY = 'INVALID ENTRY',
    NOT_FOUND = 'NOT FOUND',
    NOT_ALLOWED = 'NOT ALLOWED',
    NOT_AVAILABLE = 'NOT AVAILABLE',
    NOT_EXPECTED = 'NOT EXPECTED',
}

export enum RESPONSE_STATUS {
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431
}

export enum COLORS {
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    CYAN = 'cyan',
    WHITE = 'white',
    GRAY = 'gray',
    GREY = 'grey',

    BGBLACK = 'bgBlack',
    BGRED = 'bgRed',
    BGGREEN = 'bgGreen',
    BGYELLOW = 'bgYellow',
    BGBLUE = 'bgBlue',
    BGMAGENTA ='bgMagenta',
    BGCYAN = 'bgCyan',
    BGWHITE = 'bgWhite',

    RESET = 'reset',
    BOLD = 'bold',
    DIM = 'dim',
    ITALIC = 'italic',
    UNDERLINE = 'underline',
    INVERSE = 'inverse',
    HIDDEN = 'hidden',
    STRIKETHROUGH = 'strikethrough',

    RAINBOW = 'rainbow',
    ZEBRA = 'zebra',
    AMERICA = 'america',
    TRAP = 'trap',
    RANDOM = 'random',
    ZALGO = 'zalgo',
}