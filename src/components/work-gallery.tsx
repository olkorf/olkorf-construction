"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import galleryData from "@/lib/gallery.json";
import type { GalleryItem } from "@/lib/gallery-types";

const photos: GalleryItem[] = galleryData;
import styles from "@/app/gallery/gallery.module.css";

const categories = ["All work", "Entry doors", "Patio doors", "Windows", "Installation details"];

export function WorkGallery() {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const touch = useRef<{x:number;y:number} | null>(null);
  const filmstrip = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = photos.filter(photo => category === "All work" || photo.category === category);
  const current = visible[selected];
  // Sequential rows preserve reading order; ratios determine each photo's width.
  const rows: {start: number; items: GalleryItem[]; variant: number}[] = [];
  for (let start = 0; start < visible.length;) {
    const variant = rows.length % 3;
    const count = variant === 1 ? 3 : 2;
    rows.push({start, items: visible.slice(start, start + count), variant});
    start += count;
  }
  function move(direction: number) { setZoomed(false);setSelected(index => (index + direction + visible.length) % visible.length); }
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = previous;};
  }, [isOpen]);
  useEffect(() => {
    if(isOpen) filmstrip.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.scrollIntoView({block:"nearest",inline:"center"});
  }, [selected,isOpen]);

  return <>
    <div className={styles.filters} aria-label="Filter project photos">{categories.map(item => <button key={item} type="button" aria-pressed={item === category} onClick={() => {setCategory(item);setSelected(0);}}>{item}</button>)}</div>
    <p className={styles.count} role="status">{visible.length} {visible.length === 1 ? "photo" : "photos"}{category !== "All work" ? ` · ${category}` : " · A closer look at our work"}</p>
    <div className={styles.grid} key={category}>{rows.map(row => <div className={`${styles.row} ${styles[`row${row.variant}`]}`} key={row.items[0].src} style={{"--columns": row.items.map((photo, index) => `${(photo.width / photo.height) * (row.variant === 0 && index === 0 ? 1.2 : row.variant === 2 && index === 1 ? 1.2 : 1)}fr`).join(" ")} as CSSProperties}>{row.items.map((photo,offset) => {const index = row.start + offset; return <figure className={styles.card} key={photo.src}>
      <button type="button" className={styles.photoButton} aria-label={`Enlarge: ${photo.title}`} onClick={() => {setSelected(index);setIsOpen(true);dialog.current?.showModal();}}>
        {/* Assets are pre-sized and compressed; the browser selects the appropriate WebP. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.thumbnail} srcSet={`${photo.thumbnail} ${photo.previewWidth}w, ${photo.src} ${photo.width}w`} sizes={row.items.length === 3 ? "(max-width: 700px) 90vw, (max-width: 1240px) 30vw, 360px" : "(max-width: 700px) 90vw, (max-width: 1240px) 52vw, 620px"} width={photo.width} height={photo.height} loading={index < 2 ? "eager" : "lazy"} decoding="async" alt={photo.alt}/>
        <span className={styles.enlarge} aria-hidden="true"><Expand size={17}/></span>
      </button>
      <figcaption><span>{photo.category}</span><h2>{photo.title}</h2></figcaption>
    </figure>;})}</div>)}</div>
    <dialog className={styles.dialog} ref={dialog} aria-label="Project photo viewer" onClose={() => {setIsOpen(false);setZoomed(false);}} onClick={event => {if(event.target === dialog.current) dialog.current.close();}} onKeyDown={event => {if(event.key === "ArrowRight"){event.preventDefault();move(1);}if(event.key === "ArrowLeft"){event.preventDefault();move(-1);}}}>
      <div className={styles.viewer}>
        <div className={styles.toolbar}><span>OLKORF <small> / SELECTED WORK</small></span><div><button type="button" aria-label={zoomed?"Fit photo to screen":"Zoom into photo"} aria-pressed={zoomed} onClick={()=>setZoomed(value=>!value)}>{zoomed?<ZoomOut size={21}/>:<ZoomIn size={21}/>}</button><button className={styles.close} type="button" onClick={() => dialog.current?.close()} autoFocus aria-label="Close photo viewer"><X size={23}/></button></div></div>
        {current && <>
          <div className={`${styles.stage} ${zoomed?styles.zoomed:""}`} onTouchStart={event=>{if(event.touches.length===1)touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY};else touch.current=null;}} onTouchCancel={()=>{touch.current=null;}} onTouchEnd={event=>{if(!zoomed&&touch.current){const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);}touch.current=null;}}>
          <button type="button" className={styles.imageToggle} aria-label={zoomed?"Fit photo to screen":"Zoom into photo"} onClick={()=>setZoomed(value=>!value)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.largePhoto} src={isOpen ? current.src : undefined} width={current.width} height={current.height} alt={current.alt}/>
          </button></div>
          <div className={styles.viewerBottom}><button type="button" aria-label="Previous photo" onClick={() => move(-1)}><ArrowLeft size={22}/></button><p aria-live="polite"><span className={styles.viewerCategory}>{current.category}</span>{current.title}<span>{selected + 1} / {visible.length}</span></p><button type="button" aria-label="Next photo" onClick={() => move(1)}><ArrowRight size={22}/></button></div>
          <div className={styles.filmstrip} ref={filmstrip} aria-label="Choose a photo">{isOpen&&visible.map((photo,index)=><button key={photo.src} type="button" aria-label={`View photo ${index+1}: ${photo.title}`} aria-pressed={index===selected} onClick={()=>{setZoomed(false);setSelected(index);}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.thumbnail} width={52} height={64} alt="" loading="lazy"/>
          </button>)}</div>
        </>}
      </div>
    </dialog>
  </>;
}
