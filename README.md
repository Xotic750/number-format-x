<a href="https://travis-ci.org/Xotic750/number-format-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/number-format-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/number-format-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/number-format-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/number-format-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/number-format-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/number-format-x" title="npm version">
<img src="https://badge.fury.io/js/number-format-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_number-format-x"></a>

## number-format-x
Format a number.

**Version**: 2.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_number-format-x--module.exports"></a>

### `module.exports` ⇒ <code>string</code> ⏏
Format a given number using fixed-point notation, with user specified digit
counts and seperators. `ǹull` can be used for optional arguments to demote
that the default value is to be used.

**Kind**: Exported member  
**Returns**: <code>string</code> - The numerical value with the choosen formatting.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The numerical value to be formatted. |
| [digits] | <code>number</code> | <code>20</code> | The number of digits to appear after the  decimal point; this may be a value between 0 and 20, inclusive. |
| [sectionLength] | <code>number</code> | <code>3</code> | Length of integer part sections. |
| [sectionDelimiter] | <code>string</code> | <code>&quot;,&quot;</code> | Integer part section delimiter. |
| [decimalDelimiter] | <code>string</code> | <code>&quot;.&quot;</code> | Decimal delimiter. |

**Example**  
```js
var numberFormat = require('number-format-x');

numberFormat(12345678.9, 2);  // "12,345,678.90"
numberFormat(12345678.9, 2, null, '.', ',');  // "12.345.678,90"
numberFormat(123456.789, 4, 4, ' ', ':');  // "12 3456:7890"
numberFormat(12345678.9, 0, null, '-');       // "12-345-679"
```
