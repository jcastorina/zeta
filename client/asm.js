function Calc(stdlib, foreign, heap) {
    "use asm";
    function add(a, b) {
        a = a|0;
        b = b|0;
        return (a + b)|0;
    }
    return {
        add: add
    };
}

var stdlib = null;
var foreign = null;
var heap = new ArrayBuffer(1000); // 1kb

// create module instance
var calc = Calc( stdlib, foreign, heap );

// call `add` function
var result = calc.add( 1, 2 );
console.log( result );