/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { GroceryItem } from "../types";

interface GroceryPageProps {
  groceryItems: GroceryItem[];
  onAddGroceryItem: (item: { 
    item_name: string; 
    category: string; 
    quantity: number; 
    threshold_level: number;
    sensor_weight_g?: number;
    original_weight_g?: number;
    sensor_enabled?: boolean;
    automatic_restock?: boolean;
  }) => void;
  onUpdateGroceryQuantity: (itemId: number, quantity: number) => void;
  onDeleteGroceryItem: (itemId: number) => void;
  onUpdateGrocerySensorWeight: (itemId: number, weightG: number) => void;
}

export default function GroceryPage({
  groceryItems,
  onAddGroceryItem,
  onUpdateGroceryQuantity,
  onDeleteGroceryItem,
  onUpdateGrocerySensorWeight,
}: GroceryPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Dairy");
  const [quantity, setQuantity] = useState(5);
  const [thresholdLevel, setThresholdLevel] = useState(2);

  // IoT Sensor state additions
  const [sensorEnabled, setSensorEnabled] = useState(true);
  const [originalWeightG, setOriginalWeightG] = useState(1000);
  const [automaticRestock, setAutomaticRestock] = useState(true);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    onAddGroceryItem({
      item_name: itemName.trim(),
      category,
      quantity: sensorEnabled ? 10 : quantity,
      threshold_level: thresholdLevel,
      sensor_enabled: sensorEnabled,
      original_weight_g: sensorEnabled ? originalWeightG : undefined,
      sensor_weight_g: sensorEnabled ? originalWeightG : undefined,
      automatic_restock: sensorEnabled ? automaticRestock : false,
    });

    setItemName("");
    setQuantity(5);
    setThresholdLevel(2);
    setSensorEnabled(true);
    setOriginalWeightG(1000);
    setAutomaticRestock(true);
  };

  const categories = ["All", "Dairy", "Pantry", "Produce", "Meat"];

  // Filter lists
  const filteredItems = groceryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const lowStockItems = groceryItems.filter((g) => {
    if (g.sensor_enabled && g.sensor_weight_g !== undefined) {
      return (g.sensor_weight_g / (g.original_weight_g || 1000)) <= 0.2;
    }
    return g.quantity <= g.threshold_level;
  });

  const outOfStockItems = groceryItems.filter((g) => {
    if (g.sensor_enabled && g.sensor_weight_g !== undefined) {
      return g.sensor_weight_g === 0;
    }
    return g.quantity === 0;
  });

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Smart Pantry & Refrigerator Inventory</h2>
          <p className="text-slate-500 font-medium text-sm">Automated scale weight tracking checks levels continuously, executing drone restocking runs on autopilot.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl font-bold text-xs">
          <span className="material-symbols-outlined text-[16px] animate-pulse">sensors</span>
          <span>Scales Online: {groceryItems.filter(i => i.sensor_enabled).length} Active Channels</span>
        </div>
      </div>

      {/* Warnings Block */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-800">
            <span className="material-symbols-outlined text-2xl font-bold animate-bounce">warning</span>
            <span className="font-extrabold text-md">Autonomous Weight & Level Triggers Low</span>
          </div>
          <p className="text-amber-700 font-medium text-xs leading-relaxed">
            The following items triggered depleted status. Refrigerator scales detected less than 20% capacity or quantity levels dropped below the safe limits.
          </p>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
            {lowStockItems.map((item) => {
              const isSensor = item.sensor_enabled && item.sensor_weight_g !== undefined;
              const remainingVal = isSensor ? `${item.sensor_weight_g} / ${item.original_weight_g}g` : `Qty: ${item.quantity}`;
              return (
                <div key={item.item_id} className="bg-white border border-amber-200 px-3.5 py-2 rounded-xl shrink-0 text-[11px] font-bold text-amber-800 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>{item.item_name} ({remainingVal})</span>
                  {item.automatic_restock ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 font-black uppercase">
                      <span className="material-symbols-outlined text-[10px]">flight_takeoff</span>
                      Drone Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (isSensor) {
                          onUpdateGrocerySensorWeight(item.item_id, item.original_weight_g || 1000);
                        } else {
                          onUpdateGroceryQuantity(item.item_id, item.threshold_level + 5);
                        }
                      }}
                      className="bg-amber-100 uppercase text-[9px] px-2 py-0.5 rounded cursor-pointer text-amber-900 font-extrabold hover:bg-amber-200 transition"
                    >
                      Fill Up
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Metrics Grids */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs text-center">
          <div className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider mb-1">Total Ingredients</div>
          <div className="text-3xl font-black text-slate-900">{groceryItems.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs text-center">
          <div className="text-amber-600 font-extrabold uppercase text-[10px] tracking-wider mb-1">Low Staples</div>
          <div className="text-3xl font-black text-amber-500">{lowStockItems.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs text-center">
          <div className="text-rose-600 font-extrabold uppercase text-[10px] tracking-wider mb-1">Out of Stock</div>
          <div className="text-3xl font-black text-rose-500">{outOfStockItems.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs text-center">
          <div className="text-emerald-600 font-extrabold uppercase text-[10px] tracking-wider mb-1">Autonomous Restock Support</div>
          <div className="text-3xl font-black text-emerald-600">Drone Ready</div>
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
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs font-extrabold"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs h-fit space-y-6">
          <h3 className="font-extrabold text-slate-900 text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-lg font-bold">edit_note</span>
            <span>Register Domestic Staple</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-500 font-semibold" htmlFor="item_name">Label Name / Recipe Target</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium placeholder:text-slate-400 placeholder:font-normal shadow-inner"
                id="item_name"
                placeholder="Organic Milk (1L)..."
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-500 font-semibold" htmlFor="category">Commodity Category</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none text-sm font-semibold text-slate-700 focus:border-emerald-500"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Dairy">Dairy Products</option>
                <option value="Pantry">Pantry Staples</option>
                <option value="Produce">Produce Green</option>
                <option value="Meat">Meat Cuts</option>
              </select>
            </div>

            {/* IoT Weight Scale Switcher */}
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl space-y-3">
              <label className="flex items-center gap-2 text-slate-700 font-bold select-none cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-emerald-500 focus:ring-emerald-500/30 w-4 h-4 cursor-pointer"
                  checked={sensorEnabled}
                  onChange={(e) => setSensorEnabled(e.target.checked)}
                />
                <span>IoT Weight Scale Enabled</span>
              </label>

              {sensorEnabled ? (
                <div className="space-y-3.5 pt-2 border-t border-slate-200/60 transition-all duration-300">
                  <div className="space-y-1">
                    <label className="text-slate-400 block text-[10px] uppercase font-bold" htmlFor="capacity">Full Capacity (grams)</label>
                    <input
                      className="w-full bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg focus:outline-none text-xs font-semibold focus:border-emerald-500"
                      id="capacity"
                      type="number"
                      min="100"
                      max="10000"
                      value={originalWeightG}
                      onChange={(e) => setOriginalWeightG(Number(e.target.value))}
                    />
                  </div>
                  
                  <label className="flex items-center gap-2 text-slate-600 text-[11px] cursor-pointer font-medium select-none">
                    <input 
                      type="checkbox" 
                      className="rounded text-emerald-500 w-3.5 h-3.5 cursor-pointer"
                      checked={automaticRestock}
                      onChange={(e) => setAutomaticRestock(e.target.checked)}
                    />
                    <span>Autopilot Automatic Restocking</span>
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="text-slate-400 block text-[10px] uppercase font-bold" htmlFor="quantity">Store Qty</label>
                    <input
                      className="w-full bg-white border border-slate-200 text-slate-750 px-3 py-2 rounded-lg focus:outline-none text-xs font-semibold focus:border-emerald-500"
                      id="quantity"
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block text-[10px] uppercase font-bold" htmlFor="threshold">Alert Threshold</label>
                    <input
                      className="w-full bg-white border border-slate-200 text-slate-750 px-3 py-2 rounded-lg focus:outline-none text-xs font-semibold focus:border-emerald-500"
                      id="threshold"
                      type="number"
                      min="1"
                      value={thresholdLevel}
                      onChange={(e) => setThresholdLevel(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-extrabold text-white text-sm transition active:scale-95 duration-100 cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/10"
              type="submit"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span>Register Pantry Staple</span>
            </button>
          </form>
        </div>

        {/* Commodity Stock Tables Column */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Ingredient Title & Scale</th>
                  <th className="px-6 py-4">Food Group</th>
                  <th className="px-6 py-4 text-center">Remaining Quantity / Weight Volume Sensor</th>
                  <th className="px-6 py-4 text-center">Auto Restocks</th>
                  <th className="px-6 py-4 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredItems.map((item) => {
                  const hasSensor = item.sensor_enabled && item.sensor_weight_g !== undefined;
                  const pct = hasSensor ? Math.round((item.sensor_weight_g || 0) / (item.original_weight_g || 1000) * 100) : 0;
                  const isLow = hasSensor ? (pct <= 20) : (item.quantity <= item.threshold_level);
                  const isOut = hasSensor ? (item.sensor_weight_g === 0) : (item.quantity === 0);

                  return (
                    <tr key={item.item_id} className="hover:bg-slate-50/40">
                      
                      {/* Name & ID column */}
                      <td className="px-6 py-4 max-w-xs">
                        <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 leading-tight">
                          {item.item_name}
                          {hasSensor && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-pulse" title="IoT Weight Scale Active"></span>
                          )}
                        </span>
                        {hasSensor ? (
                          <span className="text-[10px] text-emerald-600 font-mono tracking-wide flex items-center gap-0.5 mt-0.5">
                            <span className="material-symbols-outlined text-[11px]">scale</span>
                            Live Scale: {pct}% Full Capacity ({item.sensor_weight_g} / {item.original_weight_g}g)
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">Manual Tracking ID: #{item.item_id}</span>
                        )}
                      </td>

                      {/* category column */}
                      <td className="px-6 py-4">
                        <span className="text-slate-600 font-semibold text-xs">{item.category}</span>
                      </td>

                      {/* dynamic volume control sensor or manual volume column */}
                      <td className="px-6 py-4 select-none">
                        {hasSensor ? (
                          <div className="space-y-1.5 w-52 mx-auto">
                            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                              <span>Drag Sensor Load:</span>
                              <span className="font-mono text-slate-700 font-extrabold">{item.sensor_weight_g}g</span>
                            </div>
                            <input 
                              type="range"
                              min="0"
                              max={item.original_weight_g || 1000}
                              value={item.sensor_weight_g}
                              onChange={(e) => onUpdateGrocerySensorWeight(item.item_id, Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-600 transition"
                            />
                            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${isDangerColor(pct)}`}
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2.5">
                            <button
                              onClick={() => onUpdateGroceryQuantity(item.item_id, Math.max(0, item.quantity - 1))}
                              className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition font-black flex items-center justify-center text-sm cursor-pointer shadow-xs"
                            >
                              -
                            </button>
                            <span className="font-mono text-sm font-extrabold text-slate-800 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateGroceryQuantity(item.item_id, item.quantity + 1)}
                              className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition font-black flex items-center justify-center text-sm cursor-pointer shadow-xs"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Autopilot pill indicators */}
                      <td className="px-6 py-4 text-center">
                        {hasSensor && item.automatic_restock ? (
                          <span className="px-2.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 font-black text-[9px] uppercase tracking-wider inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] animate-spin">autorenew</span>
                            Autopilot Enabled
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-450 font-bold">Manual Ordering</span>
                        )}
                      </td>

                      {/* Delete actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onDeleteGroceryItem(item.item_id)}
                          className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 p-2 rounded-full duration-150 cursor-pointer active:scale-95 transition"
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

// Color scale helper
function isDangerColor(pct: number): string {
  if (pct <= 20) return "bg-rose-500";
  if (pct <= 50) return "bg-amber-500";
  return "bg-emerald-500";
}
