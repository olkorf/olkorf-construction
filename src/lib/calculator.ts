export type Category = "Windows" | "Entry Door" | "Patio Door";
export type Item = { id:number; category:Category; style:string; material:string; scope:string; quantity:number };
export const options = {
 Windows:{styles:["Double-hung","Casement","Sliding","Picture","Bay / bow"],materials:["Vinyl","Fiberglass","Clad wood"]},
 "Entry Door":{styles:["Single door","One sidelight","Two sidelights"],materials:["Fiberglass","Wood"]},
 "Patio Door":{styles:["Two-panel sliding","Hinged French doors"],materials:["Vinyl","Fiberglass","Clad wood"]}
};
// Proposed installed planning allowances, not surveyed local averages. No volume discounts assumed.
export const rates:Record<string,[number,number]>={"Windows:Vinyl":[900,1400],"Windows:Fiberglass":[1300,2100],"Windows:Clad wood":[1600,2600],"Entry Door:Fiberglass":[2800,4800],"Entry Door:Wood":[3200,5500],"Patio Door:Vinyl":[2600,4200],"Patio Door:Fiberglass":[4200,6500],"Patio Door:Clad wood":[4800,7500]};
export const money=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
export function newItem(id:number,category:Category="Windows"):Item{return {id,category,style:options[category].styles[0],material:options[category].materials[0],scope:"standard",quantity:1};}
export function estimate(item:Item):[number,number]|null {
 if(item.scope==="custom"||item.style==="Bay / bow")return null;
 const base=rates[`${item.category}:${item.material}`];if(!base)return null;let [low,high]=base;
 if(item.category==="Windows"){
 if(item.style==="Casement"){low+=150;high+=300;}if(item.style==="Sliding"){low+=100;high+=200;}if(item.style==="Picture")high+=250;
 if(item.scope==="full"){low+=250;high+=500;}if(item.scope==="unknown")high+=500;
 }
 if(item.category==="Entry Door"){const n=item.style==="One sidelight"?1:item.style==="Two sidelights"?2:0;low+=n*900;high+=n*1500;}
 if(item.style==="Hinged French doors"){low+=800;high+=1800;}
 return [low*item.quantity,high*item.quantity];
}
