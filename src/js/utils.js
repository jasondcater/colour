module.exports = {

    /**
     * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     *
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue
     * @param   Number  s       The saturation
     * @param   Number  l       The lightness
     * @return  Array           The RGB representation
     */
    HSL_TO_RGB: function(h, s, l){
    
        var r, g, b;
    
        if(s == 0){
    
            r = g = b = l; // achromatic
        }
        else{
    
            var hue2rgb = function hue2rgb(p, q, t){
    
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
    
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
    
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
    
    /**
     * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     *
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
    RGB_TO_HSL: function(r, g, b){
    
        r /= 255, g /= 255, b /= 255;
        
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
    
        if(max == min){
    
            h = s = 0; // achromatic
        }
        else{
    
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
    
                case r: 
                    
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g: 
    
                    h = (b - r) / d + 2; 
                    break;
                case b: 
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
    
        return [h, s, l];
    },
    
    HEX_TO_RGB: function(hexValue){
    
        if(hexValue[0] === "#") hexValue = hexValue.substring(1);
                
        var R = parseInt(hexValue.substring(0,2), 16);
        var G = parseInt(hexValue.substring(2,4), 16);
        var B = parseInt(hexValue.substring(4,6), 16);
    
        return [R, G, B];
    },
    
    RGB_TO_HEX: function(r, g, b){
    
        var byteOne = r.toString(16);
        var byteTwo = g.toString(16);
        var byteThree = b.toString(16);
    
        return "#"+ byteOne + byteTwo + byteThree;
    },
    
    INVERT_COLOR: function(hexValue){
    
        var color = hexValue;
        if(hexValue[0] === "#") color = hexValue.substring(1);
    
        color = parseInt(color, 16);          // convert to integer
        color = 0xFFFFFF ^ color;             // invert three bytes
        color = color.toString(16);           // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color;                  // prepend #
    
        return color;
    },
    
    SHIFT_LUMINANCE: function(hexValue){
    
        var rgb = this.HEX_TO_RGB(hexValue);
        var hsl = this.RGB_TO_HSL(rgb[0], rgb[1], rgb[2]);
    
        if(hsl[0] == 0) return "#666666";
    
        hsl[1] = 0.15;
        hsl[2] = 0.25;
        rgb = this.HSL_TO_RGB(hsl[0], hsl[1], hsl[2]);
        var hex = this.RGB_TO_HEX(rgb[0], rgb[1], rgb[2]);
    
        return hex;
    },
    
    //List of HTML Color Names
    COLOUR_LIST: {
    
        "indigo": "#4b0082",
        "gold": "#ffd700",
        "firebrick": "#b22222",
        "indianred": "#cd5c5c",
        "yellow": "#ffff00",
        "darkolivegreen": "#556b2f",
        "darkseagreen": "#8fbc8f",
        "slategrey": "#708090",
        "darkslategrey": "#2f4f4f",
        "mediumvioletred": "#c71585",
        "mediumorchid": "#ba55d3",
        "chartreuse": "#7fff00",
        "mediumslateblue": "#7b68ee",
        "black": "#000000",
        "springgreen": "#00ff7f",
        "crimson": "#dc143c",
        "lightsalmon": "#ffa07a",
        "brown": "#a52a2a",
        "turquoise": "#40e0d0",
        "olivedrab": "#6b8e23",
        "cyan": "#00ffff",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "gray": "#808080",
        "darkturquoise": "#00ced1",
        "goldenrod": "#daa520",
        "darkgreen": "#006400",
        "darkviolet": "#9400d3",
        "darkgray": "#a9a9a9",
        "lightpink": "#ffb6c1",
        "teal": "#008080",
        "darkmagenta": "#8b008b",
        "lightgoldenrodyellow": "#fafad2",
        "lavender": "#e6e6fa",
        "yellowgreen": "#9acd32",
        "thistle": "#d8bfd8",
        "violet": "#ee82ee",
        "navy": "#000080",
        "dimgrey": "#696969",
        "orchid": "#da70d6",
        "blue": "#0000ff",
        "ghostwhite": "#f8f8ff",
        "honeydew": "#f0fff0",
        "cornflowerblue": "#6495ed",
        "darkblue": "#00008b",
        "darkkhaki": "#bdb76b",
        "mediumpurple": "#9370db",
        "cornsilk": "#fff8dc",
        "red": "#ff0000",
        "bisque": "#ffe4c4",
        "slategray": "#708090",
        "darkcyan": "#008b8b",
        "khaki": "#f0e68c",
        "wheat": "#f5deb3",
        "deepskyblue": "#00bfff",
        "rebeccapurple": "#663399",
        "darkred": "#8b0000",
        "steelblue": "#4682b4",
        "aliceblue": "#f0f8ff",
        "lightslategrey": "#778899",
        "gainsboro": "#dcdcdc",
        "mediumturquoise": "#48d1cc",
        "floralwhite": "#fffaf0",
        "coral": "#ff7f50",
        "purple": "#800080",
        "lightgrey": "#d3d3d3",
        "lightcyan": "#e0ffff",
        "darksalmon": "#e9967a",
        "beige": "#f5f5dc",
        "azure": "#f0ffff",
        "lightsteelblue": "#b0c4de",
        "oldlace": "#fdf5e6",
        "greenyellow": "#adff2f",
        "royalblue": "#4169e1",
        "lightseagreen": "#20b2aa",
        "mistyrose": "#ffe4e1",
        "sienna": "#a0522d",
        "lightcoral": "#f08080",
        "orangered": "#ff4500",
        "navajowhite": "#ffdead",
        "lime": "#00ff00",
        "palegreen": "#98fb98",
        "burlywood": "#deb887",
        "seashell": "#fff5ee",
        "mediumspringgreen": "#00fa9a",
        "fuchsia": "#ff00ff",
        "papayawhip": "#ffefd5",
        "blanchedalmond": "#ffebcd",
        "peru": "#cd853f",
        "aquamarine": "#7fffd4",
        "white": "#ffffff",
        "darkslategray": "#2f4f4f",
        "tomato": "#ff6347",
        "ivory": "#fffff0",
        "dodgerblue": "#1e90ff",
        "lemonchiffon": "#fffacd",
        "chocolate": "#d2691e",
        "orange": "#ffa500",
        "forestgreen": "#228b22",
        "darkgrey": "#a9a9a9",
        "olive": "#808000",
        "mintcream": "#f5fffa",
        "antiquewhite": "#faebd7",
        "darkorange": "#ff8c00",
        "cadetblue": "#5f9ea0",
        "moccasin": "#ffe4b5",
        "limegreen": "#32cd32",
        "saddlebrown": "#8b4513",
        "grey": "#808080",
        "darkslateblue": "#483d8b",
        "lightskyblue": "#87cefa",
        "deeppink": "#ff1493",
        "plum": "#dda0dd",
        "aqua": "#00ffff",
        "darkgoldenrod": "#b8860b",
        "maroon": "#800000",
        "sandybrown": "#f4a460",
        "magenta": "#ff00ff",
        "tan": "#d2b48c",
        "rosybrown": "#bc8f8f",
        "pink": "#ffc0cb",
        "lightblue": "#add8e6",
        "palevioletred": "#db7093",
        "mediumseagreen": "#3cb371",
        "slateblue": "#6a5acd",
        "dimgray": "#696969",
        "powderblue": "#b0e0e6",
        "seagreen": "#2e8b57",
        "snow": "#fffafa",
        "mediumblue": "#0000cd",
        "midnightblue": "#191970",
        "paleturquoise": "#afeeee",
        "palegoldenrod": "#eee8aa",
        "whitesmoke": "#f5f5f5",
        "darkorchid": "#9932cc",
        "salmon": "#fa8072",
        "lightslategray": "#778899",
        "lawngreen": "#7cfc00",
        "lightgreen": "#90ee90",
        "lightgray": "#d3d3d3",
        "hotpink": "#ff69b4",
        "lightyellow": "#ffffe0",
        "lavenderblush": "#fff0f5",
        "linen": "#faf0e6",
        "mediumaquamarine": "#66cdaa",
        "green": "#008000",
        "blueviolet": "#8a2be2",
        "peachpuff": "#ffdab9"
    }
} 