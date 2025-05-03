// import { useState, useEffect } from "react";
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/atom-one-dark.css";
// import axios from "axios";

// function App() {
//   const [code, setCode] = useState('');
//   const [review, setReview] = useState("");

//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   async function reviewCode() {
//     const response = await axios.post(
//       "http://localhost:3000/ai/get-response/",
//       { code }
//     );
//     setReview(response.data);
//   }

//   function handleFileUpload(event) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCode(e.target.result);
//       };
//       reader.readAsText(file);
//     }
//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
//       {/* Header */}
//       <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
//         AI Code Reviewer 🤖
//       </header>
//       <div className="flex flex-row gap-6 w-full max-w-6xl">
//         <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
//           {/*File Upload Button*/}
//           <input
//             type="file"
//             accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
//             onChange={handleFileUpload}
//             className="mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg"
//           />
//           {/*Code Editor*/}

//           <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
//             <Editor
//               value={code}
//               onValueChange={(code) => setCode(code)}
//               highlight={(code) =>
//                 prism.highlight(code, prism.languages.javascript, "javascript")
//               }
//               padding={10}
//               style={{ fontFamily: "Fire Code, monospace", fontsize: 16 }}
//             ></Editor>
//           </div>

//           <button
//             onClick={reviewCode}
//             className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600  rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
//           >
//             Review Code 🤖
//           </button>
//         </div>
//         <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
//           {/* <Markdown rehypePlugins={[rehypeHighlight]} className="text-gray-300">
//             {review}
//           </Markdown> */}
//           <div className="text-gray-300">
//             <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post(
      "http://code-review-backend-ten.vercel.app/ai/get-response/",
      { code }
    );
    setReview(response.data);
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white px-6 py-10 gap-10 font-sans">
      {/* Header */}
      <header className="w-full text-center py-6 text-4xl font-extrabold tracking-wide text-white bg-gradient-to-r from-sky-600 to-indigo-700 shadow-xl rounded-2xl">
        🧠 AI Code Reviewer
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl">
        {/* Code Editor Panel */}
        <div className="w-full lg:w-1/2 bg-[#1f2937] p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col gap-4">
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            onChange={handleFileUpload}
            className="text-sm text-gray-300 bg-[#374151] hover:bg-[#4b5563] transition-colors p-3 rounded-md cursor-pointer"
          />

          <div className="border border-gray-600 rounded-xl p-4 bg-[#111827] h-[400px] overflow-auto font-mono text-sm">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={12}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
              }}
            />
          </div>

          <button
            onClick={reviewCode}
            className="mt-2 py-3 text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-indigo-500 hover:to-sky-500 rounded-xl shadow-md transition transform hover:scale-105"
          >
            🔍 Analyze & Review
          </button>
        </div>

        {/* Markdown Review Panel */}
        <div className="w-full lg:w-1/2 bg-[#1f2937] p-6 rounded-2xl shadow-xl border border-gray-700 overflow-auto h-[500px]">
          <div className="text-gray-200 prose prose-invert max-w-none font-mono text-sm leading-relaxed">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
