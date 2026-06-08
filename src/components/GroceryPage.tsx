/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { GroceryItem } from "../types";

interface GroceryPageProps {
  groceryItems: GroceryItem[];
  onAddGroceryItem: (item: { item_name: string; category: string; quantity: number; threshold_level: number }) => void;
  onUpdateGroceryQuantity: (itemId: number, quantity: number) => void;
  onDeleteGroceryItem: (itemId: number) => void;
}

export default function GroceryPage({
  groceryItems,
  onAddGroceryItem,
  onUpdateGroceryQuantity,
  onDeleteGroceryItem,
}: GroceryPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Dairy");
  const [quantity, setQuantity] = useState(2);
  const [thresholdLevel, setThresholdLevel] = useState(2);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    onAddGroceryItem({
      item_name: itemName.trim(),
      category,
      quantity,
      threshold_level: thresholdLevel,
    });
    setItemName("");
    setQuantity(2);
    setThresholdLevel(2);
  };

  const categories = ["All", "Dairy", "Pantry", "Produce", "Meat"];

  // Filter grocery lists based on active category
  const filteredItems = groceryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const lowStockItems = groceryItems.filter((g) => g.quantity <= g.threshold_level);
  const outOfStockItems = groceryItems.filter((g) => g.quantity === 0);

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight animate-fade-in">Grocery Supply Monitor</h2>
        <p className="text-slate-400 font-medium">Coordinate refrigerator ingredients, safety levels, and shopping warnings.</p>
      </div>

      {/* Critical Stock warnings Block */}
      {lowStockItems.length > 0 && (
        <div className="bg-[#241e17] border-l-4 border-amber-500 rounded-r-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <span className="material-symbols-outlined text-2xl font-bold">warning</span>
            <span className="font-extrabold text-md font-sans">Critical Low Stock Warning Triggers</span>
          </div>
          <p className="text-amber-200 font-semibold text-xs">
            The following food staples have dropped onto or beneath threshold levels. Active DBMS triggers have automatically appended event reminders.
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {lowStockItems.map((item) => (
              <div key={item.item_id} className="bg-dark-bg border border-amber-900/30 px-3 py-1.5 rounded-xl shrink-0 text-[11px] font-bold text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>{item.item_name} (Qty: {item.quantity})</span>
                <button
                  onClick={() => onUpdateGroceryQuantity(item.item_id, item.threshold_level + 5)}
                  className="bg-amber-500/20 uppercase text-[9px] px-2 py-0.5 rounded cursor-pointer text-amber-300 font-black hover:bg-amber-500/30 transition"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top metrics grids */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#161921] border border-white/5 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-slate-500 font-extrabold uppercase text-[10px] tracking-wider mb-1">Total Ingredients</div>
          <div className="text-3xl font-black text-white">{groceryItems.length}</div>
        </div>
        <div className="bg-[#161921] border border-white/5 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-amber-500 font-extrabold uppercase text-[10px] tracking-wider mb-1">Low Stock Limit</div>
          <div className="text-3xl font-black text-amber-500">{lowStockItems.length}</div>
        </div>
        <div className="bg-[#161921] border border-white/5 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-rose-450 text-rose-400 font-extrabold uppercase text-[10px] tracking-wider mb-1">Out Of Stock</div>
          <div className="text-3xl font-black text-rose-500 text-rose-400">{outOfStockItems.length}</div>
        </div>
        <div className="bg-[#161921] border border-white/5 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-slate-500 font-extrabold uppercase text-[10px] tracking-wider mb-1">Domestic Health Index</div>
          <div className="text-3xl font-black text-emerald-400">Optimized</div>
        </div>
      </div>

      {/* Category Selection Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-full border shrink-0 transition ${
              activeCategory === cat
                ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-400 shadow-sm"
                : "border-white/5 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Column A: Add Supply Item */}
        <div className="lg:col-span-4 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm h-fit space-y-6">
          <h3 className="font-extrabold text-white text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-accent text-lg">edit_note</span>
            <span>Record Staple</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-400" htmlFor="item_name">Product Label Name</label>
              <input
                className="w-full bg-dark-bg border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 focus:border-emerald-accent text-sm font-medium placeholder:text-slate-600"
                id="item_name"
                placeholder="Organic Milk (1L)..."
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400" htmlFor="category">Commodity Category</label>
              <select
                className="w-full bg-dark-bg border border-white/10 p-3 rounded-xl focus:outline-none text-sm font-semibold text-white focus:border-emerald-accent"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Dairy" className="bg-[#161921] text-white">Dairy Products</option>
                <option value="Pantry" className="bg-[#161921] text-white">Pantry Staples</option>
                <option value="Produce" className="bg-[#161921] text-white">Produce Green</option>
                <option value="Meat" className="bg-[#161921] text-white">Meat Cuts</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400" htmlFor="quantity">Store Qty</label>
                <input
                  className="w-full bg-dark-bg border border-white/10 text-white p-3 rounded-xl focus:outline-none text-sm font-semibold focus:border-emerald-accent"
                  id="quantity"
                  type="number"
                  min="0"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400" htmlFor="threshold">Alert Threshold</label>
                <input
                  className="w-full bg-dark-bg border border-white/10 text-white p-3 rounded-xl focus:outline-none text-sm font-semibold focus:border-emerald-accent"
                  id="threshold"
                  type="number"
                  min="1"
                  required
                  value={thresholdLevel}
                  onChange={(e) => setThresholdLevel(Number(e.target.value))}
                />
              </div>
            </div>

            <button
              className="w-full py-3 rounded-xl bg-emerald-accent hover:bg-emerald-600 font-extrabold text-black text-sm transition active:scale-95 duration-100 cursor-pointer flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Register In-stock</span>
            </button>
          </form>
        </div>

        {/* Column B: Render Commodities Table */}
        <div className="lg:col-span-8 bg-[#161921] border border-white/5 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-dark-bg border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Ingredient Title</th>
                  <th className="px-6 py-4">Food Group</th>
                  <th className="px-6 py-4 text-center">Quantity Log</th>
                  <th className="px-6 py-4 text-center">Alert Limit</th>
                  <th className="px-6 py-4">Stock Factor</th>
                  <th className="px-6 py-3 text-right">Delete Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredItems.map((item) => {
                  const isLow = item.quantity <= item.threshold_level;
                  const isOut = item.quantity === 0;
                  return (
                    <tr key={item.item_id} className="hover:bg-white/5">
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-white text-sm block">{item.item_name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">ID: #{item.item_id}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{item.category}</td>
                      <td className="px-6 py-4 select-none">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => onUpdateGroceryQuantity(item.item_id, Math.max(0, item.quantity - 1))}
                            className="w-7 h-7 bg-dark-bg border border-white/10 text-slate-300 rounded-lg hover:bg-white/10 transition font-black flex items-center justify-center text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-mono text-sm font-bold text-white w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateGroceryQuantity(item.item_id, item.quantity + 1)}
                            className="w-7 h-7 bg-dark-bg border border-white/10 text-slate-300 rounded-lg hover:bg-white/10 transition font-black flex items-center justify-center text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-slate-400">{item.threshold_level} units</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                          isOut ? "bg-rose-500/10 text-rose-400 border border-rose-900/30" :
                          isLow ? "bg-amber-500/10 text-amber-400 border border-amber-950/30" : "bg-emerald-500/10 text-emerald-440 text-emerald-400 border border-emerald-900/30"
                        }`}>
                          {isOut ? "OUT OF STOCK" : isLow ? "LOW STOCK" : "ADEQUATE"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onDeleteGroceryItem(item.item_id)}
                          className="text-rose-400 hover:bg-rose-500/10 p-2 rounded-full duration-150 cursor-pointer active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
