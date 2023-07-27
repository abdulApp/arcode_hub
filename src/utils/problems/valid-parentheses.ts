import assert from "assert";
import { Problem } from "../types/problem";

export const validParenthesesHandler = (fn: any) => {
  try {
    const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
    const answers = [true, true, false, false, true];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.deepEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.error("Error from validParenthesesHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
};`;

export const validParentheses: Problem = {
  id: "valid-parentheses",
  title: "4. الاقواس الصالحة",
  problemStatement: `<p class='mt-3'>يعتبر السؤال: "بالنظر إلى السلسلة <code>s</code> التي تحتوي على الاقواس التالية فقط: <code>'('</code>، <code>')'</code>، <code>'{'</code>، <code>'}'</code>، <code>'['</code>، و <code>']'</code>، قم بتحديد ما إذا كانت السلسلة المدخلة صالحة."</p> 
	<p class='mt-3'>الجملة: "تعتبر السلسلة المُدخلة صالحة إذا:"</p> 
	<ul>
  <li class='mt-2'>يجب إغلاق الأقواس المفتوحة بنوع نفس الأقواس.</li>
  <li class='mt-3'>يجب إغلاق الأقواس المفتوحة بالترتيب الصحيح.</li>
  <li class='mt-3'>كل أقواس الإغلاق يجب أن تكون لها نقطة بداية مفتوحة من نفس النوع.</li>
	</ul>`,
  examples: [
    {
      id: 0,
      inputText: 's = "()"',
      outputText: "true",
    },
    {
      id: 1,
      inputText: 's = "()[]{}"',
      outputText: "true",
    },
    {
      id: 2,
      inputText: 's = "(]"',
      outputText: "false",
    },
    {
      id: 3,
      inputText: 's = "([)]"',
      outputText: "false",
    },
  ],
  constraints: `<li class='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li class='mt-2 '><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
  handlerFunction: validParenthesesHandler,
  starterCode: starterCodeValidParenthesesJS,
  starterFunctionName: "function validParentheses(",
  order: 4,
};
