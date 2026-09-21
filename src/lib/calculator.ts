export type Category = "Windows" | "Entry Door" | "Patio Door";
export type Item = { id:number; category:Category; style:string; material:string; scope:string; quantity:number };
export const options = {
 Windows:{styles:["Double-Hung","Slider","Picture / Fixed","Casement","Awning","Bay / Bow","Specialty Shape"],materials:["Vinyl","Fiberglass","Clad Wood"]},
 "Entry Door":{styles:["Single Door","Double Door","Door + 1 Sidelite","Door + 2 Sidelites","Door + Transom"],materials:["Steel","Fiberglass","Wood"]},
 "Patio Door":{styles:["2-Panel Sliding","3-Panel Sliding","4-Panel Sliding","Single Hinged","Double Hinged / French"],materials:["Vinyl","Fiberglass","Clad Wood"]}
};
// Proposed installed planning allowances, not surveyed local averages. No volume discounts assumed.
export const rates:Record<string,[number,number]>={"Windows:Vinyl":[900,1400],"Windows:Fiberglass":[1300,2100],"Windows:Clad wood":[1600,2600],"Entry Door:Fiberglass":[2800,4800],"Entry Door:Wood":[3200,5500],"Patio Door:Vinyl":[2600,4200],"Patio Door:Fiberglass":[4200,6500],"Patio Door:Clad wood":[4800,7500]};
export const money=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
export function newItem(id:number,category:Category="Windows"):Item{return {id,category,style:options[category].styles[0],material:options[category].materials[0],scope:"standard",quantity:1};}
// Per-window product + installation ranges supplied by OLKORF Construction.
// Each material lists [insert low, insert high, full-frame low, full-frame high].
export const windowRates:Record<string,Record<string,[number,number,number,number]>> = {
 "Double-Hung":{Vinyl:[900,1300,1150,1600],Fiberglass:[1300,1700,1550,2000],"Clad Wood":[1600,2200,2000,2700]},
 Slider:{Vinyl:[850,1250,1100,1550],Fiberglass:[1250,1650,1500,1950],"Clad Wood":[1550,2150,1950,2650]},
 "Picture / Fixed":{Vinyl:[800,1200,1050,1500],Fiberglass:[1150,1600,1400,1900],"Clad Wood":[1450,2100,1850,2600]},
 Casement:{Vinyl:[1000,1450,1250,1750],Fiberglass:[1400,1850,1650,2200],"Clad Wood":[1700,2400,2100,2900]},
 Awning:{Vinyl:[950,1400,1200,1700],Fiberglass:[1350,1800,1600,2150],"Clad Wood":[1650,2300,2050,2800]},
 "Bay / Bow":{Vinyl:[3500,5500,3500,5500],Fiberglass:[4500,6500,4500,6500],"Clad Wood":[5500,8000,5500,8000]},
 "Specialty Shape":{Vinyl:[1200,2000,1500,2400],Fiberglass:[1500,2400,1800,2800],"Clad Wood":[1800,3000,2200,3500]}
};
// Per complete door system, including standard installation.
export const entryDoorRates:Record<string,Record<string,[number,number]>> = {
 "Single Door":{Steel:[2200,3500],Fiberglass:[3000,4800],Wood:[4000,6500]},
 "Double Door":{Steel:[4000,6000],Fiberglass:[5000,7500],Wood:[6500,10000]},
 "Door + 1 Sidelite":{Steel:[3500,5000],Fiberglass:[4500,6500],Wood:[6000,9000]},
 "Door + 2 Sidelites":{Steel:[4500,6500],Fiberglass:[5500,8000],Wood:[7500,11000]},
 "Door + Transom":{Steel:[3500,5500],Fiberglass:[4500,7000],Wood:[6000,9500]}
};
export const entryDoorLabel=(style:string)=>style.toLowerCase().replace(" + "," with ");
// Per complete patio door system, including standard installation.
export const patioDoorRates:Record<string,Record<string,[number,number]>> = {
 "2-Panel Sliding":{Vinyl:[2500,3500],Fiberglass:[3800,5000],"Clad Wood":[4200,5800]},
 "3-Panel Sliding":{Vinyl:[3500,5000],Fiberglass:[4800,6500],"Clad Wood":[5500,7500]},
 "4-Panel Sliding":{Vinyl:[4500,6500],Fiberglass:[6000,8000],"Clad Wood":[7000,9500]},
 "Single Hinged":{Vinyl:[2500,3800],Fiberglass:[3500,4800],"Clad Wood":[3800,5200]},
 "Double Hinged / French":{Vinyl:[3500,5000],Fiberglass:[4500,6500],"Clad Wood":[6000,8000]}
};
export const patioDoorLabel=(style:string)=>`${style.toLowerCase().replace("french","French")} patio door`;
export function estimate(item:Item):[number,number]|null {
 if(item.scope==="custom")return null;
 if(item.category==="Windows"){
  const range=windowRates[item.style]?.[item.material];if(!range)return null;
  const [insertLow,insertHigh,fullLow,fullHigh]=range;
  const full=item.scope==="full"||item.style==="Bay / Bow";
  return [(full?fullLow:insertLow)*item.quantity,(full||item.scope==="unknown"?fullHigh:insertHigh)*item.quantity];
 }
 if(item.category==="Entry Door"){
  const base=entryDoorRates[item.style]?.[item.material];if(!base)return null;
  const low=base[0]+(item.scope==="modification"?500:0);
  const high=base[1]+(item.scope==="modification"||item.scope==="unknown"?1200:0);
  return [low*item.quantity,high*item.quantity];
 }
 const base=patioDoorRates[item.style]?.[item.material];if(!base)return null;
 const low=base[0]+(item.scope==="modification"?750:0);
 const high=base[1]+(item.scope==="modification"||item.scope==="unknown"?1500:0);
 return [low*item.quantity,high*item.quantity];
}

const standardWindowStyles = new Set(["Double-Hung", "Slider", "Picture / Fixed", "Casement", "Awning"]);

/** Project efficiency affects extended standard-window subtotals, never base rates. */
export function estimateProject(items: Item[]) {
 const eligible = items.map(item => item.category === "Windows" && standardWindowStyles.has(item.style));
 const count = items.reduce((sum, item, index) => sum + (eligible[index] ? item.quantity : 0), 0);
 const rate = count >= 12 ? 10 : count >= 8 ? 7 : count >= 5 ? 5 : count >= 3 ? 3 : 0;
 const baseResults = items.map(estimate);
 const standard: [number, number] = [0, 0];
 const other: [number, number] = [0, 0];
 baseResults.forEach((range, index) => {
  if (!range) return;
  const subtotal = eligible[index] ? standard : other;
  subtotal[0] += range[0]; subtotal[1] += range[1];
 });
 // Apply one project-wide rate to matching breakdown lines as well, so the
 // summary and estimate handoff reflect the same calculation as the total.
 const results = baseResults.map((range, index): [number, number] | null =>
  range && eligible[index] ? [range[0] * (100 - rate) / 100, range[1] * (100 - rate) / 100] : range
 );
 const round = (value: number) => Math.round(value / 50) * 50;
 const total: [number, number] = [
  round(standard[0] * (100 - rate) / 100 + other[0]),
  round(standard[1] * (100 - rate) / 100 + other[1])
 ];
 return { results, total, custom: baseResults.some(range => range === null) };
}
