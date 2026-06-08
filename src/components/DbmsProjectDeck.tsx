/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { SQL_SCHEMA_SCRIPT, DATA_DICTIONARY, UML_PLANTUML_CODE, REPORT_CHAPTERS, SQL_PLAYGROUND_QUERIES } from "../data/reportData";

export default function DbmsProjectDeck() {
  const [activeSubTab, setActiveSubTab] = useState("playground");
  const [selectedQueryId, setSelectedQueryId] = useState(SQL_PLAYGROUND_QUERIES[0].id);
  const [customSQLInput, setCustomSQLInput] = useState(SQL_PLAYGROUND_QUERIES[0].sql);
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [activeChapterId, setActiveChapterId] = useState("ch1");
  const [copiedTextState, setCopiedTextState] = useState(false);

  const handleQueryChange = (queryId: string) => {
    const q = SQL_PLAYGROUND_QUERIES.find((item) => item.id === queryId);
    if (q) {
      setSelectedQueryId(queryId);
      setCustomSQLInput(q.sql);
      setQueryResults(null);
    }
  };

  const handleRunSQL = () => {
    // Run pre-cooked relational logic matching chosen query index
    const q = SQL_PLAYGROUND_QUERIES.find((item) => item.id === selectedQueryId);
    if (q) {
      setQueryResults(q.expectedResults);
    } else {
      // General fall back
      setQueryResults([{ Warning: "SQL statement simulated successfully. Parameter validation matches 3NF." }]);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextState(true);
    setTimeout(() => setCopiedTextState(false), 2000);
  };

  const currentChapterObj = REPORT_CHAPTERS.find((ch) => ch.id === activeChapterId) || REPORT_CHAPTERS[0];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="material-symbols-outlined text-3xl">school</span>
          <span className="text-sm font-bold tracking-widest uppercase">VTU Academic Lab Defense</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">SmartLife Relational DBMS Portal</h2>
        <p className="text-slate-400 font-medium max-w-3xl">
          An engineering-grade project hub presenting the normalized database system mapping instructions, normalization schemes up to 3NF, testing catalogs, and interactive SQL executing terminals.
        </p>
      </div>

      {/* Sub-NavigationBar Tabs */}
      <div className="flex border-b border-white/5 gap-1 overflow-x-auto no-scrollbar py-1">
        {[
          { id: "playground", label: "💻 SQL Playground Terminal", icon: "terminal" },
          { id: "report", label: "📖 VTU 9-Chapter Report", icon: "auto_stories" },
          { id: "dictionary", label: "📋 Data Schema Dictionary", icon: "database" },
          { id: "uml_script", label: "📐 UML & SQL Installation Scripts", icon: "code" },
        ].map((subTab) => (
          <button
            key={subTab.id}
            onClick={() => setActiveSubTab(subTab.id)}
            className={`cursor-pointer px-5 py-3 rounded-xl font-bold text-sm shrink-0 duration-200 flex items-center gap-2 ${
              activeSubTab === subTab.id
                ? "bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-440 text-emerald-400 shadow-sm"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm font-bold">{subTab.icon}</span>
            <span>{subTab.label}</span>
          </button>
        ))}
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* 1. PLAYGROUND TERMINAL */}
      {activeSubTab === "playground" && (
        <div className="space-y-6">
          <div className="bg-[#161921] border-l-4 border-emerald-accent p-4 rounded-r-xl text-slate-300 text-sm leading-relaxed">
            <h4 className="font-extrabold text-emerald-400 mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined">info</span>
              <span>DBMS Examiner Quick Tip</span>
            </h4>
            <p className="font-medium">
              This sandbox is backed by pre-seeded mock index logs mimicking actual MySQL schema state tables. Select standard operations (subqueries, outer joins, self-joins) from the dropdown and click <strong>RUN SQL</strong> to observe the relational output sets in the console!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Control Column */}
            <div className="lg:col-span-4 bg-[#161921] border border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-white font-sans tracking-tight text-md">Choose Relational Query</h3>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">PRELOADED SUBMISSIONS</p>
              
              <div className="space-y-2">
                {SQL_PLAYGROUND_QUERIES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQueryChange(item.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-bold leading-relaxed border transition cursor-pointer flex flex-col gap-1 ${
                      selectedQueryId === item.id
                        ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-400"
                        : "border-white/5 hover:bg-white/5 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] font-medium text-slate-500 font-mono truncate lowercase">{item.sql.substring(0, 45)}...</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SQL Terminal Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Code Input */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-white/5 shadow-md">
                <div className="bg-dark-sidebar px-5 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-2">slms_playground_engine</span>
                  </div>
                  <button 
                    onClick={() => handleCopyCode(customSQLInput)}
                    className="text-xs text-slate-450 text-slate-400 hover:text-white transition flex items-center gap-1 font-mono font-medium cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">content_copy</span>
                    <span>{copiedTextState ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed text-emerald-400 bg-dark-bg overflow-x-auto min-h-[140px] whitespace-pre">
                  {customSQLInput}
                </div>
                <div className="bg-dark-bg px-5 py-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={handleRunSQL}
                    className="bg-emerald-accent hover:bg-emerald-600 text-black font-extrabold text-sm px-6 py-2.5 rounded-xl shadow cursor-pointer active:scale-95 duration-150 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">play_arrow</span>
                    <span>RUN SQL</span>
                  </button>
                </div>
              </div>

              {/* Outputs Frame */}
              <div className="bg-[#161921] border border-white/5 rounded-2xl p-6 shadow-sm min-h-[220px] flex flex-col">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <h4 className="font-extrabold text-sm uppercase tracking-widest text-white font-mono">Terminal Output Console</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-emerald-accent/20 font-bold bg-emerald-accent/10 text-emerald-400">MySQL Connection: Stable</span>
                </div>

                {queryResults ? (
                  <div className="flex-1 overflow-x-auto no-scrollbar font-mono text-xs">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-dark-bg text-slate-400 text-left border-b border-white/10">
                          {Object.keys(queryResults[0]).map((key) => (
                            <th key={key} className="px-4 py-3 capitalize">{key.replace(/_/g, " ")}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {queryResults.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/5">
                            {Object.values(row).map((val: any, vIdx) => (
                              <td key={vIdx} className="px-4 py-3 font-medium text-slate-200">
                                {typeof val === "object" ? JSON.stringify(val) : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 gap-2">
                    <span className="material-symbols-outlined text-3xl">terminal</span>
                    <p className="font-semibold text-xs">Query results console is empty. Click "RUN SQL" to query schemas.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 2. REPORT MANUALS CHAPTER SELECT */}
      {activeSubTab === "report" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Timeline Nav sidebar */}
          <div className="lg:col-span-4 bg-[#161921] border border-white/5 p-6 rounded-2xl shadow-sm space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
            <h3 className="font-bold text-white mb-4 tracking-tight">Report Contents</h3>
            {REPORT_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapterId(ch.id)}
                className={`w-full text-left p-3 rounded-xl transition duration-150 text-sm font-semibold cursor-pointer ${
                  activeChapterId === ch.id
                    ? "bg-emerald-accent/10 text-emerald-400 font-bold border-l-4 border-emerald-accent"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {ch.title}
              </button>
            ))}
          </div>

          {/* Chapter Display Panel */}
          <div className="lg:col-span-8 bg-[#161921] border border-white/5 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-2xl font-black text-white tracking-tight">{currentChapterObj.title}</h3>
            </div>
            
            {/* Simulated Markdown Renderer */}
            <div className="prose prose-slate max-w-none text-slate-300 text-sm leading-relaxed space-y-4 font-normal">
              {currentChapterObj.content.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("### ")) {
                  return <h4 key={pIdx} className="text-lg font-bold text-white pt-4 pb-1">{para.substring(4)}</h4>;
                }
                if (para.startsWith("#### ")) {
                  return <h5 key={pIdx} className="text-sm font-bold text-emerald-accent uppercase tracking-widest pt-2 pb-1">{para.substring(5)}</h5>;
                }
                if (para.startsWith("1. ") || para.startsWith("- ")) {
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-2">
                      {para.split("\n").map((li, lIdx) => (
                        <li key={lIdx} className="font-medium text-slate-300">{li.replace(/^(\d+\.|-)\s+/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (para.startsWith("`") || para.startsWith("```")) {
                  // code block
                  const cleanCode = para.replace(/```/g, "");
                  return (
                    <pre key={pIdx} className="bg-dark-bg text-emerald-400 border border-white/5 font-mono text-xs rounded-xl p-4 overflow-x-auto whitespace-pre leading-relaxed shadow-sm">
                      {cleanCode}
                    </pre>
                  );
                }
                if (para.includes("|")) {
                  // simple markdown table parsed raw
                  const rows = para.split("\n").filter((r) => r.trim());
                  return (
                    <div key={pIdx} className="overflow-x-auto py-2">
                      <table className="w-full text-xs font-mono border-collapse">
                        <thead>
                          <tr className="bg-dark-bg border-b border-white/10">
                            {rows[0].split("|").filter((c) => c.trim()).map((cell, cIdx) => (
                              <th key={cIdx} className="px-3 py-2 text-left font-bold capitalize text-slate-300">{cell.trim()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {rows.slice(2).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-white/5">
                              {row.split("|").filter((c) => c.trim()).map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-3 py-2 text-slate-300 font-medium">{cell.trim()}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return <p key={pIdx} className="leading-relaxed whitespace-pre-wrap text-slate-300">{para}</p>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. SCHEMA DATA DICTIONARY */}
      {activeSubTab === "file" || activeSubTab === "dictionary" && (
        <div className="space-y-8">
          <div className="bg-[#161921] border border-white/5 p-5 rounded-2xl max-w-3xl">
            <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-emerald-accent">verified_user</span>
              <span>Normalized DBMS Schema Dictionary</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold font-sans">
              This dictionary defines parameters conformant to 3NF standards. Primary and foreign keys are explicitly mapped along with cardinal validation checks.
            </p>
          </div>

          <div className="space-y-6">
            {DATA_DICTIONARY.map((dict, idx) => (
              <div key={idx} className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-dark-sidebar px-6 py-4 border-b border-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-accent">grid_on</span>
                  <span className="font-bold text-white text-md font-mono">Table: {dict.tableName}</span>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-slate-400 font-medium text-xs font-sans leading-relaxed">{dict.description}</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono border-collapse text-left">
                      <thead>
                        <tr className="bg-dark-bg border-b border-white/10 text-slate-400">
                          <th className="px-4 py-2 font-bold uppercase">Column Name</th>
                          <th className="px-4 py-2 font-bold uppercase">Data Type</th>
                          <th className="px-4 py-2 font-bold uppercase">Key Type</th>
                          <th className="px-4 py-2 font-bold uppercase">Constraints</th>
                          <th className="px-4 py-2 font-bold uppercase">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        {dict.columns.map((col, cIdx) => (
                          <tr key={cIdx} className="hover:bg-white/5">
                            <td className="px-4 py-3 font-semibold text-emerald-400 font-mono">{col.name}</td>
                            <td className="px-4 py-3 text-slate-400">{col.type}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black ${
                                col.key === "PK" ? "bg-rose-500/10 text-rose-400 border border-rose-900/30" :
                                col.key === "FK" ? "bg-amber-500/10 text-amber-400 border border-amber-950/30" : "text-slate-500"
                              }`}>{col.key}</span>
                            </td>
                            <td className="px-4 py-3 text-slate-500">{col.constraint}</td>
                            <td className="px-4 py-3 text-slate-450 text-slate-400 leading-normal font-sans">{col.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CODES AND SCRIPTS */}
      {activeSubTab === "uml_script" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SQL Installation Block */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-white flex items-center gap-1.5 text-md font-sans">
                <span className="material-symbols-outlined text-emerald-accent">source</span>
                <span>Complete MySQL Script</span>
              </h3>
              <button
                onClick={() => handleCopyCode(SQL_SCHEMA_SCRIPT)}
                className="text-xs text-emerald-400 hover:underline hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">content_copy</span>
                <span>Copy Script</span>
              </button>
            </div>
            <pre className="bg-dark-bg text-emerald-400 border border-white/5 p-5 rounded-2xl h-[420px] overflow-y-auto no-scrollbar font-mono text-[11px] leading-relaxed shadow-md whitespace-pre">
              {SQL_SCHEMA_SCRIPT}
            </pre>
          </div>

          {/* PlantUML Class Diagram Block */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-white flex items-center gap-1.5 text-md font-sans">
                <span className="material-symbols-outlined text-emerald-accent">conversion_path</span>
                <span>UML Class Diagram (PlantUML)</span>
              </h3>
              <button
                onClick={() => handleCopyCode(UML_PLANTUML_CODE)}
                className="text-xs text-emerald-400 hover:underline hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">content_copy</span>
                <span>Copy UML Code</span>
              </button>
            </div>
            <pre className="bg-dark-bg text-emerald-400 border border-white/5 p-5 rounded-2xl h-[420px] overflow-y-auto no-scrollbar font-mono text-[11px] leading-relaxed shadow-md whitespace-pre">
              {UML_PLANTUML_CODE}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
}
