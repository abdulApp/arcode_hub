import assert from "assert";
import { Problem } from "../types/problem";
import example1 from "./images/search-a-2d-1.jpg";
import example2 from "./images/search-a-2d-2.jpg";

export const search2DMatrixHandler = (fn: any) => {
  try {
    const tests = [
      {
        matrix: [
          [1, 3, 5, 7],
          [10, 11, 16, 20],
          [23, 30, 34, 60],
        ],
        target: 3,
      },
      {
        matrix: [
          [1, 3, 5, 7],
          [10, 11, 16, 20],
          [23, 30, 34, 60],
        ],
        target: 13,
      },
    ];
    const answers = [true, false];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i].matrix, tests[i].target);
      assert.deepEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from searchA2DMatrixHandler: ", error);
    throw new Error(error);
  }
};
const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your code here
};`;

export const search2DMatrix: Problem = {
  id: "search-a-2d-matrix",
  title: "5.البحث في مصفوفة ثنائية الأبعاد",
  problemStatement: `
  <p class='mt-3'>الجملة: "اكتب خوارزمية فعالة تبحث عن قيمة في مصفوفة <code>m × n</code>. تحتوي هذه المصفوفة على الخصائص التالية:"</p>
	<li class="mt-3">الأعداد الصحيحة في كل صف مرتبة من اليسار إلى اليمين.</li>
	<li class="mt-3">العدد الصحيح الأول في كل صف أكبر من العدد الصحيح الأخير في الصف السابق.</li>
  <p class='mt-3'>تُعتبر الجملة: "بالنظر إلى المصفوفة <code>matrix</code>، وهي مصفوفة <code>m × n</code>، والقيمة المستهدفة <code>target</code>، أرجع <code>true</code> إذا كانت القيمة المستهدفة موجودة في المصفوفة، و<code>false</code> في حالة عدم وجودها."</p>
  `,
  examples: [
    {
      id: 0,
      inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
      outputText: `true`,
      img: example1.src,
    },
    {
      id: 1,
      inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
      outputText: `false`,
      img: example2.src,
    },
    {
      id: 2,
      inputText: `matrix = [[1]], target = 1`,
      outputText: `true`,
    },
  ],
  constraints: `
  <li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
  starterCode: starterCodeSearch2DMatrixJS,
  handlerFunction: search2DMatrixHandler,
  starterFunctionName: "function searchMatrix",
  order: 5,
};
