import type { Metadata } from "next";
import Image from "next/image";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The family story behind OLKORF Construction — from Belarus to Wisconsin.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Our Story</p>
          <h1>Built on Family. Driven by Trust.</h1>
          <p className={styles.heroLead}>
            From Belarus to Wisconsin — building a new life one home at a time.
          </p>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="/images/about/olkorf-construction-family.webp"
            alt="The family behind OLKORF Construction"
            fill
            sizes="(max-width: 900px) 100vw, 600px"
            priority
          />
        </div>
      </section>

      <section className={styles.story}>
        <p className={styles.eyebrow}>Every family has a story</p>
        <h2>This is ours.</h2>

        <div className={styles.textBlock}>
          <p>
            Our family came to the United States from Belarus to begin a new
            chapter of our lives. We left behind the life we knew and started
            over in a new country, with a new language, a new culture, and many
            new challenges.
          </p>

          <p>
            But we did not come empty-handed. We brought with us experience,
            perseverance, respect for people, a strong work ethic, and the warmth
            of a family that believes in honest work and simple human kindness.
          </p>

          <p>
            Wisconsin became our first home in America, and it will always have
            a special place in our hearts. This is where we began again. This is
            where we learned, worked, made mistakes, grew stronger, and started
            building our future step by step.
          </p>

          <p>
            OLKORF Construction was born from that journey. We are not a large
            corporation. We are a family working hard to build something real — a
            business based on trust, quality workmanship, and personal
            responsibility.
          </p>
        </div>
      </section>

      <section className={styles.places}>
        <div className={styles.placeCard}>
          <div className={styles.placeImage}>
            <Image
              src="/images/about/minsk-upper-town.webp"
              alt="Upper Town in Minsk, Belarus"
              fill
            />
          </div>
          <p className={styles.placeLabel}>Minsk, Belarus</p>
          <h3>Where our story began.</h3>
          <p>
            From the historic streets of Upper Town, where our roots are, our
            journey began.
          </p>
        </div>

        <div className={styles.arrow}>→</div>

        <div className={styles.placeCard}>
          <div className={styles.placeImage}>
            <Image
              src="/images/about/madison-capitol.webp"
              alt="Wisconsin State Capitol in Madison"
              fill
            />
          </div>
          <p className={styles.placeLabel}>Madison, Wisconsin</p>
          <h3>Where we found our home.</h3>
          <p>
            In Wisconsin, we found more than a new place to live — we found a
            community to grow in.
          </p>
        </div>
      </section>

      <section className={styles.nameSection}>
        <p className={styles.eyebrow}>The meaning behind the name</p>
        <h2>Why OLKORF?</h2>

        <p className={styles.nameIntro}>
          The name OLKORF is personal. It comes from my own name and reminds me
          that my family’s reputation is behind every project we complete.
        </p>

        <div className={styles.nameGrid}>
          <div>
            <strong>OL</strong>
            <span>Oleg</span>
          </div>
          <div>
            <strong>KOR</strong>
            <span>Koroliov</span>
          </div>
          <div>
            <strong>F</strong>
            <span>Fyodorovich</span>
          </div>
        </div>

        <p className={styles.nameText}>
          To me, this name means more than a company. It carries my family’s
          reputation. It reminds me every day that when a customer invites us
          into their home, they are placing trust in us — and that trust must be
          earned through honest work.
        </p>
      </section>

      <section className={styles.final}>
        <h2>We know what it feels like to start over.</h2>
        <p>
          We know how much a home means to a family. That is why we treat every
          project as if it were our own.
        </p>
        <p>
          Thank you for taking the time to learn our story. We would be honored
          to become part of yours.
        </p>
      </section>
    </main>
  );
}
