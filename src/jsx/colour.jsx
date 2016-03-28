(function(global){

    "use strict";

    var React = require("react");
    var ReactDOM = require("react-dom");
    var Utils = require("./utils.js");

    global.Colour = React.createClass({

        getInitialState: function(){

            return {

                "backgroundColor": "#f0f0f0",
                "borderColor": "#666666"
            };
        },

        componentWillUnmount: function(){

            //clean up any active timers
            window.clearTimeout(this.timer);
        },

        validateInputValue: function(){

            var value = document.getElementById("colour-input").value;
            value = value.toLowerCase();
            value = value.replace(/\s+/g, "");
            if(value[0] === "#") value = value.substring(1);

            if(value.length === 3 && this.validateHexValue(value)){

                //prevents a 3 digit hex value from swapping screen the color.
                window.clearTimeout(this.timer);
                this.timer = window.setTimeout(this.updateInputValue, 400);
            }
            else{

                window.clearTimeout(this.timer);
            }

            if((value.length === 6 && this.validateHexValue(value)) ||  value in Utils.COLOUR_LIST){

                this.updateInputValue();
            }
        },

        updateInputValue: function(){

            var value = document.getElementById("colour-input").value;
            value = value.toLowerCase();
            value = value.replace(/\s+/g, "");
            if(value[0] === "#") value = value.substring(1);

            var inverse = "#666666";

            //Translate a name from the color list to it's hex value.
            if(value in Utils.COLOUR_LIST) value = Utils.COLOUR_LIST[value].toLowerCase();

            //If the color value is not at the limits
            if(value != "ffffff" && value != "fff" && value != "000000" && value != "000"){

                //Get the complementary color
                inverse = Utils.INVERT_COLOR(value);
                inverse = Utils.SHIFT_LUMINANCE(inverse);
            }

            //Add a hash if needed
            if(value[0] != "#") value = "#"+ value;

            //set the colors
            this.setState({

                "backgroundColor": value,
                "borderColor": inverse,
            });
        },

        validateHexValue: function(hexValue){

            var valid = false;
            var R, G, B;

            if(hexValue[0] === "#") hexValue = hexValue.substring(1);

            //3 digit hex
            if(hexValue.length === 3){

                R = parseInt(hexValue[0], 16);
                G = parseInt(hexValue[1], 16);
                B = parseInt(hexValue[2], 16);
            }

            //6 digit hex
            if(hexValue.length === 6){

                R = parseInt(hexValue.substring(0,2), 16);
                G = parseInt(hexValue.substring(2,4), 16);
                B = parseInt(hexValue.substring(4,6), 16);
            }

            //if the hex value is the right length
            if(hexValue.length === 6 || hexValue.length === 3){

                //and all the values are numbers
                if(!isNaN(R) && !isNaN(G) && !isNaN(B)){

                    //and all of those numbers are between 0 and 255
                    if(R >= 0 && R <= 255 && G >= 0 && G <= 255 && B >= 0 && B <= 255){

                        valid = true;
                    }
                }
            }

            return valid;
        },

        render: function(){

            return (

                <div id="colour-container">
                        
                    <input id="colour-input" placeholder="Enter a color or code" onChange={ this.validateInputValue } style={{ "borderColor": this.state["borderColor"] }} />
                    <br />
                    <div id="colour-palette" style={{ "backgroundColor": this.state["backgroundColor"], "borderColor": this.state["borderColor"] }}>
                    </div>
                </div>
            )
        }
    });

    var colour = React.createElement(global.Colour);
    ReactDOM.render(colour, document.getElementById("main-container"));
    document.getElementById("colour-input").focus();
})(this);