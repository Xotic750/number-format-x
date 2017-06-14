<a name="module_number-format-x"></a>

## number-format-x
<a href="https://travis-ci.org/Xotic750/number-format-x"
title="Travis status">
<img
src="https://travis-ci.org/Xotic750/number-format-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/number-format-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/number-format-x.svg"
alt="Dependency status" height="18"/>
</a>
<a
href="https://david-dm.org/Xotic750/number-format-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/number-format-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/number-format-x" title="npm version">
<img src="https://badge.fury.io/js/number-format-x.svg"
alt="npm version" height="18">
</a>

Format number module.

Requires ES3 or above.

**Version**: 1.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_number-format-x--module.exports"></a>

### `module.exports` ⇒ <code>string</code> ⏏
Format a given number using fixed-point notation, with user specified digit
counts and seperators.

**Kind**: Exported member  
**Returns**: <code>string</code> - The numerical value with the choosen formatting.  
**Throws**:

- <code>RangeError</code> If n is greater than 20.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The numerical value to be formatted. |
| n | <code>number</code> |  | Length of decimal. |
| x | <code>number</code> |  | Length of whole part. |
| [s] | <code>string</code> | <code>&quot;&#x27;,&#x27;&quot;</code> | Sections delimiter. |
| [c] | <code>string</code> | <code>&quot;&#x27;.&#x27;&quot;</code> | Decimal delimiter. |

**Example**  
```js
var numberFormat = require('number-format-x');

numberFormat(12345678.9, 2, 3);  // "12,345,678.90"
numberFormat(12345678.9, 2, 3, '.', ',');  // "12.345.678,90"
numberFormat(123456.789, 4, 4, ' ', ':');  // "12 3456:7890"
numberFormat(12345678.9, 0, 3, '-');       // "12-345-679"
```
